import { ref } from "vue";
import axios from "axios";
import { useAuthStore } from "@/store/auth";

export function useUnidades() {
  const auth = useAuthStore();
  const unidades = ref([]);
  const loadingUnidades = ref(false);

  const loadUnidades = async () => {
    loadingUnidades.value = true;
    const response = await axios.get("cadastros/api/unidade/", { headers: { Authorization: `TOKEN ${auth.token}` } });
    unidades.value = response.data;
    loadingUnidades.value = false;
  };

  return { unidades, loadingUnidades, loadUnidades };
}
