<template>
<div class="header">
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
</template>
<script setup lang="ts">

import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

import Menubar from 'primevue/menubar';
import Badge from 'primevue/badge';
import Button from 'primevue/button';


const meuschamados = ref(3);
const meusatendimentos = ref(2);
const somaBadgeChamados = meuschamados.value + meusatendimentos.value;
const authStore = useAuthStore();
const router = useRouter();



  const items = ref([
    {
        label: 'Início',
        icon: 'pi pi-home',
        route: 'dashboard'
    },
    {
        label: 'Cadastros',
        icon: 'pi pi-book',
        items: [ {
            
        label: 'Cadastro Único',
            icon: 'pi pi-ticket',
            items: [ 
          {
            label: 'Endereços',
            icon: 'pi pi-map-marker',
            route: 'enderecos'
          },          
          {
            label: 'Pessoa Física',
            icon: 'pi pi-user',
            route: 'pessoafisica'

          },
          
          {
            label: 'Pessoa Jurídica',
            icon: 'pi pi-building'
          },
        
        ]
          },         {
                separator: true
            },
        {
            label: 'Atendimento',
            icon: 'pi pi-ticket',
            route: '/atendimento',
            items: [ 
          {
            label: 'Equipe',
            icon: 'pi pi-users',
            route: '/equipe'
          },          
          {
            label: 'Tipo de Atendimento',
            icon: 'pi pi-tags'
          },
          
        
        ]
          },
          {
                separator: true
            },
          {
            label: 'Empresa',
            icon: 'pi pi-home',
            items: [ {
              label: 'Empresa',
              icon: 'pi pi-home',
            },{
            
              label: 'Departamento',
              icon: 'pi pi-sitemap',
            },
            {
              label: 'Unidade',
              icon: 'pi pi-building',
            },
            
            {
              label: 'Cargos',
              icon: 'pi pi-briefcase',
            },
          ]
            
          },
          {
                separator: true
            },
          {
            label: 'Autenticação',
            icon: 'pi pi-user',
            items: [ {
              label: 'Usuários',
              icon: 'pi pi-users',
            },
            {
              label: 'Permissões',
              icon: 'pi pi-unlock',
            },
          ]
            
          },
        ]
    }, 
    {
        label: 'Documentos',
        icon: 'pi pi-bookmark-fill',
        items: [
            {
                label: 'Políticas',
                icon: 'pi pi-bolt',
            },
            {
                separator: true
            },
            {
                label: 'Procedimento Padrão',
                icon: 'pi pi-server',
            },
            {
                separator: true
            },
            {
                label: 'Fluxogramas',
                icon: 'pi pi-pencil',
            }
        ]
    },

    {
        label: 'Atendimento',
        icon: 'pi pi-ticket',
        items: [{
                label: 'Chamados',
                icon: 'pi pi-pencil',

                items: [
                {
                label: 'Novo Chamado',
                icon: 'pi pi-pencil',
              
              },
              {
                separator: true
            },
              {
                  label: 'Atender Chamados',
                  icon: 'pi pi-play',
                badge: meusatendimentos,

                },
                {
                separator: true
            },
              {
                label: 'Meus Chamados',
                icon: 'pi pi-bookmark-fill',
                badge: meuschamados,

              }]
            },
            {
                separator: true
            },
            
            {
                label: 'Relatórios',
                icon: 'pi pi-chart-bar',
            }],
        badge: somaBadgeChamados
    }]);


    const logout = () => {
      authStore.logout();
      router.push({ name: 'Login' });
    };

  
</script>