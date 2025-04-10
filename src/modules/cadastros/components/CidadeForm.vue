<template>
    <form @submit.prevent="handleSubmit" class="form-container">
      <div class="field">
        <label for="nome">Nome</label>
        <InputText id="nome" v-model="localFormData.nome" required placeholder="Nome da cidade" />
      </div>
  
      <div class="field">
        <label for="estado">Estado</label>
        <Dropdown
          id="estado"
          v-model="localFormData.estado"
          :options="ufs"
          optionLabel="label"
          optionValue="value"
          placeholder="Selecione o estado"
          required
        />
      </div>
  
      <div class="field-row">
        <div class="field">
          <label for="cep_de">CEP De</label>
          <InputText id="cep_de" v-model.number="localFormData.cep_de" required placeholder="CEP Inicial" />
        </div>
  
        <div class="field">
          <label for="cep_ate">CEP Até</label>
          <InputText id="cep_ate" v-model.number="localFormData.cep_ate" required placeholder="CEP Final" />
        </div>
      </div>
  
      <div class="dialog-footer">
        <Button label="Salvar" icon="pi pi-check" type="submit" class="p-button-success" />
        <Button label="Cancelar" icon="pi pi-times" class="p-button-secondary" @click="cancel" />
      </div>
    </form>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits, reactive, watch } from 'vue';
  import InputText from 'primevue/inputtext';
  import Dropdown from 'primevue/dropdown';
  import Button from 'primevue/button';
  
  // Props
  const props = defineProps({
    formData: {
      type: Object,
      required: true,
    },
    isEditing: {
      type: Boolean,
      required: true,
    },
  });
  
  // Emits
  const emit = defineEmits(['save', 'cancel']);

  // Emit the save event when the form is submitted
  const handleSubmit = () => {
    emit('save', localFormData);
  };

  // Emit the cancel event when the cancel button is clicked
  const cancel = () => {
    emit('cancel');
  };
  
  // Local reactive copy of formData
  const localFormData = reactive({ ...props.formData });
  
  // Watch for changes in the parent-provided formData and update localFormData
  watch(
    () => props.formData,
    (newFormData) => {
      Object.assign(localFormData, newFormData);
    },
    { deep: true, immediate: true }
  );
  
  // List of Brazilian UFs (states)
  const ufs = [
    { label: 'Acre (AC)', value: 'AC' },
    { label: 'Alagoas (AL)', value: 'AL' },
    { label: 'Amapá (AP)', value: 'AP' },
    { label: 'Amazonas (AM)', value: 'AM' },
    { label: 'Bahia (BA)', value: 'BA' },
    { label: 'Ceará (CE)', value: 'CE' },
    { label: 'Distrito Federal (DF)', value: 'DF' },
    { label: 'Espírito Santo (ES)', value: 'ES' },
    { label: 'Goiás (GO)', value: 'GO' },
    { label: 'Maranhão (MA)', value: 'MA' },
    { label: 'Mato Grosso (MT)', value: 'MT' },
    { label: 'Mato Grosso do Sul (MS)', value: 'MS' },
    { label: 'Minas Gerais (MG)', value: 'MG' },
    { label: 'Pará (PA)', value: 'PA' },
    { label: 'Paraíba (PB)', value: 'PB' },
    { label: 'Paraná (PR)', value: 'PR' },
    { label: 'Pernambuco (PE)', value: 'PE' },
    { label: 'Piauí (PI)', value: 'PI' },
    { label: 'Rio de Janeiro (RJ)', value: 'RJ' },
    { label: 'Rio Grande do Norte (RN)', value: 'RN' },
    { label: 'Rio Grande do Sul (RS)', value: 'RS' },
    { label: 'Rondônia (RO)', value: 'RO' },
    { label: 'Roraima (RR)', value: 'RR' },
    { label: 'Santa Catarina (SC)', value: 'SC' },
    { label: 'São Paulo (SP)', value: 'SP' },
    { label: 'Sergipe (SE)', value: 'SE' },
    { label: 'Tocantins (TO)', value: 'TO' },
  ];
  </script>
  
  <style scoped>
  .form-container {
    display: grid;
    grid-template-columns: 1fr; /* Single column for stacked fields */
    gap: 1rem; /* Space between fields */
    width: 100%; /* Occupy full width of the dialog */
    max-width: 600px; /* Optional: Limit the maximum width */
    margin: 0 auto; /* Center the form horizontally */
  }
  
  .field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem; /* Space between label and input */
  }
  
  .field-row {
    display: grid;
    grid-template-columns: 1fr 1fr; /* Two columns for CEP fields */
    gap: 1rem; /* Space between the two fields */
  }
  
  .field label {
    font-weight: bold;
  }
  
  .dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
  </style>