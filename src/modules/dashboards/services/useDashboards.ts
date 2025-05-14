import { ref } from "vue";
import axios from "axios";
import { useAuthStore } from "@/store/auth";

export function useDashboards() {
  const auth = useAuthStore();
  const gerentes = ref([]);
  const loading = ref(false);

  const loadDashboards = async () => {
    loading.value = true;
    const response = await axios.get("cadastros/api/gerente/", { headers: { Authorization: `TOKEN ${auth.token}` } });
    gerentes.value = response.data;
    loading.value = false;
  };

  const deleteDashboard = async (id: number) => {
    await axios.delete(`cadastros/api/gerente/${id}/`, { headers: { Authorization: `TOKEN ${auth.token}` } });
  };
  return { gerentes, loading, loadDashboards, deleteDashboard };
}