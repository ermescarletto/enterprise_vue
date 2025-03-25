<template>
  <div class="card">
    <DataTable
      v-model:filters="filters"
      :value="unidades"
      paginator
      :rows="10"
      dataKey="id"
      filterDisplay="row"
      :loading="loading"
      :globalFilterFields="['nome', 'cnpj']"
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
              <InputText v-model="filters['nome'].value" placeholder="Busca geral" />
            </IconField>
          </div>
        </div>
      </template>

      <!-- Definição das colunas -->
      <Column field="codigo" header="Codigo" sortable filter>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="Filtrar por codigo" />
        </template>
      </Column>

      <Column field="nome" header="Nome" sortable filter>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="Filtrar por nome" />
        </template>
      </Column>
      <Column field="cnpj" header="CNPJ" sortable filter>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="Filtrar por CNPJ" />
        </template>
      </Column>
      <Column field="empresa" header="Empresa" sortable filter>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="Filtrar por Empresa" />
        </template>
      </Column>
      
      <Column field="ativo" header="Ativo" sortable filter>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="Filtrar por Ativo" />
        </template>
      </Column>



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
import { ref, } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import { FilterMatchMode } from '@primevue/core/api';
import { useAuthStore } from '@/store/auth';
import { Unidade } from "../models/Unidade";

const loading = ref(true);
const unidades = ref<Unidade[]>([]);
const dialogVisible = ref(false);
const isEditing = ref(false);
const currentItem = ref<Unidade>(
  { id: 0, codigo: 0, nome: '', cnpj: '', empresa: 0, ativo: true,}
);
const filters = ref({
  nome: { value: null, matchMode: FilterMatchMode.CONTAINS },
  cnpj: { value: null, matchMode: FilterMatchMode.CONTAINS },
  ativo: { value: null, matchMode: FilterMatchMode.EQUALS },
  empresa: { value: null, matchMode: FilterMatchMode.CONTAINS },
  codigo: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const auth = useAuthStore();
const options = {
  method: 'GET',
  url: 'cadastros/api/unidade/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'TOKEN ' + auth.token
  }
};

function editItem(item: Unidade) {
  currentItem.value = { ...item };
  isEditing.value = true;
  dialogVisible.value = true;
}

function openNew() {
  currentItem.value = { id: 0, nome: '', codigo: 0, cnpj: '', ativo: true, empresa: 0, };
  isEditing.value = false;
  dialogVisible.value = true;
}

  
axios.request(options)
    .then(function (response) {
      console.log(response)
      unidades.value = response.data;

      loading.value = false;
    })
    .catch(function (error) {
      console.error(error);
    });

</script>

<style scoped>
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>