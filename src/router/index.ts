import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/LoginUser.vue';
import Dashboard from '@/views/DashboardFront.vue';
import GuiaInicial from '@/views/GuiaInicial.vue';
import PageNotFound from '@/views/PageNotFound.vue';
import PessoaFisica from '@/views/PessoaFisica.vue';
import IndexAtendimento from '@/views/atendimento/IndexAtendimento.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { title: 'MS Enterprise - Login'}
    
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true, title: 'MS Enterprise - Dashboard' },
    
  },
  {
    path: '/atendimento',
    name: 'Atendimento',
    component: IndexAtendimento,
    meta: { requiresAuth: true, title: 'MS Enterprise - Atendimento' },
    
  },

  {
    path: '/guia',
    name: 'Guia Inicial',
    component: GuiaInicial,
    meta: { requiresAuth: true, title: 'MS Enterprise - Guia' },
  },
  {
    path: '/pessoafisica',
    name: 'Pessoa Física',
    component: PessoaFisica,
    meta: { requiresAuth: true, title: 'MS Enterprise - Pessoa Física' },
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
