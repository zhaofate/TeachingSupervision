import { defineStore } from 'pinia';

export const useTokenStore = defineStore('token', {
  state: () => ({
    token: localStorage.getItem('token')
  }),
  actions: {
    setToken(newData) {
      this.token = newData;
      localStorage.setItem('token', this.token);
    },
    getToken() {
      return localStorage.getItem('token');
    }
  },
});
