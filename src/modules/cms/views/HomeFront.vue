<template>
  <div class="dashboard">
  <div class="bg-white p-5 bg-surface-0 dark:bg-surface-950 mt-5  px-6 py-20 md:px-12 lg:px-20">
        <div class="text-surface-700 dark:text-surface-100 text-center">
            <div class="text-primary font-bold mb-4"><img src="../../../assets/enterprise.png" width="300px"/> </div>
            <div class="text-surface-900 dark:text-surface-0 font-bold text-5xl mb-4">Bem vindo à Mais Sabor</div>
            <div class="text-surface-700 dark:text-surface-100 text-2xl mb-8">Esse espaço foi desenvolvido para que você tenha todo apoio para continuar alimentando idéias e desenvolvendo soluções.</div>
            <Button label="Inicie aqui!" icon="pi pi-play" raised rounded class="font-bold px-8 py-4 whitespace-nowrap" @click='pushGuia'/>
        </div>
    </div>
  <div class="content p-5">
    
    <div class="flex justify-content-around flex-wrap">
      <Card class="m-5" style="width: 25rem; overflow: hidden">
    <template #header>
      
    </template>
    <template #title>Atendimentos por Área</template>
    <template #subtitle>Chamados abertos por departamento</template>
    <template #content>
      <Chart type="doughnut" :data="chartData" :options="chartOptions" class="w-full md:w-[30rem]" />
      
    </template>
    <template #footer>
      
        <div class="flex gap-4 mt-1">
          
            <Button label="Mais" class="w-full" icon="pi pi-plus" @click="router.push('/atendimento')"/>
        </div>
    </template>
</Card>

<Card  class="m-5" style="width: 25rem; overflow: hidden">
    <template #header>
      
    </template>
    <template #title>Documentos por Área</template>
    <template #subtitle>Documentos disponíveis por departamento</template>
    <template #content>
      <Chart type="doughnut" :data="chartData" :options="chartOptions" class="w-full md:w-[30rem]" />
      
    </template>
    <template #footer>
      
        <div class="flex gap-4 mt-1">
          
            <Button label="Mais" class="w-full" icon="pi pi-plus"/>
        </div>
    </template>
</Card>


<Card  class="m-5" style="width: 25rem; overflow: hidden">
    <template #header>
      
    </template>
    <template #title>Unidades por Estado</template>
    <template #subtitle>Total de unidades por unidade da federação.</template>
    <template #content>
      <Chart type="doughnut" :data="chartData" :options="chartOptions" class="w-full md:w-[30rem]" />
    </template>
    <template #footer>
      
        <div class="flex gap-4 mt-1">
          
            <Button label="Mais" class="w-full" icon="pi pi-plus"/>
        </div>
    </template>
</Card>
    </div>
  </div>
  
  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';
/*import { useAuthStore } from '@/stores/auth';*/
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Chart from 'primevue/chart';

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

const pushGuia= () => {

    router.push('/home/guia');

};


    
</script>



<style scoped>


.dashboard {
  min-height: 100vh; /* Garante que o fundo cubra a altura completa da janela */
  padding: 10px;
  background-image: url(../../../assets/background.png);
  background-repeat: repeat; /* Repetir em ambas direções */
  background-size: cover; /* O fundo cobre a área visível */
  background-attachment: fixed; /* Mantém o fundo fixo enquanto o conteúdo rola */
}
</style>
