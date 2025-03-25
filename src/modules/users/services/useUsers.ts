import { ref } from "vue";
import axios from "axios";
import { useAuthStore } from "@/store/auth";

export function useUsuarios() {
  const auth = useAuthStore();
  const usuarios = ref([]);
  const loadingUsuarios = ref(false);

  const loadUsuarios = async () => {
    loadingUsuarios.value = true;
    const response = await axios.get("auth/api/users/", { headers: { Authorization: `TOKEN ${auth.token}` } });
    usuarios.value = response.data;
    loadingUsuarios.value = false;
  };

  return { usuarios, loadingUsuarios, loadUsuarios };
}
