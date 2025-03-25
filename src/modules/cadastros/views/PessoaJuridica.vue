<template>
  <div class="card">
    <DataTable
      v-model:filters="filters"
      :value="pessoajuridica"
      paginator
      :rows="10"
      dataKey="id"
      filterDisplay="row"
      :loading="loading"
      :globalFilterFields="['nome_fantasia', 'razao_social', 'cnpj']"
      class="mt-2"
      showGridlines
      stripedRows
      removableSort
    >
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
              <InputText v-model="filters['razao_social'].value" placeholder="Busca geral" />
            </IconField>
          </div>
        </div>
      </template>

      <!-- Definição das colunas -->
      <Column field="nome_fantasia" header="Nome Fantasia" sortable filter>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="Filtrar por nome fantasia" />
        </template>
      </Column>
      <Column field="razao_social" header="Razão Social" sortable filter>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="Filtrar por razão social" />
        </template>
      </Column>
      <Column field="cnpj" header="CNPJ" sortable filter>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="Filtrar por CNPJ" />
        </template>
      </Column>
      <Column field="inscricao_estadual" header="Inscrição Estadual" sortable />
      <Column field="email" header="E-mail" sortable />
      <Column field="telefone" header="Telefone" sortable />

      <!-- Coluna de Ações -->
      <Column header="Ações">
        <template #body="{ data }">
          <Button icon="pi pi-search" class="p-button-text p-button-info" @click="editItem(data)" />
          <Button icon="pi pi-pencil" class="p-button-text" @click="editItem(data)" />
          <Button icon="pi pi-trash" class="p-button-danger p-button-text" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref, onMounted } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import { FilterMatchMode } from '@primevue/core/api';
import { useAuthStore } from '@/store/auth';
import { PessoaJuridica } from "../models/PessoaJuridica";

const loading = ref(true);
const pessoajuridica = ref<PessoaJuridica[]>([]);
const dialogVisible = ref(false);
const isEditing = ref(false);
const currentItem = ref<PessoaJuridica>(
  { id: 0, nome_fantasia: '', razao_social: '', cnpj: '', inscricao_estadual: '', email: '', telefone: '' }
);
const filters = ref({
  nome_fantasia: { value: null, matchMode: FilterMatchMode.CONTAINS },
  razao_social: { value: null, matchMode: FilterMatchMode.CONTAINS },
  cnpj: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const auth = useAuthStore();
const options = {
  method: 'GET',
  url: 'cadastros/api/pessoajuridica/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'TOKEN ' + auth.token
  }
};

function editItem(item: PessoaJuridica) {
  currentItem.value = { ...item };
  isEditing.value = true;
  dialogVisible.value = true;
}

function openNew() {
  currentItem.value = { id: 0, nome_fantasia: '', razao_social: '', cnpj: '', inscricao_estadual: '', email: '', telefone: '' };
  isEditing.value = false;
  dialogVisible.value = true;
}

onMounted(() => {
  axios.request(options)
    .then(function (response) {
      pessoajuridica.value = response.data;
      loading.value = false;
    })
    .catch(function (error) {
      console.error(error);
    });
});
</script>

<style scoped>
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>