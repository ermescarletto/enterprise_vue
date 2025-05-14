<template>
  <form @submit.prevent="handleSubmit" class="form-container">
    <div v-for="(field, key) in fields" :key="key" class="field">
      <label :for="key">{{ field.label }}</label>
      <component
        v-if="!field.isMultiSelect"
        :is="getWidget(field.type, field.key)"
        :id="field.key"
        v-model="localFormData[field.key]"
        v-bind="field.props"
        :mask="field.mask"
        :placeholder="field.placeholder"
      />
      <MultiSelect
        v-else-if="field.isMultiSelect"
        :key="field.key"
        :id="field.key"
        :label="field.label"
        v-model="localFormData[field.key]"
        :options="field.availableItems"
        :placeholder="field.placeholder"
        :showClear="true"
        :filter="true"
        :optionValue="'id'"
        :optionLabel="'name'" 
        />
      
    </div>

    <div class="dialog-footer">
      <Button label="Salvar" icon="pi pi-check" type="submit" class="p-button-success" />
      <Button label="Cancelar" icon="pi pi-times" class="p-button-secondary" @click="cancel" />
    </div>
  </form>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, reactive, watch, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import InputMask from 'primevue/inputmask';
import { DatePicker, Select, ToggleSwitch, MultiSelect } from 'primevue';
import api from '@/api/services/apiAxios';
// Props
const props = defineProps({
  formData: {
    type: Object,
    required: true,
  },
  model: {
    type: Object,
    required: true,
  },
  isEditing: {
    type: Boolean,
    required: true,
  },
  excludeFields: {
    type: Array as () => string[], // Lista de campos a serem excluídos
    default: () => [],
  },
});


// Reactive variables for permissions and groups
const availablePermissions = reactive([]);
const availableGroups = reactive([]);

// Emits
const emit = defineEmits(['save', 'cancel']);

// Emit the save event when the form is submitted
const handleSubmit = () => {
  const payload = {
    ...localFormData,

  };
  emit('save', payload);
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

// Use vue-i18n for translations
const { t } = useI18n();

// Fetch permissions and groups from APIs
onMounted(async () => {
  try {
    // Fetch all permissions and groups
    const allData = await api.get('auth/api/permissions-groups/');
    availablePermissions.push(...allData.data.permissions);
    availableGroups.push(...allData.data.groups);

    // Fetch user-specific permissions and groups
   
  } catch (error) {
    console.error('Erro ao carregar permissões e grupos:', error);
  }
});

// Define fields dynamically based on the model
const fields = computed(() => {
  const modelFields = Object.keys(props.model);
  return modelFields
    .filter((key) => !props.excludeFields.includes(key)) // Exclui os campos especificados
    .map((key) => {
      const value = props.model[key];

      // Determine the type of the field
      let type = 'string'; // Default type
      if (Array.isArray(value)) {
        type = 'array';
      } else if (value instanceof Date || key === 'data_nascimento') {
        type = 'date';
      } else if (typeof value === 'boolean' || key === 'is_admin' || key === 'is_staff') {
        type = 'boolean';
      } else if (typeof value === 'number') {
        type = 'number';
      }

      // Define masks for specific fields
      let mask = null;
      if (key === 'cpf') {
        mask = '999.999.999-99'; // CPF mask
      } else if (key === 'telefone') {
        mask = '(99) 99999-9999'; // Phone mask
      }

      // Handle permissions and groups with DualList
      if (key === 'user_permissions') {
        return {
          key,
          type,
          isMultiSelect: true,
          label:t('user.user_permissions'),
          placeholder: t('user.user_permissions_placeholder'),
          optionValue: 'id',
          optionLabel: 'name',
          availableItems: availablePermissions
        };
      } else if (key === 'groups') {
        return {
          key,
          type,
          isMultiSelect: true,
          label:t('user.groups'),
          placeholder: t('user.groups_placeholder'),
          optionValue: 'id',
          optionLabel: 'name',
          availableItems: availableGroups
        };
      }

      return {
        key,
        type,
        label: t(`user.${key}`) || key, // Busca o label traduzido ou usa a chave como fallback
        placeholder: t(`user.${key}_placeholder`) || `Digite ${t(`user.${key}`) || key}`, // Busca o placeholder traduzido
        mask, // Adiciona a máscara ao campo
        props: key === 'email'
          ? { type: 'email', inputmode: 'email', showIcon: true }
          : type === 'date'
          ? { showIcon: true }
          : type === 'array'
          ? { multiple: true }
          : {},
      };
    });
});

// Get the appropriate widget for each field type
const getWidget = (type: string, key: string) => {
  if (key === 'cpf' || key === 'telefone') {
    return InputMask; // Use InputMask para campos com máscara
  }
  switch (type) {
    case 'string':
      return InputText;
    case 'boolean':
      return ToggleSwitch;
    case 'date':
      return DatePicker;
    case 'array' :
      return Select;
    case 'number':
      return InputText; // Pode ser substituído por um componente específico para números
    default:
      return InputText;
  }
};
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

.field label {
  font-weight: bold;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>