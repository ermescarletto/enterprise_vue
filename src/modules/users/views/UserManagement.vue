<template>
    <div class="card">   
    <DataTable 
    v-model:filters="filters" 
    :value="usuarios" 
    paginator :rows="10" 
    dataKey="id" 
    filterDisplay="row"
    :loading="loading" :globalFilterFields="['username', 'email', 'cpf']" 
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
              <InputText v-model="filters['cpf'].value" placeholder="Buscar pelo CPF" />
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
      <Column header="Email" filterField="email" field="email" style="min-width: 12rem">
        <template #body="{ data }">
            <div class="flex items-center gap-2">
                <span>{{ data.email }}</span>
            </div>
        </template>
        <template #filter="{ filterModel }">
            <InputText v-model="filterModel.value" type="text" placeholder="Search by email" />
        </template>
        <template #filterclear="{ filterCallback }">
            <Button type="button" icon="pi pi-times" @click="filterCallback()" severity="secondary"></Button>
        </template>
        <template #filterapply="{ filterCallback }">
            <Button type="button" icon="pi pi-check" @click="filterCallback()" severity="success"></Button>
        </template>
        <template #filterfooter>
            <div class="px-4 pt-0 pb-4 text-center">Customized Buttons</div>
        </template>
      </Column>
      <Column field="telefone" sortable header="Telefone">
        <template #body="{ data }">
            <div class="flex items-center gap-2">
                <span>{{ data.telefone }}</span>
            </div>
        </template>
        <template #filter="{ filterModel }">
            <InputText v-model="filterModel.value" type="text" placeholder="Search by telefone" />
        </template>
        <template #filterclear="{ filterCallback }">
            <Button type="button" icon="pi pi-times" @click="filterCallback()" severity="secondary"></Button>
        </template>
        <template #filterapply="{ filterCallback }">
            <Button type="button" icon="pi pi-check" @click="filterCallback()" severity="success"></Button>
        </template>
        <template #filterfooter>
            <div class="px-4 pt-0 pb-4 text-center">Customized Buttons</div>
        </template>
      </Column>
      <Column header="Ações">
        <template #body="{ data }">
            <Button icon="pi pi-search" class="p-button-text p-button-info" @click="editItem(data)" />

            <Button icon="pi pi-pencil" class="p-button-text" @click="editItem(data)" />
            <Button icon="pi pi-trash" class="p-button-danger p-button-text" @click="deleteItem(data.id)" />
            
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

</template>

<script setup lang="ts">
/*import { ref, onMounted } from 'vue';
/*import { useAuthStore } from '@/stores/auth';*/

//import MenuHeader from '@/components/MenuHeader.vue';

import axios from "axios";
import { useAuthStore } from '@/store/auth';
import { FilterMatchMode } from '@primevue/core/api';
import { ref, onMounted } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import { Usuario } from "../models/User";
// Define types for the items

const loading = ref(true);
const auth = useAuthStore();

// State variables
const usuarios = ref();
const dialogVisible = ref(false);
const isEditing = ref(false);
const isDelete = ref(false);
const currentItem = ref<Usuario>();

const filters = ref({
  'username': { value: null, matchMode: FilterMatchMode.CONTAINS },
  'cpf' : { value: null, matchMode: FilterMatchMode.CONTAINS},
  'email': { value: null, matchMode: FilterMatchMode.CONTAINS }, 
});

const options = {
  method: 'GET',
  url: 'http://localhost:8000/auth/api/list/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'TOKEN ' + auth.token
  }
};

function saveItem() {

}


function deleteItem(item: Usuario){
  currentItem.value = { ...item };
  isDelete.value = true;
  dialogVisible.value = true;

}

function editItem(item: Usuario) {
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

  onMounted(usuarios.value = response.data);
  loading.value = false;
  console.log(usuarios.value);

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
</style>
