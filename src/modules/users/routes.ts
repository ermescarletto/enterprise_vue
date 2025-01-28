import LoginUser from "./views/LoginUser.vue";
import RecoveryUser from "./views/RecoveryUser.vue";
import RegisterUser from "./views/RegisterUser.vue";
import UserManagement from "./views/UserManagement.vue";



export default [
  {
    path: 'login',
    name: 'Login',
    component: LoginUser,
    meta: { requiresAuth: false, title: 'MS Enterprise - Login' },
    
  },
  {
    path: 'register',
    name: 'Register',
    component: RegisterUser,
    meta: { requiresAuth: false, title: 'MS Enterprise - Cadastro de Usuário' },
    
  },
  {
    path: 'recovery',
    name: 'Recovery',
    component: RecoveryUser,
    meta: { requiresAuth: false, title: 'MS Enterprise - Recuperar usuário' },
  },
  {
    path: 'users',
    name: 'Usuários',
    component:  UserManagement,
    meta: { requiresAuth: true, title: 'MS Enterprise - Usuários' },
  }
];