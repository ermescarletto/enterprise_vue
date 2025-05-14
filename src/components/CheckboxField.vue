
<template>
    <div class="p-field-checkbox">
      <label :for="label">{{ label }}</label>
      <Checkbox 
      :inputId="label" 
      :binary="true" 
      :v-model="modelValue"        
      @update:modelValue="onUpdate"
      />
    </div>
  </template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
defineProps<{ label: string; modelValue: boolean }>();
const emit = defineEmits(['update:modelValue']);
    function onUpdate(value: string | any) {
    emit('update:modelValue', value);
  }
</script>