<template>
  <Dialog 
    v-model:visible="localVisible" 
    :header="dialogTitle" 
    modal 
    class="min-w-[400px] sm:min-w-[500px] md:min-w-[600px]"
    @update:visible="emits('close')"
  >
    <div class="p-fluid space-y-4">
      <!-- Usuário -->
      <div class="p-field">
        <label for="usuario" class="block font-semibold">Usuário</label>
        <Dropdown
          v-model="localGerente.usuario"
          :options="users"
          optionLabel="email"
          optionValue="id"
          placeholder="Selecione um usuário"
          class="w-full"
          :loading="loadingUser"
        />
      </div>

      <!-- Unidades -->
      <div class="p-field">
        <label for="unidades" class="block font-semibold">Unidades</label>
        <PickList
          v-model="selectedUnidades"
          :source="unidades"
          :target="localGerente.unidades"
          dataKey="id"
          optionLabel="nome"
          listStyle="height: 250px;"
        >
          <template #option="{ item }">
            {{ item.nome }}
          </template>
        </PickList>

      </div>
    </div>
    <template #footer>
      <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="emits('close')" />
      <Button label="Salvar" icon="pi pi-check" class="p-button-success" @click="saveGerente" />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits, computed, onMounted } from "vue";
import Dropdown from "primevue/dropdown";
import PickList from "primevue/picklist";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
//import ProgressSpinner from "primevue/progressspinner";
import { Gerente } from "../models/Gerente";
import { User } from "@/modules/users/models/User";
import { useUnidades } from "../services/useUnidades";
import { useUsers } from "@/modules/users/services/useUsers";

const props = defineProps<{
  visible: boolean;
  gerente: Gerente | null;
}>();

const emits = defineEmits(["save", "close"]);
const selectedUnidades = ref<[]>();

const { unidades, loadUnidades } = useUnidades();
const { users, fetchUsers, loadingUser } = useUsers();

const localGerente = ref<Gerente>({
  usuario: {} as User,
  unidades: [],
  id: 0,
  ativo: false
});

// Criar um estado local para controlar a visibilidade do diálogo
const localVisible = ref(props.visible);
const listUnidades = ref<[]>();
watch(
  () => props.visible,
  (newVisible) => {
    localVisible.value = newVisible;
  }
);
watch(
  () => props.gerente,
  (newGerente) => {
    if (newGerente) {
      localGerente.value = { ...newGerente };
    } else {
      localGerente.value = {
        usuario: {} as User,
        unidades: [],
        id: 0,
        ativo: false
      };
    }
  },
  { immediate: true, deep: true }
);


const saveGerente = () => {
  emits("save", localGerente.value);
};

const dialogTitle = computed(() => (props.gerente?.id ? "Editar Gerente" : "Novo Gerente"));

onMounted(() => {
  fetchUsers();
  loadUnidades().then((data) => (listUnidades.value = [data,[]]));
})
</script>

<style scoped>
.p-field {
  margin-bottom: 1rem;
}
</style>