<template>
  <div class="card">
    <Toast position="bottom-left" />
    <ConfirmDialog />
    <DataTable
      v-model:filters="filters"
      :value="gerentes"
      paginator
      :rows="10"
      dataKey="id"
      filterDisplay="row"
      :loading="loading"
      :globalFilterFields="['usuario.username', 'usuario.email', 'unidades']"
      class="mt-2"
      showGridlines
      stripedRows
      removableSort
    >
      <template #header>
        <div class="flex justify-between flex-wrap">
          <Button class="mt-2" label="Adicionar" icon="pi pi-plus" @click="openDialog()" />
          <div class="m-2">
            <IconField>
              <InputIcon>
                <i class="pi pi-search" />
              </InputIcon>
              <InputText v-model="filters['usuario.username'].value" placeholder="Busca geral" />
            </IconField>
          </div>
        </div>
      </template>

      <!-- Colunas da tabela -->
      <Column field="usuario.first_name" header="Usuário" sortable filter>
        <template #body="{ data }">
          {{ data.usuario.first_name }} {{ data.usuario.last_name }}
        </template>

      </Column>

      <Column field="usuario.email" header="E-mail" sortable filter>
        <template #body="{ data }">
          {{ data.usuario.email }}
        </template>
        <template #filter="{ filterModel }">
          <InputText v-model="filterModel.value" placeholder="Filtrar por e-mail" />
        </template>
      </Column>

      <Column field="unidades" header="Unidades" sortable style="max-width: 200px;">
  <template #body="{ data }">
    <div class="flex flex-wrap gap-2">
      <Tag
        v-for="unidade in data.unidades"
        :key="unidade.id"
        :value="unidade.nome"
        :class="unidade.ativo ? 'p-tag-success' : 'p-tag-danger'"
        class="p-mr-2"
        severity="info"
      />
    </div>
  </template>
</Column>

      <!-- Ações -->
      <Column header="Ações">
        <template #body="{ data }">
          <Button icon="pi pi-pencil" class="p-button-text" @click="openDialog(data)" />
          <Button icon="pi pi-trash" class="p-button-danger p-button-text" @click="confirmDelete(data)" />
        </template>
      </Column>
    </DataTable>

    <!-- Diálogo de Gerente -->
    <GerenteDialog v-model:visible="dialogVisible" :gerente="currentItem" @save="saveItem" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useToast } from "primevue/usetoast";
import confirmDialog from "primevue/confirmationservice";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import GerenteDialog from "../components/GerentesDialog.vue";
import { FilterMatchMode } from "@primevue/core/api";
import { useGerentes } from "../services/useGerentes";
import { Tag } from "primevue";
// Reactive variables
const { gerentes, loading, loadGerentes, deleteGerente } = useGerentes();
const filters = ref({
  "usuario.username": { value: null, matchMode: FilterMatchMode.CONTAINS },
  "usuario.email": { value: null, matchMode: FilterMatchMode.CONTAINS },
  "usuario.first_name": { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const dialogVisible = ref(false);
const currentItem = ref(null);
const isSaving = ref(false);

// Toast service
const toast = useToast();

// Functions
const openDialog = (item = null) => {
  currentItem.value = item;
  dialogVisible.value = true;
};

const saveItem = async () => {
  isSaving.value = true;
  try {
    await loadGerentes(); // Simulate save operation
    toast.add({
      severity: "success",
      summary: "Sucesso",
      detail: "Gerente salvo com sucesso!",
      life: 3000,
    });
    dialogVisible.value = false;
  } catch (error) {
    console.error("Error saving gerente:", error);
    toast.add({
      severity: "error",
      summary: "Erro",
      detail: "Erro ao salvar o gerente.",
      life: 3000,
    });
  } finally {
    isSaving.value = false;
  }
};

const confirmDelete = (gerente: any) => {
  confirmDialog({
    message: `Tem certeza que deseja excluir o gerente ${gerente.usuario.username}?`,
    header: "Confirmação",
    icon: "pi pi-exclamation-triangle",
    acceptClass: "p-button-danger",
    accept: async () => {
      try {
        await deleteGerente(gerente.id);
        loadGerentes();
        toast.add({
          severity: "success",
          summary: "Sucesso",
          detail: "Gerente excluído com sucesso!",
          life: 3000,
        });
      } catch (error) {
        console.error("Error deleting gerente:", error);
        toast.add({
          severity: "error",
          summary: "Erro",
          detail: "Erro ao excluir o gerente.",
          life: 3000,
        });
      }
    },
  });
};

// Load gerentes on component mount
onMounted(loadGerentes);
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