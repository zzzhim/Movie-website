import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/cookie'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login')
    },
    {
      path: '/registered',
      name: 'Registered',
      component: () => import('../views/Registered')
    },
  ]
})

const whiteList = ['/login', '/registered']

// 路由守卫
router.beforeEach((to, from, next) => {
  // 加载条
  NProgress.start()
  if (getToken()) {
    // 如果有token值了
    if (to.path === '/login') {
      next({ path: '/' })
      // 进度条结束
      NProgress.done();
    } else {
      next() //正常进行页面跳转
    }
  } else {
    if (whiteList.includes(to.path)) { // 在白名单里面的话 正常往下走
      next()
    } else {
      // 不在白名单里面,也没有token值
      next({ path: '/login' })
      NProgress.done();
    }
  }
})

router.afterEach(() => {
  NProgress.done() //结束进度条
})

export default router