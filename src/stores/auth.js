import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', () => {
  const login_form = ref({
    email: "",
    password: ""
  });
  const login = (login_form) => {
    const promise = axios.post('/login' , login_form);

    return promise;
  }

  return {
    login,
    login_form,
  };
})
