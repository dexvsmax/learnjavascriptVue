import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router/index.js'
import 'bootstrap/dist/css/bootstrap.css'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { required, email } from 'vee-validate/dist/rules'

extend('required', required)
extend('email', email)

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
