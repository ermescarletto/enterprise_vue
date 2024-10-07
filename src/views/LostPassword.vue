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
                  <InputText class="input-login" id="email" v-model="email" required placeholder="E-mail" />
                </IconField>
              </div>
              <div class="flex m-2 align-items-center justify-content-center input-login">
                <Password v-model="password" class="input-login" :feedback="false" toggleMask placeholder="Senha" />
              </div>
              <div class="flex m-2 align-items-right justify-content-right">
                <Checkbox class="mr-2" v-model="rememberMe" binary />
                <label class="text-sm" for="rememberMe">Lembrar usuário </label>
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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import Card from 'primevue/card';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';

// State and references
const authStore = useAuthStore();
const router = useRouter();
const email = ref(localStorage.getItem('rememberedEmail') || '');
const password = ref('');
const rememberMe = ref(false);

// Login handler
const handleLogin = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/auth', {
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
      throw new Error('Login failed');
    }

    const data = await response.json();

    // If login is successful and token is returned
    if (data.token) {
      authStore.login(data); // Assuming authStore manages the token
      if (rememberMe.value) {
        localStorage.setItem('rememberedEmail', email.value);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      router.push({ name: 'Dashboard' });
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    alert('Login failed');
  }
};

// Forgot password handler
const forgotPassword = () => {
  alert('Redirect to password recovery page.');
  router.push({ name: 'Recovery' });
};
</script>

<style scoped>
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
</style>
