<template>
<div class="dashboard"> 
    <MenuHeader></MenuHeader>
    <div>
    <DataTable
      :value="items"
      :filters="filters"
      :sortField="sortField"
      :sortOrder="sortOrder"
      dataKey="id"
      responsiveLayout="scroll"
    >
      <Column field="id" header="ID" sortable filter />
      <Column field="name" header="Name" sortable filter />
      <Column field="description" header="Description" sortable filter />
      <Column field="created_at" header="Created At" sortable filter />

      <!-- Action Buttons for CRUD -->
      <Column header="Actions" />
    </DataTable>

    <!-- Dynamic Dialog for Create/Update -->
    <Dialog v-model:visible="dialogVisible" header="Edit Item" :closable="false">
      <form @submit.prevent="saveItem">
        <div class="p-fluid">
          <div class="field">
            <label for="name">Name</label>
            <InputText v-model="currentItem.name" id="name" />
          </div>
          <div class="field">
            <label for="description">Description</label>
            <InputText v-model="currentItem.description" id="description" />
          </div>
        </div>
        <div class="dialog-footer">
          <Button label="Save" type="submit" />
          <Button label="Cancel" class="p-button-secondary" @click="dialogVisible = false" />
        </div>
      </form>
    </Dialog>

    <!-- Button for Adding a New Item -->
    <Button label="Add New Item" icon="pi pi-plus" @click="openNew" />
  </div>

</div>
</template>

<script setup lang="ts">
/*import { ref, onMounted } from 'vue';
/*import { useAuthStore } from '@/stores/auth';*/

import MenuHeader from '../components/MenuHeader.vue';

import { ref } from 'vue';
import axios from 'axios';
import DataTable from '@/components/DataTable.vue';
import Column from 'primevue/column';
import Button from 'primevue/button';
// Define types for the items
interface Item {
  id: number | null;
  name: string;
  description: string;
  created_at: string;
}

// State variables
const items = ref<Item[]>([]);
const filters = ref({});
const sortField = ref('id');
const sortOrder = ref(1);
const dialogVisible = ref(false);
const currentItem = ref<Item>({
  id: null,
  name: '',
  description: '',
  created_at: '',
});

// Fetch data from API
const fetchItems = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/items/');
    items.value = response.data;
  } catch (error) {
    console.error('Error fetching items:', error);
  }
};

// Open dialog for new item
const openNew = () => {
  dialogVisible.value = true;
  currentItem.value = { id: null, name: '', description: '', created_at: '' }; // Reset form
};

// Save item (Create/Update)
const saveItem = async () => {
  try {
    if (currentItem.value.id) {
      // Update existing item
      await axios.put(`http://localhost:8000/api/items/${currentItem.value.id}/`, currentItem.value);
    } else {
      // Create new item
      await axios.post('http://localhost:8000/api/items/', currentItem.value);
    }
    dialogVisible.value = false;
    fetchItems(); // Refresh items after saving
  } catch (error) {
    console.error('Error saving item:', error);
  }
};

/*// Edit item
const editItem = (item: Item) => {
  currentItem.value = { ...item }; // Clone the item
  dialogVisible.value = true;
};

// Delete item
const deleteItem = async (id: number) => {
  try {
    await axios.delete(`http://localhost:8000/api/items/${id}/`);
    fetchItems(); // Refresh items after deletion
  } catch (error) {
    console.error('Error deleting item:', error);
  }
};*/


// Fetch items when the component is mounted
fetchItems();

    
</script>



<style scoped>


.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
.dashboard {
  min-height: 100vh; /* Garante que o fundo cubra a altura completa da janela */
  padding: 10px;
  background-image: url(../assets/background.png);
  background-repeat: repeat; /* Repetir em ambas direções */
  background-size: cover; /* O fundo cobre a área visível */
  background-attachment: fixed; /* Mantém o fundo fixo enquanto o conteúdo rola */
}
</style>
