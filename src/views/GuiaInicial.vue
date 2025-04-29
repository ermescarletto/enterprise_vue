<template>
    <div class="container flex justify-content-center align-items-center vh-100">
      <div class="card text-center p-4 shadow-2" style="max-width: 600px;">
        <h1 class="text-primary">Bem-vindo à Intranet</h1>
        <p class="text-secondary mt-3">
          Este é o canal oficial de comunicação e interação com a empresa. Aqui você poderá acessar informações importantes, realizar tarefas administrativas e colaborar com sua equipe de forma eficiente.
        </p>
        <p class="text-secondary">
          Explore os menus acima para navegar pelas funcionalidades disponíveis. Estamos aqui para facilitar sua experiência no ambiente corporativo.
        </p>
        <Button label="Ir para o Dashboard" icon="pi pi-arrow-right" class="mt-4" @click="goToDashboard" />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useRouter } from 'vue-router';
  import Button from 'primevue/button';
  
  const router = useRouter();
  
  const goToDashboard = () => {
    router.push('/bi/dashboards');
  };
  </script>
  
  <style scoped>
  .container {
    background-color: #f5f5f5;
    height: 100vh;
  }
  .card {
    background-color: #ffffff;
    border-radius: 8px;
  }
  .text-primary {
    color: #007bff;
  }
  .text-secondary {
    color: #6c757d;
  }
  </style>