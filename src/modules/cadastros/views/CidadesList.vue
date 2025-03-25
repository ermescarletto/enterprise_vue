<template>
  <div class="card">
    <DataTable
      v-model:filters="filters"
      :value="cidades"
      paginator
      :rows="10"
      dataKey="id"
      filterDisplay="row"
      :loading="loading"
      :globalFilterFields="['nome', 'estado', 'cep_de', 'cep_ate']"
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
      <!-- ... demais colunas ... -->
      <Column header="Ações">
        <template #body="{ data }">
          <Button icon="pi pi-search" class="p-button-text p-button-info" @click="editItem(data)" />
          <Button icon="pi pi-pencil" class="p-button-text" @click="editItem(data)" />
          <Button icon="pi pi-trash" class="p-button-danger p-button-text" />
        </template>
      </Column>
    </DataTable>
  </div>

  <!-- Dialog com as propriedades para arrastar, maximizar e fechar -->
  <Dialog
    v-model:visible="dialogVisible"
    header="Cadastro de Cidade"
    :closable="false"
    draggable
    resizable
    maximizable
    class="w-11 md:w-8 lg:w-6"
  >
    <!-- Substitua 'CidadeForm' pelo seu componente de formulário -->
    <CidadeForm :formData="currentItem" :isEditing="isEditing" @save="saveItem" @cancel="closeDialog" />
  </Dialog>
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
// Importe o componente do formulário de cidade
import CidadeForm from '@/components/CidadeForm.vue';
import { FilterMatchMode } from '@primevue/core/api';
import { useAuthStore } from '@/store/auth';

interface Cidade {
  id: number;
  nome: string;
  estado: string;
  cep_de: number;
  cep_ate: number;
}

const loading = ref(true);
const cidades = ref<Cidade[]>([]);
const dialogVisible = ref(false);
const isEditing = ref(false);
const currentItem = ref<Cidade>({
  id: 0,
  nome: '',
  estado: '',
  cep_de: 0,
  cep_ate: 0,
});
const filters = ref({
  nome: { value: null, matchMode: FilterMatchMode.CONTAINS },
  estado: { value: null, matchMode: FilterMatchMode.CONTAINS },
  cep_de: { value: null, matchMode: FilterMatchMode.CONTAINS },
  cep_ate: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const auth = useAuthStore();
const options = {
  method: 'GET',
  url: 'http://localhost:8000/cadastros/api/cidades/',
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'insomnia/10.0.0',
    Authorization: 'TOKEN ' + auth.token
  }
};

function saveItem(item: Cidade) {
  // Aqui você implementa a lógica para salvar a cidade (via API ou outro método)
  console.log('Salvando cidade:', item);
  closeDialog();
}

function editItem(item: Cidade) {
  currentItem.value = { ...item };
  isEditing.value = true;
  dialogVisible.value = true;
}

function openNew() {
  currentItem.value = { id: 0, nome: '', estado: '', cep_de: 0, cep_ate: 0 };
  isEditing.value = false;
  dialogVisible.value = true;
}

function closeDialog() {
  dialogVisible.value = false;
}

axios.request(options)
  .then(function (response) {
    cidades.value = response.data;
    loading.value = false;
  })
  .catch(function (error) {
    console.error(error);
  });

onMounted(() => {
  // Se preferir disparar a requisição no onMounted, mova o axios.request para cá.
});
</script>

<style scoped>
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
