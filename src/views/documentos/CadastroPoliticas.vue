<template>
    <MenuHeader></MenuHeader>
    <div class="card mt-2">


        <DataTable v-model:filters="filters" :value="politicas" paginator :rows="10" dataKey="id" filterDisplay="row"
      :loading="loading" :globalFilterFields="['id', 'codigo_politica', 'titulo_politica', 'texto_politica']" class="mt-2" showGridlines stripedRows
      removableSort>

            <template #header>
                <div class="flex justify-content-between flex-wrap">
                    <div class="text-xl font-bold">Cadastro de Políticas</div>

            <IconField>
                <InputIcon class="pi pi-search" />
                <InputText :v-model="filters" placeholder="Pesquisa" />
            </IconField>
        </div>

    </template>
            <Column header="Código" field="codigo_politica"></Column>
            <Column header="Documento" field="titulo_politica"></Column>
            <Column header="Departamento" field="departamento.nome"></Column>


            <Column style="width: 10rem" header="Anexos">
        <template  #body="{ data }">
                 <div class="flex flex-wrap gap-2">            
                        <Button icon="pi pi-search" class="p-button-text p-button-info" @click="viewPolitica(data)" />
                        <Button icon="pi pi-pencil" class="p-button-text" @click="editPolitica(data)" />
                        <Button icon="pi pi-trash" class="p-button-danger p-button-text" />
                    </div>
        </template>
        <template #footer>

        </template>
    </Column>
        </DataTable>
    </div>

    <Dialog 
     
    :header="isEditMode ? 'Edit Política' : 'View Política'" 
    :visible="displayDialog" 
    :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    @hide="displayDialog = false"
    maximizable 
    modal>
        <div v-if="isEditMode">
            <label for="codigo_politica">Código:</label>
            <InputText id="codigo_politica" :v-model="selectedPolitica?.codigo_politica" :value="selectedPolitica?.codigo_politica" />            <p><strong>Código:</strong> {{ selectedPolitica?.id }} </p>
            <label for="titulo_politica">Título:</label>
            <InputText id="codigo_politica" :v-model="selectedPolitica?.titulo_politica" :value="selectedPolitica?.titulo_politica" />            <p><strong>Código:</strong> {{ selectedPolitica?.id }} </p>
            <label for="codigo_politica">Código:</label>
            <InputText id="codigo_politica"  />
            <label for="titulo_politica">Documento:</label>
            <InputText id="titulo_politica"  />
            <label for="departamento">Departamento:</label>
            <InputText id="departamento"  />
            <!-- Add other fields as necessary -->
        </div>
        <div v-else>
            <p><strong>Código:</strong> {{ selectedPolitica?.id }} </p>
            <p><strong>Código:</strong> {{ selectedPolitica?.id }} </p>
            
            <!-- Display other fields as necessary -->
        </div>
        <div class="flex justify-content-end">
            <Button label="Cancel" icon="pi pi-times" @click="displayDialog = false" class="p-button-text" />
            <Button label="Save" icon="pi pi-check" @click="savePolitica" v-if="isEditMode" />
        </div>
    </Dialog>
</template>

<script setup lang="ts">
import { Politica } from '@/models/Politica'; // Adjust the path as necessary

import MenuHeader from '@/components/MenuHeader.vue';
import { ref, onMounted } from 'vue';
import Column from 'primevue/column';
import Button from 'primevue/button'; // Importa o componente Button
import IconField from 'primevue/iconfield';
import InputText from 'primevue/inputtext';
import InputIcon from 'primevue/inputicon';
import { useAuthStore } from '@/store/auth';
import  DocumentosServices  from '@/api/services/indexDocumentos';
import DataTable from 'primevue/datatable';
import Dialog from 'primevue/dialog';

import { FilterMatchMode } from '@primevue/core/api';

const loading = ref(true); // Add loading state
const auth = useAuthStore();

const filters = ref({
  'codigo_politica': { value: null, matchMode: FilterMatchMode.CONTAINS },
  'titulo_politica' : { value: null, matchMode: FilterMatchMode.CONTAINS},
  'departamento': { value: null, matchMode: FilterMatchMode.CONTAINS }, 
  'texto_politica': { value: null, matchMode: FilterMatchMode.CONTAINS} // Add this for email filtering

});//const filterMode = ref({ label: 'Lenient', value: 'lenient' });
const politicas = ref<Politica[]>([]);

