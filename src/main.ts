import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import router from './router';
import { createPinia } from 'pinia';
import ".//assets/main.css"


const app = createApp(App);

app.use(PrimeVue, {
    theme: {
        preset: Aura,
        
    }
});

app.use(router);
app.use(createPinia());
app.mount('#app');
