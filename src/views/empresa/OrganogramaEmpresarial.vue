<template>

    <MenuHeader></MenuHeader>

    <div class="card overflow-x-auto">
        <OrganizationChart :value="data" collapsible>
            <template #person="slotProps">
                <div class="text-xs"> {{ slotProps }}</div>
            </template>
            <template #default="slotProps">
                <span>{{ slotProps }}</span>
            </template>
        </OrganizationChart>
    </div>
</template>

<script setup lang="ts">
import MenuHeader from '@/components/MenuHeader.vue';
import { ref } from 'vue';


const data = ref({
  key: '0',
  type: 'person',
  styleClass: '!bg-indigo-100 text-white rounded-xl',
  data: {
    image: 'https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png',
    name: 'Amy Elsner',
    title: 'CEO',
  },
  children: [
    {
      key: '0_0',
      type: 'person',
      styleClass: '!bg-purple-100 text-white rounded-xl',
      data: {
        image: 'https://primefaces.org/cdn/primevue/images/avatar/annafali.png',
        name: 'Anna Fali',
        title: 'CMO',
      },
      children: [
        {
          label: 'Sales',
          styleClass: '!bg-purple-100 text-white rounded-xl',
        },
        {
          label: 'Marketing',
          styleClass: '!bg-purple-100 text-white rounded-xl',
        },
      ],
    },
    {
      key: '0_1',
      type: 'person',
      styleClass: '!bg-teal-100 text-white rounded-xl',
      data: {
        image: 'https://primefaces.org/cdn/primevue/images/avatar/stephenshaw.png',
        name: 'Stephen Shaw',
        title: 'CTO',
      },
      children: [
        {
          label: 'Development',
          styleClass: '!bg-teal-100 text-white rounded-xl',
        },
        {
          label: 'UI/UX Design',
          styleClass: '!bg-teal-100 text-white rounded-xl',
        },
      ],
    },
  ],
});
</script>
