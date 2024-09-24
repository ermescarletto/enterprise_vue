<template>
  <div class="dashboard">
    <MenuHeader></MenuHeader>
    <div class="card">

    
    <DataTable v-model:filters="filters" :value="equipe" paginator :rows="10" dataKey="id" filterDisplay="row"
      :loading="loading" :globalFilterFields="['nome']" class="mt-2" showGridlines stripedRows
      removableSort>
      <template #header>
        <div class="flex justify-content-between flex-wrap">
          <div class="m-2">
            <Button class="mt-2" label="Adicionar" icon="pi pi-plus" @click="openNew" />
          </div>
          <div class="m-2"></div>
          <div class="m-2">
            <IconField>
              <InputIcon>
                <i class="pi pi-search" />
              </InputIcon>
              <InputText v-model="filters['nome'].value" placeholder="Buscar pelo nome" />
            </IconField>
          </div>
        </div>
        


      </template>
      <template #empty> Nada encontrado... </template>
      <template #loading> Carregando... </template>

      <Column field="nome" header="Nome" style="min-width: 12rem">
        <template #body="{ data }">
            {{ data.nome }}
        </template>
        <template #filter="{ filterModel }">
            <InputText v-model="filterModel.value" type="text" placeholder="Search by name" />
        </template>
      </Column>     
      <Column header="Ações">
        <template #body="{ data }">
            <Button icon="pi pi-search" class="p-button-text p-button-info" @click="editItem(data)" />

            <Button icon="pi pi-pencil" class="p-button-text" @click="editItem(data)" />
            <Button icon="pi pi-trash" class="p-button-danger p-button-text" @click="" />
            
          </template>
      </Column>
    </DataTable>
    </div>
    <div>

      <Dialog v-model:visible="dialogVisible" header="Create/Edit Pessoa" :closable="false">
      <PessoaForm :formData="currentItem" :isEditing="isEditing" @save="saveItem" @cancel="closeDialog" />
    </Dialog>

      <!-- Button for Adding a New Item -->
    </div>

  </div>
</template>

<script setup lang="ts">
/*import { ref, onMounted } from 'vue';
/*import { useAuthStore } from '@/stores/auth';*/

import MenuHeader from '../components/MenuHeader.vue';

import axios from "axios";
import { useAuthStore } from '@/stores/auth';
import { FilterMatchMode } from '@primevue/core/api';
import { ref, onMounted } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';

// Define types for the items

const loading = ref(true);


interface Equipe {
  id: number;
  nome: string;

}

const auth = useAuthStore();

// State variables
const equipe = ref();
const dialogVisible = ref(false);
const isEditing = ref(false);
const currentItem = ref<Equipe>({
  id: 0,
  nome: ''
});

const filters = ref({
  'nome': { value: null, matchMode: FilterMatchMode.CONTAINS },
 

});

const options = {
  method: 'GET',
  url: 'http://localhost:8000/atendimento/api/equipe/',
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'insomnia/10.0.0',
    Authorization: 'TOKEN ' + auth.token
  }
};

function saveItem() {

}


function editItem(item: Equipe) {
  currentItem.value = { ...item };
  isEditing.value = true;
  dialogVisible.value = true;
}

function openNew() {

}


function closeDialog() {
  dialogVisible.value = false;
}
axios.request(options).then(function (response) {
  console.log(response.data);
  console.log(auth.token);

  onMounted(equipe.value = response.data);
  loading.value = false;
  console.log(equipe.value);

}).catch(function (error) {
  console.log('erro maximo');
  console.error(error);
  console.log(auth.token);
});

</script>



<style scoped>
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.dashboard {
  min-height: 100vh;
  /* Garante que o fundo cubra a altura completa da janela */
  padding: 10px;
  background-image: url(../assets/background.png);
  background-repeat: repeat;
  /* Repetir em ambas direções */
  background-size: cover;
  /* O fundo cobre a área visível */
  background-attachment: fixed;
  /* Mantém o fundo fixo enquanto o conteúdo rola */
}
</style>
