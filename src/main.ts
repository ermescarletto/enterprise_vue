import { createApp } from 'vue';
import App from './App.vue';
import ToastService from 'primevue/toastservice'; // Import ToastService
import ConfirmationService from 'primevue/confirmationservice';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import router from './router';
import axios from 'axios';
import { createPinia } from 'pinia';
import 'primeicons/primeicons.css';
import ".//assets/main.css"
import 'primeflex/primeflex.css';
import i18n from './i18n'; // Importação do i18n


const app = createApp(App);

//axios.defaults.baseURL = 'https://api.maissabor.ind.br/';
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true; // Permite cookies e credenciais

app.use(i18n); // Adiciona o i18n ao app
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: false || 'none',
        }
    }
});
app.use(ToastService); 
app.use(ConfirmationService);
app.use(createPinia());



app.use(router);
app.mount('#app');
