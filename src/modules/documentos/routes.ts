
import IndexDocumentos from './views/IndexDocumentos.vue';
import CadastroPoliticas from './views/CadastroPoliticas.vue';
import CadastroProcedimentoPadrao from './views/CadastroProcedimentoPadrao.vue';
export default [
  {
    path: 'docs',
    name: 'Documentos',
    component: IndexDocumentos,
    meta: { requiresAuth: true, title: 'MS Enterprise - Documentos' },
    
  },
  {
    path: 'politicas',
    name: 'Politicas',
    component: CadastroPoliticas,
    meta: { requiresAuth: true, title: 'MS Enterprise - Políticas' },
    
  },

  {
    path: 'pops',
    name: 'ProcedimentoPadrao',
    component: CadastroProcedimentoPadrao,
    meta: { requiresAuth: true, title: 'MS Enterprise - POP' },
    
  },
];