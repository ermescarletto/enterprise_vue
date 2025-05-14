<template>
    <div class="container">
      <h1 class="text-primary mb-4">Cadastro de Dashboards Públicos</h1>
      <Button label="Novo Dashboard" icon="pi pi-plus" class="mb-4" @click="showDialog = true" />
  
      <DataTable :value="dashboards" class="p-datatable-gridlines" :paginator="true" :rows="10">
        <Column field="nome" header="Nome" />
        <Column field="workspace_id" header="Workspace ID" />
        <Column field="report_id" header="Report ID" />
        <Column field="ativo" header="Ativo" :body="ativoTemplate" />
        <Column field="publico" header="Público" :body="publicoTemplate" />
        <Column header="Ações" :body="actionTemplate" />
      </DataTable>
  
      <Dialog v-model:visible="showDialog" header="Cadastro de Dashboard Público" :modal="true" :closable="true" :style="{ width: '50vw' }">
        <form @submit.prevent="saveDashboard">
          <div class="p-fluid">
            <div class="field">
              <label for="nome">Nome</label>
              <InputText id="nome" v-model="form.nome" required />
            </div>
            <div class="field">
              <label for="workspace_id">Workspace ID</label>
              <InputText id="workspace_id" v-model="form.workspace_id" required />
            </div>
            <div class="field">
              <label for="report_id">Report ID</label>
              <InputText id="report_id" v-model="form.report_id" required />
            </div>
            <div class="field">
              <label for="url_dashboard">URL do Dashboard</label>
              <InputText id="url_dashboard" v-model="form.url_dashboard" />
            </div>
            <div class="field">
              <label for="ativo">Ativo</label>
              <Checkbox id="ativo" v-model="form.ativo" />
            </div>
            <div class="field">
              <label for="publico">Público</label>
              <Checkbox id="publico" v-model="form.publico" />
            </div>
          </div>
          <div class="flex justify-content-end mt-4">
            <Button label="Salvar" icon="pi pi-check" type="submit" class="mr-2" />
            <Button label="Cancelar" icon="pi pi-times" class="p-button-secondary" @click="showDialog = false" />
          </div>
        </form>
      </Dialog>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, reactive, onMounted } from 'vue';
  import { useToast } from 'primevue/usetoast';
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import Button from 'primevue/button';
  import Dialog from 'primevue/dialog';
  import InputText from 'primevue/inputtext';
  import Checkbox from 'primevue/checkbox';
  import { DashboardPublico } from '../models/Dashboard';
  import { useDashboards } from '../services/useDashboards';

  const dashboards = ref([DashboardPublico]);
  const showDialog = ref(false);
  const form = reactive({
    id: null,
    nome: '',
    workspace_id: '',
    report_id: '',
    url_dashboard: '',
    ativo: true,
    publico: false,
  });
  const toast = useToast();
  
  const fetchDashboards = async () => {
    // Simulação de chamada à API

  };
  
  const saveDashboard = async () => {
    showDialog.value = false;
    resetForm();
  };
  
  const editDashboard = (dashboard: DashboardPublico) => {
    Object.assign(form, dashboard);
    showDialog.value = true;
  };
  
  const deleteDashboard = (id: number) => {
    toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Dashboard excluído!' });
  };
  
  const resetForm = () => {
    form.id = null;
    form.nome = '';
    form.workspace_id = '';
    form.report_id = '';
    form.url_dashboard = '';
    form.ativo = true;
    form.publico = false;
  };
  
  const ativoTemplate = (rowData: any) => {
    return rowData.ativo ? 'Sim' : 'Não';
  };
  
  const publicoTemplate = (rowData: any) => {
    return rowData.publico ? 'Sim' : 'Não';
  };
  
  const actionTemplate = (rowData: any) => {
    return (
      <div>
        <Button icon="pi pi-pencil" class="p-button-rounded p-button-text" @click="editDashboard(rowData)" />
        <Button icon="pi pi-trash" class="p-button-rounded p-button-text p-button-danger" @click="deleteDashboard(rowData.id)" />
      </div>
    );
  };
  
  onMounted(() => {
    fetchDashboards();
  });
  </script>
  
  <style scoped>
  .container {
    padding: 20px;
  }
  </style>