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


const app = createApp(App);

axios.defaults.baseURL = 'https://api.maissabor.ind.br/';
axios.defaults.withCredentials = true; // Permite cookies e credenciais

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
