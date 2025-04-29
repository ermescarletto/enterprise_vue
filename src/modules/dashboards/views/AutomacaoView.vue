<script setup lang="ts">
import UnderConstruction from '@/components/UnderConstruction.vue';

/*
import { ref } from "vue";
import api from "@/api/services/apiAxios";


const taskId = ref(null);
const resultado = ref(null);
const status = ref(null);

const iniciarProcesso = async () => {
  try {
    const resposta = await api.post("dashboards/task/iniciar/");
    taskId.value = resposta.data.task_id;
    status.value = "processando";
    verificarStatus();
  } catch (error) {
    console.error("Erro ao iniciar processo:", error);
  }
};

const verificarStatus = async () => {
  try {
    while (status.value === "processando") {
      const resposta = await api.get(`dashboards/task/status/${taskId.value}/`);
      status.value = resposta.data.status;
      if (status.value === "finalizado") {
        resultado.value = resposta.data.dados;
      }
      await new Promise((r) => setTimeout(r, 2000)); // Espera 2s antes de verificar novamente
    }
  } catch (error) {
    console.error("Erro ao verificar status:", error);
  }
};*/
</script>

<template>
  <UnderConstruction />
  <div>
<!-- 
       <button @click="iniciarProcesso">Iniciar Processo</button>
    <p v-if="taskId">ID da Tarefa: {{ taskId }}</p>
    <p>Status: {{ status }}</p>
    <p v-if="resultado">Resultado: {{ resultado }}</p>
 
  -->  </div>
</template>