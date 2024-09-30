<template>
    <MenuHeader></MenuHeader>

    <div class="card mt-2">
        
        <TreeTable 
        :value="nodes" 
        tableStyle="min-width: 50rem" 
        :filters="filters" 
        :paginator="true" 
        :rows="5" 
        :rowsPerPageOptions="[5, 10, 25]" 
        :filterMode="filterMode.value"
        :loading="loading">
            <template #header>
                <div class="flex justify-content-between flex-wrap">
                    <div class="text-xl font-bold">Documentos</div>

            <IconField>
                <InputIcon class="pi pi-search" />
                <InputText v-model="filters['global']" placeholder="Pesquisa" />
            </IconField>
        </div>

    </template>
            <Column header="Código" field="codigo" expander></Column>
            <Column header="Documento" field="nome"></Column>
            <Column header="Departamento" field="departamento"></Column>


            <Column style="width: 10rem" header="Anexos">
        <template #body>
            <div class="flex flex-wrap gap-2">
                <Button type="button" icon="pi pi-file" rounded />
                <Button type="button" icon="pi pi-search" rounded />
            </div>
        </template>
        <template #footer>

        </template>
    </Column>
        </TreeTable>
    </div>
</template>

<script setup lang="ts">
import MenuHeader from '@/components/MenuHeader.vue';
import { ref, onMounted } from 'vue';
import TreeTable from 'primevue/treetable';
import Column from 'primevue/column';
import Button from 'primevue/button'; // Importa o componente Button
import IconField from 'primevue/iconfield';
import InputText from 'primevue/inputtext';
import InputIcon from 'primevue/inputicon';
import { useAuthStore } from '@/stores/auth';
import DocumentosService from '@/services/indexDocumentos';




const loading = ref(true); // Add loading state
const auth = useAuthStore();
const filters = ref({});
const filterMode = ref({ label: 'Lenient', value: 'lenient' });
const nodes = ref();





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
        const documentosData = await DocumentosService.getDocumentos(auth.token);
        nodes.value = documentosData;
    } catch (error) {
        console.error("Failed to load documentos:", error);
    } finally {
        loading.value = false; // Set loading to false after the data is loaded
  }
});




</script>

