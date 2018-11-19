import Vue from 'vue'
import App from './App.vue'
// import Gtbutton from './../packages/index'

import GeeUI from './../packages/index'
Vue.use(GeeUI)
// 也可单独引用 
// Vue.use(Gtbutton)


Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
