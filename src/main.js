import Vue from 'vue'
import App from './App'
import store from './store/index'
import request from './utils/request'
Vue.prototype.$http = request
Vue.config.productionTip = false
App.mpType = 'app'
// 把store挂载到全局
Vue.prototype.$store = store

const app = new Vue(App)
app.$mount()
