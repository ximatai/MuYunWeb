import {createApp} from 'vue'
import App from './App.vue'
import './styles/index.css'
import ElementPlus from 'element-plus'
import './components/styles/element/index.scss'
import GlobPlugin from './plugins'
import MuYunComponents from "./components/index.js";
import router from './router/index.js'
import {createPinia} from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import {registerStore} from "@/store/index.js";
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(GlobPlugin)
app.use(ElementPlus, {size: 'small'})
app.use(MuYunComponents)
app.use(pinia)
app.use(router)
registerStore();
app.mount('#app')

