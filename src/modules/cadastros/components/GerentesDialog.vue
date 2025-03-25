<template>
    <Dialog v-model:visible="visible" :header="dialogTitle" modal class="min-w-[400px] sm:min-w-[500px] md:min-w-[600px]">
      <div class="p-fluid space-y-4">
        <!-- Usuário -->
        <div class="p-field">
          <label for="usuario" class="block font-semibold">Usuário</label>
          <Dropdown
            v-model="localGerente.usuario"
            :options="usuarios"
            optionLabel="email"
            optionValue="id"
            placeholder="Selecione um usuário"
            class="w-full"
            :loading="loadingUsuarios"
          />
        </div>
  
        <!-- Unidades -->
        <div class="p-field">
          <label for="unidades" class="block font-semibold">Unidades</label>
          <MultiSelect
            v-model="localGerente.unidades"
            :options="unidades"
            optionLabel="nome"
            optionValue="id"
            placeholder="Selecione unidades"
            class="w-full"
            :loading="loadingUnidades"
          />
        </div>
      </div>
  
      <template #footer>
        <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="$emit('close')" />
        <Button label="Salvar" icon="pi pi-check" class="p-button-success" @click="saveGerente" />
      </template>
    </Dialog>
  </template>
  
  <script setup lang="ts">
  import { ref, watch, defineProps, defineEmits, computed } from "vue";
  import Dropdown from "primevue/dropdown";
  import MultiSelect from "primevue/multiselect";
  import Dialog from "primevue/dialog";
  import Button from "primevue/button";
  import { Gerente } from "../models/Gerente";
  
  const props = defineProps<{
    visible: boolean;
    gerente: Gerente | null;
    usuarios: { id: number; email: string }[];
    unidades: { id: number; nome: string }[];
    loadingUsuarios: boolean;
    loadingUnidades: boolean;
  }>();
  
  const emits = defineEmits(["save", "close"]);
  
  const localGerente = ref<Gerente>({
    usuario: null,
    unidades: [],
  });
  
  watch(
    () => props.gerente,
    (newGerente) => {
      if (newGerente) {
        Object.assign(localGerente.value, newGerente);
      } else {
        localGerente.value = { usuario: null, unidades: [] };
      }
    },
    { immediate: true, deep: true }
  );
  
  const saveGerente = () => {
    emits("save", localGerente.value);
  };
  
  const dialogTitle = computed(() => (props.gerente?.id ? "Editar Gerente" : "Novo Gerente"));
  </script>
  
  <style scoped>
  .p-field {
    margin-bottom: 1rem;
  }
  </style>
  