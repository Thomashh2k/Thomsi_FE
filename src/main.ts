import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { useUserInfoStore } from './store'
import piniaPluginPersistedstate, {createPersistedState} from 'pinia-plugin-persistedstate'
import { ApiManagerPlugin } from './ApiManagers'
import { apiManagerOptions } from './ApiManagers/types/apiOptions'
import { BootstrapVue3 } from 'bootstrap-vue-3'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'

const apiOptions: apiManagerOptions = {
  hostname: 'https://localhost',
  port: '7063'
}

const app = createApp(App)
const pinia = createPinia()
pinia.use(createPersistedState({
  storage: sessionStorage,
}))
app.use(Quasar, quasarUserOptions)
app.use(pinia)
app.use(ApiManagerPlugin, apiOptions)
app.use(router)
app.use(BootstrapVue3)
router.isReady().then(() => {
  app.mount('#app')
})
