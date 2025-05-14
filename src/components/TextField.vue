<!-- TextField.vue -->
<template>
    <div class="p-field">
      <label :for="label">{{ label }}</label>
      <InputText
        :id="label"
        :modelValue="modelValue"
        @update:modelValue="onUpdate"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  
  defineProps<{
    label: string;
    modelValue: string;
  }>();
  
  const emit = defineEmits(['update:modelValue']);
    function onUpdate(value: string | any) {
    emit('update:modelValue', value);
  }
  </script>
  