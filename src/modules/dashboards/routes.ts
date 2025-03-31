
import AllDashboards from './views/AllDashboards.vue';
import AutomacaoView from './views/AutomacaoView.vue';
import MyDashboards from './views/MyDashboards.vue';

export default [
  {
    path: 'dashboards',
    name: 'Dashboards',
    component: AllDashboards, // Rota padrão para a listagem
  },
  
  {
    path: 'mydashboards',
    name: 'My Dashboards',
    component: MyDashboards, // Rota padrão para a listagem
  },
  {
    path: 'automacoes',
    name: 'Automações',
    component: AutomacaoView, // Rota padrão para a listagem
  },
];