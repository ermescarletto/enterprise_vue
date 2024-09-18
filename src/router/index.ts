import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/LoginUser.vue';
import Dashboard from '@/components/DashboardFront.vue';

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Middleware de autenticação
router.beforeEach((to, from, next) => {
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
