import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入新建的Login.vue组件
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'
Vue.use(VueRouter)

const routes = [
  // 首次访问重定向到/login
  {
    path: '/',
    redirect: '/login'
  },
  // 添加登录组件路由
  {
    path: '/login',
    component: Login
  },
  // 主页组件路由
  {
    path: '/Home',
    component: Home,
    redirect: '/welcome',
    children: [{
      // 首页欢迎组件
      path: '/welcome',
      component: Welcome
    },
    {
      // 用户列表组件
      path: '/users',
      component: Users
    }]
  }
]

const router = new VueRouter({
  routes
})
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from  代表从哪个路径跳转而来
  // next  是一个函数，表示放行
  // if (to.path === '/login') return next()
  // const tokenStr = window.sessionStorage.getItem('token')
  // 判断tokenstr是否等于空，如果等于空就放行到login组件中
  // if (!tokenStr) return next('/login')
  next()
})
export default router
