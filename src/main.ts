import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.less'

import store from './store'
import router from './router'

const app = createApp(App).use(router).use(store)
// const app = createApp(App).use(store).use(router).mount("#app");
app.use(Antd)

app.mount('#app')
