<template>
  <div class="dashboard">
    <MenuHeader></MenuHeader>
    <div class="card">

    
    <DataTable v-model:filters="filters" :value="pessoas" paginator :rows="10" dataKey="id" filterDisplay="row"
      :loading="loading" :globalFilterFields="['nome', 'email', 'telefone']" class="mt-2" showGridlines stripedRows
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
              <InputText v-model="filters['nome'].value" placeholder="Buscar" />
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
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="Buscar pelo nome" />
                </template>
            </Column>      <Column field="email" sortable header="E-mail"></Column>
      <Column field="telefone" sortable header="Telefone"></Column>
      <Column header="Ações">

      </Column>
    </DataTable>
    </div>
    <div>
      <!-- Dynamic Dialog for Create/Update -->
      <Dialog v-model:visible="dialogVisible" header="Edit Item" :closable="false">
        <form @submit.prevent="saveItem">
          <div class="p-fluid">
            <div class="field">
              <label for="name">Name</label>
              <InputText v-model="currentItem.nome" id="name" />
            </div>
            <div class="field">
              <label for="description">Description</label>
              <InputText v-model="currentItem.email" id="description" />
            </div>
          </div>
          <div class="dialog-footer">
            <Button label="Save" type="submit" />
            <Button label="Cancel" class="p-button-secondary" @click="dialogVisible = false" />
          </div>
        </form>
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


interface PessoaFisica {
  id: number;
  nome: string;
  data_nascimento: string;
  cpf: string;
  sexo: string;
  email: string;
  telefone: string;
}

const auth = useAuthStore();

// State variables
const pessoas = ref();
const dialogVisible = ref(false);
const currentItem = ref<PessoaFisica>({
  id: 0,
  nome: '',
  data_nascimento: '',
  cpf: '',
  sexo: '',
  email: '',
  telefone: '',
});

const filters = ref({
  'nome': { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const options = {
  method: 'GET',
  url: 'http://localhost:8000/cadastros/api/pessoasfisicas/',
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'insomnia/10.0.0',
    Authorization: 'TOKEN ' + auth.token
  }
};

function saveItem() {

}

function openNew() {

}


axios.request(options).then(function (response) {
  console.log(response.data);
  console.log(auth.token);

  onMounted(pessoas.value = response.data);
  loading.value = false;
  console.log(pessoas.value);

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
