import './assets/main.css'
import '@/assets/table.css';
import '@/assets/styles.css';
import '@/assets/association.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


const app = createApp(App)

app.use(router)

app.mount('#app')