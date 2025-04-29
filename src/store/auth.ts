import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    user: JSON.parse(localStorage.getItem('user') || '{}'),
  }),
  actions: {
    login(data: { token: string; user: any }) {
      this.token = data.token;
      this.user = data.user;
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    },
    logout() {
      this.token = '';
      this.user = {};
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    isSuperUser: (state) => state.user.is_superuser,
    hasPermission: (state) => (permission: string) => {
      if (state.user.is_superuser) {
        return true;
      }
      return state.user.perms?.includes(permission);
    },
  },
});
