import axios from "axios";
import { useAuthStore } from "@/store/auth";



const api = axios.create({
  baseURL: "https://api.maissabor.ind.br/",
  withCredentials: true, // Permite cookies e credenciais

});

api.interceptors.request.use((config) => {
  const auth = useAuthStore();
  if (auth.token) {
    config.headers.Authorization = `TOKEN ${auth.token}`;
  }
  return config;
});

export default api;