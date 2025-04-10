
import PessoaFisica from '@/views/cadastros/PessoaFisica.vue';
import CidadesList from './views/CidadesList.vue';
import PessoaJuridica from './views/PessoaJuridica.vue';
import UnidadesList from './views/UnidadesList.vue';
import GerentesList from './views/GerentesList.vue';
export default [
  {
    path: 'pessoas',
    name: 'PessoasList',
    component: PessoaFisica, // Rota padrão para a listagem
  },
  {
    path: 'empresas',
    name: 'Empresas',
    component: PessoaJuridica, // Rota padrão para a listagem
  },
  {
    path: 'cidades',
    name: 'Cidades',
    component: CidadesList, // Rota padrão para a listagem
  },
  {
    path: 'unidades',
    name: 'Unidades',
    component: UnidadesList, // Rota padrão para a listagem
  },
  
  {
    path: 'gerentes',
    name: 'Gerentes',
    component: GerentesList, // Rota padrão para a listagem
  },
  {
    path: 'pessoas/:id',
    name: 'PessoasForm',
    component: PessoaFisica, // Formulário quando clicamos em uma pessoa
  },
];