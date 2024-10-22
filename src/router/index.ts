import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/store/auth'; // Store para controle de autenticação

import Dashboard from '@/views/DashboardFront.vue';
import GuiaInicial from '@/views/GuiaInicial.vue';
import PageNotFound from '@/views/PageNotFound.vue';
import IndexAtendimento from '@/views/atendimento/IndexAtendimento.vue';
import IndexDocumentos from '@/views/documentos/IndexDocumentos.vue';
import OrganogramaEmpresarial from '@/views/empresa/OrganogramaEmpresarial.vue';
import CadastroPoliticas from '@/views/documentos/CadastroPoliticas.vue';
import CadastroProcedimentoPadrao from '@/views/documentos/CadastroProcedimentoPadrao.vue';
import EquipesAtendimento from '@/views/atendimento/EquipesAtendimento.vue';
import LoginUser from '@/views/auth/LoginUser.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import PrivateLayout from '@/layouts/PrivateLayout.vue'
import rotasCadastros from '@/modules/cadastros/routes';

const routes = [
  {
    path: '/',
    redirect: () => {
      const authStore = useAuthStore();
      return authStore.isAuthenticated ? '/dashboard' : '/auth/login';
    },
    children: [
      {
        path: 'dashboard',
        nome: 'Dashboard',
        meta: { requiresAuth: true, title: 'MS Enterprise - Dashboard' },
        component: Dashboard
      },
      {
        path: 'cadastros',
        name: 'Cadastros',
        beforeEnter: (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
          const authStore = useAuthStore();
          if (authStore.isAuthenticated) {
            next(); // Redirect to dashboard if authenticated
          } else {
            next('/auth/login'); // Allow access to /auth if not authenticated
          }
        },
        component: PrivateLayout,
        meta: { requiresAuth: true, title: 'MS Enterprise - Pessoa Física' },
        children: [
          ...rotasCadastros, // Rotas dinâmicas do módulo de Pessoas
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
    path: '/auth',
    component: AuthLayout,
    beforeEnter: (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      const authStore = useAuthStore();
      if (authStore.isAuthenticated) {
        next('/dashboard'); // Redirect to dashboard if authenticated
      } else {
        next(); // Allow access to /auth if not authenticated
      }
    },
    children: [
      {
        path: 'login',
        nome: 'Login',
        component: LoginUser
      }
    ]

  },
  
  {
    path: '/documentos',
    name: 'Documentos',
    component: IndexDocumentos,
    meta: { requiresAuth: true, title: 'MS Enterprise - Documentos' },
    
  },
  {
    path: '/politicas',
    name: 'Politicas',
    component: CadastroPoliticas,
    meta: { requiresAuth: true, title: 'MS Enterprise - Políticas' },
    
  },

  {
    path: '/pops',
    name: 'ProcedimentoPadrao',
    component: CadastroProcedimentoPadrao,
    meta: { requiresAuth: true, title: 'MS Enterprise - POP' },
    
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
