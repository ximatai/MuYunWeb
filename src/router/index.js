import { createRouter, createWebHistory } from 'vue-router'
import { nextTick } from 'vue'

const base = [
  {
    path: '/',
    //路由重定向 门户页
    redirect: '/portal',
  },
  {
    path: '/portal',
    name: 'portal',
    component: () => import('../views/index.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue'),
  },
  {
    path: '/error',
    name: 'error',
    component: () => import('../views/error.vue'),
  },
]
/*
 * 动态加载模块路由
 * 约定式路由规则
 */
const allRouter = import.meta.glob('./*/index.js', { eager: true })
let modules = []
for (const path in allRouter) {
  const module = allRouter[path]
  modules = modules.concat(module.router)
}

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_ROOT), // 指定基础路径
  base: import.meta.env.VITE_APP_ROOT,
  routes: [...base, ...modules],
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      nextTick(() => {
        resolve({ top: 0 })
      })
    })
  },
})

/**
 * 路由校验逻辑
 */
router.beforeEach((to, from) => {
  //用于路由跳转的的身份校验，不通过应该跳转到登录页 return { name: 'login' }
  if (to.path === '/muyun-web/' || to.path === '/muyun-web') {
    return { name: 'portal' } //这个 if 是测试用的要根据实际场景修改
  }
  return true
})

export default router
