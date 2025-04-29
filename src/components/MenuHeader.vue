<template>
<div class="">
    <Menubar :model="items">
          <template #start>
              <img src="../assets/logo.png" alt="logo" width="30px" @click="router.push('/dashboard')" />
          </template>
          <template #item="{ item, props, hasSubmenu, root }">
              <a v-ripple class="flex items-center" v-bind="props.action" :href="item.route">
                  <span :class="item.icon" />
                  <span class="ml-2">{{ item.label }}</span>
                  <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
                  <i v-if="hasSubmenu" :class="['pi pi-angle-down', { 'pi-angle-down ml-2': root, 'pi-angle-right ml-auto': !root }]"></i>
              </a>
          </template>
          <template #end>
            <div class="flex justify-content-center flex-wrap">
              <div class="flex align-items-center justify-content-center w-4rem h-4rem bg-primary font-bold border-round m-2">
                  
                  <p>{{authStore.user.username}}</p>
                  
                </div>
                <div class="flex align-items-center justify-content-center w-4rem h-4rem bg-primary font-bold border-round m-2">
                  <Button icon="pi pi-sign-out" @click="logout" rounded severity="secondary"/>
                
                </div>

              </div>
          </template>
  </Menubar>
</div>
</template><script setup lang="ts">

import { onMounted, ref } from 'vue';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router';

import Menubar from 'primevue/menubar';
import Badge from 'primevue/badge';
import Button from 'primevue/button';

const authStore = useAuthStore();
const router = useRouter();
const isTrue = ref(false);
const items = ref<any[]>([]);

function buildItems() {
  isTrue.value = authStore.isSuperUser;

  const menu = [
    {
      label: 'Início',
      icon: 'pi pi-home',
      route: '/'
    },
    {
      label: 'Cadastros',
      icon: 'pi pi-book',
      items: isTrue.value
        ? [
            {
              label: 'Cidades',
              icon: 'pi pi-user',
              route: '/cadastros/cidades'
            },
            {
              label: 'Empresas',
              icon: 'pi pi-building',
              route: '/cadastros/empresas'
            },
            {
              label: 'Unidades',
              icon: 'pi pi-home',
              route: '/cadastros/unidades'
            },
            {
              label: 'Gerentes',
              icon: 'pi pi-crown',
              route: '/cadastros/gerentes'
            }
          ]
        : []
    },
    {
      label: 'Dashboards',
      icon: 'pi pi-book',
      items: isTrue.value
      ? [
        {
          label: 'Automações',
          icon: 'pi pi-microchip-ai',
          route: '/bi/automacoes'
        },
        {
          separator: true
        },
        {
          label: 'Minhas Visões',
          icon: 'pi pi-gauge',
          items: isTrue.value
            ? [
                {
                  label: 'Gerencial Realizado',
                  icon: 'pi pi-building-columns',
                  route: '/bi/dashboards'
                },
              ]
            : []
        }
      ] : []
    },
    {
      label: 'Autenticação',
      icon: 'pi pi-user',
      items: isTrue.value
        ? [
            {
              label: 'Usuários',
              icon: 'pi pi-users',
              route: '/users'
            },
          ]
        : []
    }
  ];

  items.value = menu;
}

const logout = () => {
  authStore.logout();
  router.push('/auth/login');
};

onMounted(() => {
  buildItems();
});

</script>