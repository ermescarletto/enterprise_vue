import { ref } from "vue";
import axios from "axios";
import { useAuthStore } from "@/store/auth";

export function useGerentes() {
  const auth = useAuthStore();
  const gerentes = ref([]);
  const loading = ref(false);

  const loadGerentes = async () => {
    loading.value = true;
    const response = await axios.get("cadastros/api/gerente/", { headers: { Authorization: `TOKEN ${auth.token}` } });
    gerentes.value = response.data;
    loading.value = false;
  };

  const deleteGerente = async (id: number) => {
    await axios.delete(`cadastros/api/gerente/${id}/`, { headers: { Authorization: `TOKEN ${auth.token}` } });
  };

  return { gerentes, loading, loadGerentes, deleteGerente };
}