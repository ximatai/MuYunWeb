import {createApp} from 'vue'
import App from './App.vue'
import './styles/index.css'
import ElementPlus from 'element-plus'
import './components/styles/element/index.scss'
import GlobPlugin from './plugins'
import MuYunComponents from "./components/index.js";

const app = createApp(App)
app.use(GlobPlugin)
app.use(ElementPlus, {size: 'small'})
app.use(MuYunComponents)
app.mount('#app')

