<template>
  <Card>
    <template #header>
      <div class="logo">
        <img alt="logo ms_enterprise" src="@/assets/enterprise.png" width="100%" />
      </div>
    </template>

    <template #content>
      
      <div class="login-container" >
        <div v-if="isLoading" class="overlay">
          <ProgressSpinner
            style="width: 50px; height: 50px"
            strokeWidth="8"
            fill="transparent"
            animationDuration=".5s"
            aria-label="Carregando"
          />
        </div>

        <form @submit.prevent="handleLogin">
          <div class="flex m-2 align-items-center justify-content-center">
            <IconField>
              <InputIcon class="pi pi-envelope" />
              <InputText
                :class="{'p-invalid': emailError || loginError}"
                id="email"
                v-model="email"
                required
                placeholder="E-mail"
              />
            </IconField>
          </div>

          <div class="flex m-3 align-items-center justify-content-center">
            <Password
              v-model="password"
              :feedback="false"
              placeholder="Senha"
              :class="{'p-invalid': passwordError || loginError}"
              toggleMask
            />
          </div>

          <div class="flex m-2 mt-5 align-items-center justify-content-center">
            <Checkbox class="mr-2" v-model="rememberMe" binary />
            <label class="text-sm" for="rememberMe">Lembrar usuário</label>
          </div>
        </form>
        <div class="flex justify-content-center">
        <Button label="Login" icon="pi pi-lock" @click="handleLogin" class="m-2" iconPos="left" />
        <Button label="Registrar" icon="pi pi-plus"  @click="router.push('register')" class="m-2" severity="info" iconPos="left" />
      </div>

      <div class="flex justify-content-center text-xs">
                <a @click="forgotPassword">Recuperar minha senha</a>
      </div>
      </div>
    </template>

    <template #footer>

    </template>
  </Card>

  <Dialog v-model:visible="showDialog" modal>
    <div class="popUp">
      <p>{{ errorMessage }}</p>
    </div>
    <div class="flex justify-content-center">
      <Button label="OK" icon="pi pi-check" severity="danger" @click="showDialog = false" />
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router';
import axios from 'axios'; // Import axios
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import Card from 'primevue/card';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import Dialog from 'primevue/dialog';
import ProgressSpinner from 'primevue/progressspinner';

// State and references
const authStore = useAuthStore();
const router = useRouter();
const email = ref(localStorage.getItem('rememberedEmail') || '');
const password = ref('');
const rememberMe = ref(false);

// Validation and error handling state
const emailError = ref(false);
const passwordError = ref(false);
const loginError = ref(false);
const showDialog = ref(false);
const errorMessage = ref('');
const isLoading = ref(false);

const handleLogin = async () => {
  emailError.value = false;
  passwordError.value = false;
  loginError.value = false;
  isLoading.value = true;

  if (!email.value || !validateEmail(email.value)) {
    emailError.value = true;
    isLoading.value = false;
  }
  if (!password.value) {
    passwordError.value = true;
    isLoading.value = false;
  }

  if (emailError.value || passwordError.value) return;

  try {
    const response = await axios.post('auth/auth-login/', {
      email: email.value,
      password: password.value,
    });

    const data = response.data;
    if (data.token) {
      authStore.login(data);
      rememberMe.value
        ? localStorage.setItem('rememberedEmail', email.value)
        : localStorage.removeItem('rememberedEmail');
      router.push({ path: '/' });
    } else {
      throw new Error('Login inválido.');
    }
  } catch (error) {
    loginError.value = true;
    errorMessage.value = 'Falha ao realizar o login.';
    showDialog.value = true;
  } finally {
    isLoading.value = false;
  }
};

const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
const forgotPassword = () => router.push({ name: 'Recovery' });
</script>


<style scoped>
.login-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.popUp {
  width: 18rem;
}

.logo {
  width: 25rem;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
  margin: 0 auto;
}

.p-invalid {
  border-color: red !important;
}
</style>
