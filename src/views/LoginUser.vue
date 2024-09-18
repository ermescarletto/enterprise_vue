<template>
  <div class="login-container">
    <Card>
      <template #header>
        <div class="logo">
          <img alt="logo ms_enterprise" src="../assets/enterprise.png" width="100%" />
        </div>
      </template>
      
      <template #content>
        <div class="flex align-items-center justify-content-center">
          <div>
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
              <div class="flex m-2 align-items-center justify-content-center">
                <Password
                  v-model="password"
                  :feedback="false"
                  placeholder="Senha"
                  :class="{'p-invalid': passwordError || loginError}"
                  toggleMask
                />
              </div>
              <div class="flex m-2 align-items-right justify-content-right">
                <Checkbox class="mr-2" v-model="rememberMe" binary />
                <label class="text-sm" for="rememberMe">Lembrar usuário</label>
              </div>
            </form>
          </div>
        </div>
      </template>

      <template #footer>
        <div class="flex justify-content-center">
          <Button label="Login" icon="pi pi-lock" @click="handleLogin" class="m-2" iconPos="left" />
          <Button label="Registrar" icon="pi pi-plus" class="m-2" severity="info" iconPos="left" />
        </div>

        <div class="flex justify-content-center text-xs">
          <a @click="forgotPassword">Recuperar minha senha</a>
        </div>
      </template>
    </Card>

    <!-- Error Dialog -->
    <Dialog v-model:visible="showDialog" modal cl>
      <div  class="popUp" >
        <p>{{ errorMessage }}</p>
      </div>
      <div class="flex justify-content-center">
        <Button label="OK" icon="pi pi-check" severity="danger" @click="showDialog = false" />
      </div>
      
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import Card from 'primevue/card';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import Dialog from 'primevue/dialog';

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

// Login handler
const handleLogin = async () => {
  // Reset errors
  emailError.value = false;
  passwordError.value = false;
  loginError.value = false;
  
  // Basic form validation
  if (!email.value || !validateEmail(email.value)) {
    emailError.value = true;
  }
  if (!password.value) {
    passwordError.value = true;
  }

  if (emailError.value || passwordError.value) {
    return;
  }

  try {
    const response = await fetch('http://localhost:8000/auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    if (!response.ok) {
      throw new Error('Não foi possível realizar o login.');
    }

    const data = await response.json();

    if (data.token) {
      authStore.login(data);

      if (rememberMe.value) {
        localStorage.setItem('rememberedEmail', email.value);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      router.push({ name: 'Dashboard' });
    } else {
      throw new Error('Credenciais inválidas.');
    }
  } catch (error) {
    loginError.value = true;
    errorMessage.value = 'Falha ao realizar o login. Verifique suas credenciais.';
    showDialog.value = true;
  }
};

// Basic email validation
const validateEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

// Forgot password handler
const forgotPassword = () => {
  router.push({ name: 'Recovery' });
};
</script>


<style scoped>

.popUp {
  width: 18rem;

}
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(../assets/background.png);
  background-size: cover;
}

.logo {
  width: 25rem;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
  margin: 0 auto;
}

.input-login {
  width: 18rem;
}

.p-invalid {
  border-color: red !important;
}

</style>