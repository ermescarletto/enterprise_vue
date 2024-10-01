<template>
    <Dialog
     :header="props.isEditMode ? 'Edit Política' : 'View Política'" 
     :visible="props.displayDialog" 
     :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
     
     maximizable 
     modal>
     <title>
        {{ props.title }}
     </title>
    <div v-for="object in props.object" :key="object">
        <h1>{{ object }}</h1>
    </div>
    
    </Dialog>

</template>


<script setup lang="ts">
import Dialog from 'primevue/dialog';
import { defineProps } from 'vue';


const props = defineProps<{
  isEditMode?: boolean
  displayDialog?: boolean
  title?: string
  id?: number
  object?: object
}>()


</script>