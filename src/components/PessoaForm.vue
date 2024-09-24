<!-- PessoaForm.vue -->
<template>
  <form @submit.prevent="save">
    <div class="p-fluid">
      <div class="field">
        <label for="name">Nome</label>
        <InputText v-model="formData.nome" id="name" required />
      </div>
      <div class="field">
        <label for="email">Email</label>
        <InputText v-model="formData.email" id="email" required />
      </div>
      <div class="field">
        <label for="telefone">Telefone</label>
        <InputText v-model="formData.telefone" id="telefone" required />
      </div>
      <div class="dialog-footer">
        <Button label="Save" type="submit" />
        <Button label="Cancel" class="p-button-secondary" @click="closeForm" />
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  formData: Object,
  isEditing: Boolean,
});

const emit = defineEmits(['save', 'cancel']);

function save() {
  emit('save', props.formData);
}

function closeForm() {
  emit('cancel');
}
</script>
