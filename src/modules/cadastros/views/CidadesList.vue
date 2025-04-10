<template>
  <div class="card">
    <Toast position="bottom-left"/>
    <ConfirmDialog />
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
      <Column header="Estado" filterField="estado" field="estado" style="min-width: 12rem">
        <template #body="{ data }">
          <div class="flex items-center gap-2">
            <span>{{ data.estado }}</span>
          </div>
        </template>
        <template #filter="{ filterModel }">
          <InputText v-model="filterModel.value" type="text" placeholder="Search by email" />
        </template>
      </Column>
      <Column field="cep_ate" sortable header="Cep Final">
        <template #body="{ data }">
          <div class="flex items-center gap-2">
            <span>{{ data.cep_ate }}</span>
          </div>
        </template>
      </Column>
      <Column field="cep_de" sortable header="Cep Inicial">
        <template #body="{ data }">
          <div class="flex items-center gap-2">
            <span>{{ data.cep_de }}</span>
          </div>
        </template>
      </Column>
      <Column header="Ações">
        <template #body="{ data }">
          <Button icon="pi pi-pencil" class="p-button-text" @click="editItem(data)" />
          <Button icon="pi pi-trash" class="p-button-danger p-button-text" @click="confirmDelete(data.id)" />
        </template>
      </Column>
    </DataTable>
  </div>

  <!-- Dialog -->
  <Dialog
    v-model:visible="dialogVisible"
    header="Cadastro de Cidade"
    :closable="!isSaving"
    draggable
    resizable
    maximizable
    class="w-11 md:w-8 lg:w-6"
  >
    <div v-if="isSaving" class="dialog-overlay">
      <ProgressSpinner />
    </div>
    <CidadeForm :formData="currentItem" :isEditing="isEditing" @save="saveItem" @cancel="closeDialog" />
  </Dialog>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref, onMounted } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import CidadeForm from "@/modules/cadastros/components/CidadeForm.vue";
import Dialog from "primevue/dialog";
import Toast from "primevue/toast";
import ConfirmDialog from "primevue/confirmdialog";
import { useToast } from "primevue/usetoast";
import ProgressSpinner from "primevue/progressspinner";
import { FilterMatchMode } from "@primevue/core/api";
import { useAuthStore } from "@/store/auth";
import {Cidade} from "./../models/Cidade"; 
import { useConfirm } from "primevue/useconfirm";

// Reactive variables

const isSaving = ref(false);
const loading = ref(true);
const cidades = ref<Cidade[]>([]);
const dialogVisible = ref(false);
const isEditing = ref(false);
const currentItem = ref<Cidade>({
  id: 0,
  nome: "",
  estado: "",
  cep_de: 0,
  cep_ate: 0,
});
const filters = ref({
  nome: { value: null, matchMode: FilterMatchMode.CONTAINS },
  estado: { value: null, matchMode: FilterMatchMode.CONTAINS },
  cep_de: { value: null, matchMode: FilterMatchMode.CONTAINS },
  cep_ate: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

// Auth and headers
const auth = useAuthStore();
const headers = {
  Authorization: "TOKEN " + auth.token,
};

// Toast service
const toast = useToast();
const confirm = useConfirm();

// Fetch cities on component mount
onMounted(() => {
  fetchCities();
});

// Functions
function fetchCities() {
  loading.value = true;
  axios
    .get("/cadastros/api/cidades/", { headers })
    .then((response) => {
      cidades.value = response.data;
    })
    .catch((error) => {
      console.error("Error fetching cities:", error);
    })
    .finally(() => {
      loading.value = false;
    });
}

function saveItem(item: Cidade) {
  isSaving.value = true;
  const request = isEditing.value
    ? axios.put(`/cadastros/api/cidades/${item.id}/`, item, { headers })
    : axios.post("/cadastros/api/cidades/", item, { headers });

  request
    .then(() => {
      fetchCities();
      closeDialog();
      toast.add({
        severity: "success",
        summary: "Sucesso",
        life: 3000,
        detail: isEditing.value
          ? "Cidade atualizada com sucesso!"
          : "Cidade criada com sucesso!",
      });
    })
    .catch((error) => {
      console.error("Error saving city:", error);
      toast.add({
        severity: "error",
        life: 3000,
        summary: "Erro",
        detail: "Erro ao salvar a cidade.",
      });
    })
    .finally(() => {
      isSaving.value = false;
    });
}

function editItem(item: Cidade) {
  currentItem.value = { ...item };
  isEditing.value = true;
  dialogVisible.value = true;
}

function openNew() {
  currentItem.value = { id: 0, nome: "", estado: "", cep_de: 0, cep_ate: 0 };
  isEditing.value = false;
  dialogVisible.value = true;
}

function confirmDelete(id: number) {
  confirm.require({
    message: "Deseja mesmo deletar esta cidade?",
    header: "Confirmação",
    icon: "pi pi-exclamation-triangle",
    acceptClass: "p-button-danger",
    accept: () => {
      deleteItem(id);
      toast.add({ severity: 'info', summary: 'Confirmado', detail: 'Item removido.', life: 3000 });
    }
    
  });
}

function deleteItem(id: number) {
  axios
    .delete(`/cadastros/api/cidades/${id}/`, { headers })
    .then(() => {
      fetchCities();
      toast.add({
        severity: "success",
        summary: "Sucesso",
        life: 3000,
        detail: "Cidade excluída com sucesso!",
      });
    })
    .catch((error) => {
      console.error("Error deleting city:", error);
      toast.add({
        severity: "error",
        summary: "Erro",
        life: 3000,
        detail: "Erro ao excluir a cidade.",
      });
    });
}

function closeDialog() {
  dialogVisible.value = false;
}
</script>

<style scoped>
.dialog-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>