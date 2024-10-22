
import PessoaFisica from '@/views/cadastros/PessoaFisica.vue';
import CidadesList from '@/views/cadastros/CidadesList.vue';
export default [
  {
    path: 'pessoas',
    name: 'PessoasList',
    component: PessoaFisica, // Rota padrão para a listagem
  },
  {
    path: 'cidades',
    name: 'Cidades',
    component: CidadesList, // Rota padrão para a listagem
  },
  {
    path: 'enderecos',
    name: 'Enderecos',
    component: PessoaFisica, // Rota padrão para a listagem
  },
  {
    path: 'pessoas/:id',
    name: 'PessoasForm',
    component: PessoaFisica, // Formulário quando clicamos em uma pessoa
  },
];