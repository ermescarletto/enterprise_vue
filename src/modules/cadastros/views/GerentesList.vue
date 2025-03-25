<template>
  <div class="card">
    <DataTable
      v-model:filters="filters"
      :value="gerentes"
      paginator
      :rows="10"
      dataKey="id"
      filterDisplay="row"
      :loading="loading"
      :globalFilterFields="['usuario', 'unidades']"
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
              <InputText v-model="filters['usuario'].value" placeholder="Busca geral" />
            </IconField>
          </div>
        </div>
      </template>

      <!-- Colunas da tabela -->
      <Column field="usuario" header="Usuário" sortable filter>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="Filtrar por usuário" />
        </template>
      </Column>

      <Column field="unidades" header="Unidades" sortable filter>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="Filtrar por unidades" />
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
    <GerenteDialog v-model:visible="dialogVisible" :gerente="currentItem"  @save="saveItem" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useGerentes } from "../services/useGerentes";
import GerenteDialog from "../components/GerentesDialog.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import { FilterMatchMode } from "@primevue/core/api";

const { gerentes, loading, loadGerentes, deleteGerente } = useGerentes();
const filters = ref({ usuario: { value: null, matchMode: FilterMatchMode.CONTAINS }, unidades: { value: null, matchMode: FilterMatchMode.CONTAINS } });

const dialogVisible = ref(false);
const currentItem = ref(null);

const openDialog = (item = null) => {
  currentItem.value = item;
  dialogVisible.value = true;
};

const saveItem = () => {
  loadGerentes();
  dialogVisible.value = false;
};

const confirmDelete = async (item: any) => {
  if (confirm(`Tem certeza que deseja excluir ${item.usuario}?`)) {
    await deleteGerente(item.id);
    loadGerentes();
  }
};

onMounted(loadGerentes);
</script>
