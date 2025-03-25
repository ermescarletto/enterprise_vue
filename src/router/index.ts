import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/store/auth'; // Store para controle de autenticação

import Dashboard from '@/views/DashboardFront.vue';
import GuiaInicial from '@/views/GuiaInicial.vue';
import PageNotFound from '@/views/PageNotFound.vue';
import IndexAtendimento from '@/views/atendimento/IndexAtendimento.vue';
import OrganogramaEmpresarial from '@/views/empresa/OrganogramaEmpresarial.vue';
import EquipesAtendimento from '@/views/atendimento/EquipesAtendimento.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import PrivateLayout from '@/layouts/PrivateLayout.vue'
import rotasCadastros from '@/modules/cadastros/routes';
import rotasDocumentos from '@/modules/documentos/routes';
import rotasAutenticacao from '@/modules/users/routes';
import rotasDashboards from '@/modules/dashboards/routes';
import HomeFront from '@/modules/cms/views/HomeFront.vue';

const routes = [
  {
    path: '/',
    redirect: () => {
      const authStore = useAuthStore();
      return authStore.isAuthenticated ? '/' : '/auth/login';
    },
    children: [
      {
        path: 'auth',
        component: AuthLayout,
        beforeEnter: (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
          const authStore = useAuthStore();
          if (authStore.isAuthenticated) {
            next('/'); // Redirect to home if authenticated
          } else {
            next(); // Allow access to /auth if not authenticated
          }
        },
        children: [
        ...rotasAutenticacao,
        ]
    
      },
      {
        path: 'home',
        name: 'Home',
        meta: { requiresAuth: true, title: 'MS Enterprise - Início' },
        component: PrivateLayout,
        children: [
          {
            path: '/',
            component: HomeFront
          },
          {
            path: '/cadastros',
            name: 'Cadastros',
            children: [
              ...rotasCadastros, // Rotas dinâmicas do módulo de Pessoas
            ],
    
          },
    
        ]
        
      },
            
      {
        path: 'documentos',
        name: 'Documentos',
        beforeEnter: (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
          const authStore = useAuthStore();
          if (authStore.isAuthenticated) {
            next(); // Redirect to dashboard if authenticated
          } else {
            next('/auth/login'); // Allow access to /auth if not authenticated
          }
        },
        component: PrivateLayout,
        meta: { requiresAuth: true, title: 'MS Enterprise - Documentos' },
        children: [
          ...rotasDocumentos, // Rotas dinâmicas do módulo de Pessoas
        ],

      },
      {
        path: 'bi',
        name: 'BI',
        beforeEnter: (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
          const authStore = useAuthStore();
          if (authStore.isAuthenticated) {
            next(); // Redirect to dashboard if authenticated
          } else {
            next('/auth/login'); // Allow access to /auth if not authenticated
          }
        },
        meta: { requiresAuth: true, title: 'MS Enterprise - BI' },
        children: [
          ...rotasDashboards, // Rotas dinâmicas do módulo de Pessoas
        ],

      },
      {
        path: 'atendimento',
        name: 'Atendimento',
        meta: { requiresAuth: true, title: 'MS Enterprise - Atendimento' },
        component: IndexAtendimento,
        children: [

        ]
      },
    ]
  },
  
  

  {
    path: '/departamentos',
    name: 'Departamentos',
    component: OrganogramaEmpresarial,
    meta: { requiresAuth: true, title: 'MS Enterprise - Organograma' },
    
  },

  {
    path: '/equipes',
    name: 'Equipes',
    component: EquipesAtendimento,
    meta: { requiresAuth: true, title: 'MS Enterprise - Organograma' },
    
  },
  {
    path: '/guia',
    name: 'Guia Inicial',
    component: GuiaInicial,
    meta: { requiresAuth: true, title: 'MS Enterprise - Guia' },
  },

  
  { path: '/:pathMatch(.*)*', 
    name: 'NotFound', 
    component: PageNotFound },


];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Middleware de autenticação
router.beforeEach((to, from, next) => {
  document.title = 'MS Enterprise';
  const isAuthenticated = !!localStorage.getItem('token');
  const title = to.meta.title as string;
  if (title) {
    document.title = title;
  }
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'Login' });
  } else {
    next();
  }
});


export default router;
