<template>
  <div class="dashboard">
    <h1>Welcome, {{ authStore.user.username }}</h1>
    <p>Email: {{ authStore.user.email }}</p>
    <Button label="Logout" icon="pi pi-sign-out" @click="logout" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import Button from 'primevue/button';

export default defineComponent({
  components: { Button },
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    const logout = () => {
      authStore.logout();
      router.push({ name: 'Login' });
    };

    return { authStore, logout };
  },
});
</script>
