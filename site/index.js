import { createApp } from 'vue';
import App from "./app.vue";
import router from './router/index.js';
import icon from './icon.json'
import './rem.js'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import store from './store/index'

import './style/index.scss'
import 'highlight.js/styles/color-brewer.css'
import { parseTime } from "./utils/ruoyi";


import getData from './api/getData';

import demoBlock from './components/demo-block/index.vue'
var app = createApp(App);

app.component('DemoBlock', demoBlock)
app.config.globalProperties.$icon = icon
app.config.globalProperties.getData = getData
app.config.globalProperties.parseTime = parseTime
app.use(store).use(router).use(ElementPlus)

app.mount('#app');
