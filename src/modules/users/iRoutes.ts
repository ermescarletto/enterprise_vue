
import UserManagement from "./views/UserManagement.vue";



export default [
  {
    path: '',
    name: 'Usuários',
    component:  UserManagement,
    meta: { requiresAuth: true, title: 'MS Enterprise - Usuários' },
  }
];