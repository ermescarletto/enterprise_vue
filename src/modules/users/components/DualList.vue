<template>
  <div class="dual-list">
    <!-- Lista de itens disponíveis -->
    <div class="list-container">
      <div class="list-header">
        <label>{{ availableTitle }}</label>
        <Button label="Selecionar Todos" class="p-button-sm p-button-text" @click="selectAllAvailable"
          :disabled="availableItems.length === 0" />
      </div>
      <ul>
        <li v-for="item in availableItems" :key="item.id"
          @click="!isItemSelected(item) && selectItem(item, 'available')" :class="{
            selected: selectedAvailable.includes(item),
            disabled: isItemSelected(item),
          }">
          {{ item.name }}
        </li>

      </ul>
    </div>

    <!-- Controles -->
    <div class="controls">
      <Button icon="pi pi-angle-right" class="p-button-sm" :disabled="selectedAvailable.length === 0"
        @click="moveToSelected" />
      <Button icon="pi pi-angle-left" class="p-button-sm" :disabled="selectedSelected.length === 0"
        @click="moveToAvailable" />
      <Button label="Remover Todos" class="p-button-sm p-button-text" @click="removeAllSelected"
        :disabled="selectedItems.length === 0" />
    </div>

    <!-- Lista de itens selecionados -->
    <div class="list-container">
      <div class="list-header">
        <label>{{ selectedTitle }}</label>
        <Button label="Remover Todos" class="p-button-sm p-button-text" @click="removeAllSelected"
          :disabled="selectedItems.length === 0" />
      </div>
      <ul>
        <li v-for="item in selectedItems" :key="item.id" @click="selectItem(item, 'selected')"
          :class="{ selected: selectedSelected.includes(item) }">
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';
import Button from 'primevue/button';

const props = defineProps({
  availableItems: {
    type: Array,
    required: true,
  },
  selectedItems: {
    type: Array,
    required: true,
  },
  availableTitle: {
    type: String,
    default: 'Disponíveis',
  },
  selectedTitle: {
    type: String,
    default: 'Selecionados',
  },
});

const emit = defineEmits(['update:availableItems', 'update:selectedItems']);

const selectedAvailable = ref([]);
const selectedSelected = ref([]);

// Selecionar ou desmarcar um item
const selectItem = (item: any, list: string) => {
  if (list === 'available') {
    if (selectedAvailable.value.includes(item)) {
      selectedAvailable.value = selectedAvailable.value.filter((i) => i !== item);
    } else {
      selectedAvailable.value.push(item);
    }
  } else if (list === 'selected') {
    if (selectedSelected.value.includes(item)) {
      selectedSelected.value = selectedSelected.value.filter((i) => i !== item);
    } else {
      selectedSelected.value.push(item);
    }
  }
};

// Mover itens selecionados para a lista de selecionados
const moveToSelected = () => {
  const newItems = selectedAvailable.value.filter(
    (item) => !props.selectedItems.some((s) => s.id === item.id)
  );
  const newSelectedItems = [...props.selectedItems, ...newItems];
  emit('update:selectedItems', newSelectedItems);
  selectedAvailable.value = [];
};

// Mover itens selecionados para a lista de disponíveis
const moveToAvailable = () => {
  const newSelectedItems = props.selectedItems.filter(
    (item) => !selectedSelected.value.includes(item)
  );
  -
    emit('update:selectedItems', newSelectedItems);

  selectedSelected.value = [];
};

// Selecionar todos os itens disponíveis
const selectAllAvailable = () => {
  const newItems = props.availableItems.filter(
    (item) => !props.selectedItems.some((s) => s.id === item.id)
  );
  emit('update:selectedItems', [...props.selectedItems, ...newItems]);
};
// Remover todos os itens da lista de selecionados
const removeAllSelected = () => {
  emit('update:selectedItems', []);
};
const isItemSelected = (item: any) => {
  return props.selectedItems.some((s) => s.id === item.id);
};
</script>

<style scoped>
.dual-list {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.list-container {
  flex: 1;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 1rem;
  max-height: 300px;
  overflow-y: auto;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.list-container ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.list-container li {
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 4px;
}

.list-container li.selected {
  background-color: #007ad9;
  color: white;
}

.list-container li.disabled {
  color: #ccc;
  cursor: not-allowed;
  pointer-events: none;
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>