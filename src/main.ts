import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

import router from './router';
import { createPinia } from 'pinia';
import 'primeicons/primeicons.css';
import ".//assets/main.css"
import 'primeflex/primeflex.css';

const app = createApp(App);

app.use(PrimeVue, {
    theme: {
        preset: Aura,
    }
});
app.use(createPinia());
app.use(router);
app.mount('#app');