const displayDialog = ref(false); // For dialog visibility
const isEditMode = ref(false); // To track if in edit mode
const selectedPolitica = ref<Politica | null>(null);


const viewPolitica = (politica: Politica) => {
    selectedPolitica.value = politica;
    isEditMode.value = false;
    displayDialog.value = true; // Show the dialog
};

// Method to edit the selected política
const editPolitica = (politica: Politica) => {
    selectedPolitica.value = { ...politica }; // Copy the data to allow editing
    isEditMode.value = true;
    displayDialog.value = true; // Show the dialog
};

// Method to save the edited política
const savePolitica = async () => {
    if (isEditMode.value) {
        // Call your update API method here, e.g., DocumentosServices.updatePolitica(auth.token, selectedPolitica.value);
        console.log('Saving edited Politica:', selectedPolitica.value);
    } else {
        // Just for viewing, you might want to handle this differently
        console.log('Viewing Politica:', selectedPolitica.value);
    }
    displayDialog.value = false; // Close the dialog
};
/*

const NodeService = {
    getTreeNodesData() {
        return [
        ];
    },

    getTreeTableNodesData() {
        return [
            {
                key: '0',
                data: {
                    codigo: 'MS-PB-001',
                    nome: 'Política de Benefícios',
                    departamento: 'Recursos Humanos',
                    anexo: '/arquivo.pdf',
                },
                children: [
                    {
                        key: '0-0',
                        data: {
                            codigo: 'MS-PB-001',
                            nome: 'Solicitação de Benefício',
                            departamento: 'Recursos Humanos',
                            anexo: '/arquivo.pdf',
                        },
                        children: [
                            {
                                key: '0-0-0',
                                data: {
                                    codigo: 'MS-PB-001',
                                    nome: 'Fluxograma de Processo',
                                    departamento: 'Recursos Humanos',
                                    anexo: '/arquivo.pdf',
                                },
                            },
                        ],
                    },
                ],
            },{
                key: '1',
                data: {
                    codigo: 'MS-PR-001',
                    nome: 'Política de Reembolso',
                    departamento: 'Financeiro',
                    anexo: '/arquivo.pdf',
                },
                children: [
                    {
                        key: '1-0',
                        data: {
                            codigo: 'MS-PR-POP-001',
                            nome: 'POP - Solicitar Reembolso',
                            departamento: 'Financeiro',
                            anexo: '/arquivo.pdf',
                        },
                        children: [
                            {
                                key: '1-0-0',
                                data: {
                                    codigo: 'MS-PR-FLX-001',
                                    nome: 'Fluxograma do Processo de Reembolso',
                                    departamento: 'Financeiro',
                                    anexo: '/arquivo.pdf',
                                },
                            },
                        ],
                    },
                    {
                        key: '1-1',
                        data: {
                            codigo: 'MS-PR-POP-002',
                            nome: 'POP - Solicitar Adiantamento',
                            departamento: 'Financeiro',
                            anexo: '/arquivo.pdf',
                        },
                        children: [
                            {
                                key: '1-0-0',
                                data: {
                                    codigo: 'MS-PR-FLX-002',
                                    nome: 'Fluxograma do Processo de Adiantamento',
                                    departamento: 'Financeiro',
                                    anexo: '/arquivo.pdf',
                                },
                            },
                        ],
                    },
                ],
            },
        ];
    },

    getTreeTableNodes() {
        return Promise.resolve(this.getTreeTableNodesData());
    },

    getTreeNodes() {
        return Promise.resolve(this.getTreeNodesData());
    }
};*/
onMounted(async () => {
    try {
        const documentosData = await DocumentosServices.getPoliticas(auth.token);
        politicas.value = documentosData.map((item: any) => new Politica(item)); // Create instances of Politica
        console.log(documentosData)
        console.log(politicas)

    } catch (error) {
        console.error("Failed to load documentos:", error);
    } finally {
        loading.value = false; // Set loading to false after the data is loaded
  }
});




</script>

