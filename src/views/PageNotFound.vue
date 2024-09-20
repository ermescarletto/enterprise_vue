<template>
    <div class="dashboard">
        <div class="bg-white p-5 bg-surface-0 dark:bg-surface-950 mt-5  px-6 py-20 md:px-12 lg:px-20">
          <div class="text-surface-700 dark:text-surface-100 text-center">
              <div class="text-primary font-bold mb-4"><img src="../assets/enterprise.png" width="300px"/> </div>
              <div class="text-surface-900 dark:text-surface-0 font-bold text-5xl mb-4">404</div>
              <div class="text-surface-700 dark:text-surface-100 text-2xl mb-8">Ooooops... não encontramos o que você queria....</div>
              <Button label="Retornar" icon="pi pi-caret-left" raised rounded class="font-bold px-8 py-4 whitespace-nowrap" @click='router.push("dashboard")'/>
            </div>
        </div>
    </div>
    
    
    

  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  /*import { useAuthStore } from '@/stores/auth';*/
  import { useRouter } from 'vue-router';
  import Button from 'primevue/button';

  
  const chartData = ref();
  const chartOptions = ref();
  const router = useRouter();
  /*
  const authStore = useAuthStore();
  const router = useRouter();
  */
  
  
  const setChartData = () => {
      const documentStyle = getComputedStyle(document.body);
      return {
          labels: ['Compras', 'Desenvolvimento', 'Suporte TI', 'Financeiro'],
          datasets: [
              {
                  data: [540, 325, 702, 92],
                  backgroundColor: [documentStyle.getPropertyValue('--p-cyan-500'), documentStyle.getPropertyValue('--p-orange-500'), documentStyle.getPropertyValue('--p-gray-500'),documentStyle.getPropertyValue('--p-yellow-500')],
                  hoverBackgroundColor: [documentStyle.getPropertyValue('--p-cyan-400'), documentStyle.getPropertyValue('--p-orange-400'), documentStyle.getPropertyValue('--p-gray-400'), documentStyle.getPropertyValue('--p-yellow-400')]
              }
          ]
      };
  };
  
  chartData.value = setChartData();
  
  const setChartOptions = () => {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
  
      return {
          plugins: {
              legend: {
                  labels: {
                      cutout: '60%',
                      color: textColor
                  }
              }
          }
      };
  };
  
  chartOptions.value =  setChartOptions();
  

  
  
      
  </script>
  
  
  
  <style scoped>
  
  
  .dashboard {
    min-height: 100vh; /* Garante que o fundo cubra a altura completa da janela */
    padding: 10px;
    background-image: url(../assets/background.png);
    background-repeat: repeat; /* Repetir em ambas direções */
    background-size: cover; /* O fundo cobre a área visível */
    background-attachment: fixed; /* Mantém o fundo fixo enquanto o conteúdo rola */
  }
  </style>
  