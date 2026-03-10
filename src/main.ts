import './assets/main.css'

// framework
import { createApp } from 'vue'
import { createPinia } from 'pinia'

// data
import { seedIfEmpty } from '@/data/seed'

// relative
import App from './App.vue'
import router from './router'

seedIfEmpty()

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
