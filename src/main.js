import { createApp } from 'vue'
import App from './App.vue'

import { createPinia } from 'pinia';
const pinia = createPinia();

import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import l18n from './lang'


let app = createApp(App)
app
.use(ElementPlus)
.use(router)
.use(pinia)
.use(l18n)
.mount('#app')
