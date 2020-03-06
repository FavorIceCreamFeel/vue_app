import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
// 导入全局样式表
import './assets/css/global.css'
// 导入axios
import axios from 'axios'
// 配置请求根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/'
// 通过axios拦截器添加 token 验证
axios.interceptors.request.use(config => {
  // 这样请求头中就会添加属性  Authorization(key) 值为 token(value) = window.sessionStorage.getItem('token')
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
// 挂载axios及可以使用个this调用
Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
