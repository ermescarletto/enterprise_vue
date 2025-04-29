<template>
    <div class="container flex justify-content-center align-items-center vh-100">
      <div class="card text-center p-4 shadow-2" style="max-width: 400px;">
        <i class="pi pi-exclamation-triangle text-warning" style="font-size: 3rem;"></i>
        <h2 class="mt-3">Página em Construção</h2>
        <p class="text-secondary">Estamos trabalhando para trazer esta página para você em breve.</p>
        <Button label="Voltar ao Início" icon="pi pi-home" class="mt-4" @click="goHome" />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useRouter } from 'vue-router';
  import Button from 'primevue/button';
  
  const router = useRouter();
  
  const goHome = () => {
    router.push('/');
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
  </style>