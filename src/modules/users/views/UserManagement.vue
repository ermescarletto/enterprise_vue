<template>
  <div class="card">
    <Toast position="bottom-left" />
    <ConfirmDialog />
    <DataTable
      v-model:filters="filters"
      :globalFilterFields="['username', 'email', 'cpf', 'first_name', 'last_name']" 
      :value="users"
      paginator
      :rows="10"
      dataKey="id"
      :loading="loading"
      class="mt-2"
      showGridlines
      stripedRows
      removableSort
      :sortField="'id'" 
      :sortOrder="1" 
    >
      <template #header>
        <div class="flex justify-content-between flex-wrap">
          <div class="m-2">
            <Button
              class="mt-2"
              label="Adicionar"
              icon="pi pi-plus"
              @click="createNew"
            />
          </div>
          <div class="m-2"></div>
          <div class="m-2">
            <IconField>
              <InputIcon>
                <i class="pi pi-search" />
              </InputIcon>
              <InputText
                v-model="filters['global'].value"
                placeholder="Busca geral"
              />
            </IconField>
          </div>
        </div>
      </template>
      <template #empty> Nenhum registro encontrado. </template>
      <template #loading> <ProgressSpinner /> </template>
      <Column field="id" header="Id" sortable />
      <Column
        header="Nome "
        field="first_name"
        sortable
      />
      <Column
        header="Sobrenome "
        field="last_name"
        sortable
      />
      <Column field="email" header="Email" filterField="email" style="min-width: 12rem" sortable/>
      <Column header="Ações">
        <template #body="slotProps">
          <Button
            icon="pi pi-pencil"
            class="p-button-text p-button-warning"
            @click="editUser(slotProps.data)"
          />
          <Button
            icon="pi pi-trash"
            class="p-button-text p-button-danger"
            @click="deleteUser(slotProps.data.id)"
          />
        </template>
      </Column>
    </DataTable>
    <Dialog
      v-model:visible="dialogVisible"
      :header="isEditing ? 'Editar Usuário' : 'Adicionar Usuário'"
      :closable="!isSaving"
      draggable
      resizable
      maximizable
      class="w-11 md:w-8 lg:w-6"
    >
      <div v-if="isSaving" class="dialog-overlay">
        <ProgressSpinner />
      </div>
      <UserForm
        :formData="currentItem"
        :model="new User()"
        :isEditing="isEditing"
        :excludeFields="isEditing ? ['password_set', 'id'] : ['password_set', 'id']"
        @save="saveItem"
        @cancel="closeDialog"
      />
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { useToast } from "primevue/usetoast";
import { useUsers } from "../services/useUsers";
import { ref, onMounted } from "vue";
import { User } from "../models/User";
import DataTable from "primevue/datatable";
import Dialog from "primevue/dialog";
import Toast from "primevue/toast";
import ConfirmDialog from "primevue/confirmdialog";
import Column from "primevue/column";
import Button from "primevue/button";
import { ProgressSpinner } from "primevue";
import { FilterMatchMode } from "@primevue/core/api";
import UserForm from "../components/UserForm.vue";
import api from "@/api/services/apiAxios";
import { removeNonNumeric, formatDateToYYYYMMDD } from "../../../utils/utils";


// State variables
const dialogVisible = ref(false);
const users = ref<User[]>([]);
const loading = ref(false);
const selectedUser = ref<User | null>(null);
const isSaving = ref(false);

const currentItem = ref<User>({
  id: 0,
  first_name: "",
  last_name: "",
  username: "",
  email: "",
  cpf: "",
  telefone: "",
  data_nascimento: "",
  is_admin: false,
  is_staff: false,
  password_set: false,
  groups: [],
  user_permissions: [],
});

// Services
const { fetchUsers, deleteUserById } = useUsers();

// Wrapper method for handling the Add User button click
const isEditing = ref(false);
const toast = useToast();
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }, // Filtro global
  email: { value: null, matchMode: FilterMatchMode.CONTAINS },
  username: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

// Fetch users on component mount
onMounted(async () => {
  await loadUsers();
});

// Methods
const loadUsers = async () => {
  loading.value = true;
  try {
    const response = await fetchUsers();
    users.value = response.map((user) => ({
      ...user    }));
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Falha ao carregar os usuários.",
    });
  } finally {
    loading.value = false;
  }
};

const createNew = () => {
  currentItem.value = {
    id: 0,
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    cpf: "",
    telefone: "",
    data_nascimento: "",
    is_admin: false,
    is_staff: false,
    password_set: false,
    groups: [],
    user_permissions: [],
  };
  dialogVisible.value = true;
  isEditing.value = false;
};

function saveItem(item: User) {
  isSaving.value = true;

  // Limpa os campos antes de enviar
  const payload = {
    ...item,
    cpf: removeNonNumeric(item.cpf), // Remove formatação do CPF
    telefone: removeNonNumeric(item.telefone), // Remove formatação do telefone
    data_nascimento: formatDateToYYYYMMDD(item.data_nascimento), // Converte a data para o formato YYYY-MM-DD
    groups: item.groups.map((group) => group), // Extrai apenas os IDs dos grupos
    user_permissions: item.user_permissions.map((perm) => perm),
  };

  const request = isEditing.value
    ? api.put(`/auth/api/users/${item.id}/`, payload)
    : api.post('/auth/api/users/', payload);
  console.log('payload', payload);
  request
    .then(() => {
      closeDialog();
      toast.add({
        severity: 'success',
        summary: 'Sucesso',
        life: 3000,
        detail: isEditing.value
          ? 'Atualizado com sucesso!'
          : 'Criado com sucesso!',
      });
    })
    .catch((error) => {
      console.error('Erro ao salvar:', error);
      toast.add({
        severity: 'error',
        life: 3000,
        summary: 'Erro',
        detail: '' + error,
      });
    })
    .finally(() => {
      isSaving.value = false;
      loadUsers();
    });
}
const editUser = (user: User) => {
  currentItem.value = {
    ...user,
  }; // Copia os dados do usuário para o formulário
  isEditing.value = true;
  dialogVisible.value = true;
};

function closeDialog() {
  dialogVisible.value = false;
  selectedUser.value = null;
  isEditing.value = false;
}

const deleteUser = async (userId: number) => {
  try {
    await deleteUserById(userId);
    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Usuário removido com sucesso.",
    });
    await loadUsers();
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Falha ao remover o usuário",
    });
  }
};
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