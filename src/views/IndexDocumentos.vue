<template>
    <MenuHeader></MenuHeader>
    <div class="card mt-2">
        <TreeTable :value="nodes" tableStyle="min-width: 50rem" :filters="filters" :paginator="true" :rows="5" :rowsPerPageOptions="[5, 10, 25]" :filterMode="filterMode.value">
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

const filters = ref({});
const filterMode = ref({ label: 'Lenient', value: 'lenient' });



const NodeService = {
    getTreeNodesData() {
        return [
            {
                key: '0',
                label: 'Documents',
                data: 'Documents Folder',
                icon: 'pi pi-fw pi-inbox',
                children: [
                    {
                        key: '0-0',
                        label: 'Work',
                        data: 'Work Folder',
                        icon: 'pi pi-fw pi-cog',
                        children: [
                            { key: '0-0-0', label: 'Expenses.doc', icon: 'pi pi-fw pi-file', data: 'Expenses Document' },
                            { key: '0-0-1', label: 'Resume.doc', icon: 'pi pi-fw pi-file', data: 'Resume Document' }
                        ]
                    },
                    {
                        key: '0-1',
                        label: 'Home',
                        data: 'Home Folder',
                        icon: 'pi pi-fw pi-home',
                        children: [{ key: '0-1-0', label: 'Invoices.txt', icon: 'pi pi-fw pi-file', data: 'Invoices for this month' }]
                    }
                ]
            },
            {
                key: '1',
                label: 'Events',
                data: 'Events Folder',
                icon: 'pi pi-fw pi-calendar',
                children: [
                    { key: '1-0', label: 'Meeting', icon: 'pi pi-fw pi-calendar-plus', data: 'Meeting' },
                    { key: '1-1', label: 'Product Launch', icon: 'pi pi-fw pi-calendar-plus', data: 'Product Launch' },
                    { key: '1-2', label: 'Report Review', icon: 'pi pi-fw pi-calendar-plus', data: 'Report Review' }
                ]
            },
            {
                key: '2',
                label: 'Movies',
                data: 'Movies Folder',
                icon: 'pi pi-fw pi-star-fill',
                children: [
                    {
                        key: '2-0',
                        icon: 'pi pi-fw pi-star-fill',
                        label: 'Al Pacino',
                        data: 'Pacino Movies',
                        children: [
                            { key: '2-0-0', label: 'Scarface', icon: 'pi pi-fw pi-video', data: 'Scarface Movie' },
                            { key: '2-0-1', label: 'Serpico', icon: 'pi pi-fw pi-video', data: 'Serpico Movie' }
                        ]
                    },
                    {
                        key: '2-1',
                        label: 'Robert De Niro',
                        icon: 'pi pi-fw pi-star-fill',
                        data: 'De Niro Movies',
                        children: [
                            { key: '2-1-0', label: 'Goodfellas', icon: 'pi pi-fw pi-video', data: 'Goodfellas Movie' },
                            { key: '2-1-1', label: 'Untouchables', icon: 'pi pi-fw pi-video', data: 'Untouchables Movie' }
                        ]
                    }
                ]
            }
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
                            nome: 'Procedimento Operacional Padrao',
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
};

onMounted(() => {
    NodeService.getTreeTableNodes().then((data) => (nodes.value = data));
});

const nodes = ref();


</script>

