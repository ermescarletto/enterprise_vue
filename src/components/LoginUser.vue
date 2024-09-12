<template>
  <div class="login-container">
    <Card style="width: 25rem; overflow: hidden">
      <template #header >
        <div class="logo">
          <img  alt="logo ms_enterprise" src="../assets/enterprise.png" width="75%"/>
        </div>
          
        </template>
        <template #content>

      <form @submit.prevent="handleLogin">
        <div class="p-fluid">
          <div class="p-field">
            <label for="email">Email</label>
            <InputText id="email" v-model="email" required placeholder="Enter email" />
          </div>
          
          <div class="p-field">
            <label for="password">Password</label>
            <Password id="password" v-model="password" required placeholder="Enter password" />
          </div>

          <div class="p-field-checkbox">
            <Checkbox v-model="rememberMe" binary />
            <label for="rememberMe">Remember me</label>
          </div>

          <Button label="Login" icon="pi pi-sign-in" class="w-100" type="submit" />
        </div>

        <div class="text-center mt-3">
          <a href="#" @click="forgotPassword">Forgot your password?</a>
        </div>
      </form>
        </template>
        <template #footer>
            <div class="flex gap-4 mt-1">
                <Button label="Cancel" severity="secondary" outlined class="w-full" />
                <Button label="Save" class="w-full" />
            </div>
        </template>

  </Card>


  </div>
  
<div>

     


</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import Card from 'primevue/card';

export default defineComponent({
  components: {
    Card,
    InputText,
    Password,
    Button,
    Checkbox,
  },
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const email = ref(localStorage.getItem('rememberedEmail') || '');
    const password = ref('');
    const rememberMe = ref(!!localStorage.getItem('rememberedEmail'));

    const handleLogin = async () => {
      const response = await fakeLoginApi(); // Simular a requisição de login
      if (response.token) {
        authStore.login(response);
        if (rememberMe.value) {
          localStorage.setItem('rememberedEmail', email.value);
        } else {
          localStorage.removeItem('rememberedEmail');
        }
        router.push({ name: 'Dashboard' });
      }
    };

    const forgotPassword = () => {
      alert('Redirect to password recovery page.');
    };

    return { email, password, rememberMe, handleLogin, forgotPassword };
  },
});

// Função simulando requisição de login
async function fakeLoginApi() {
  return {
    token: "980bee86183b2470a316664ea26eb4654640f96c",
    user: {
      id: 1,
      username: "admin",
      email: "ermes.carletto@gmail.com",
      cpf: "00893073997",
      is_staff: true,
      is_active: true,
    },
  };
}
</script>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #004d00, #008000);
}

.login-card {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.logo {
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
}
</style>
