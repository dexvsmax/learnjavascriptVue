import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/phones',
    component: () => import('@/views/Phones.vue')
  },
  {
    path: '/users',
    component: () => import('@/views/Users.vue')
  },
  {
    path: '/add',
    component: () => import('@/views/Add.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/users/:id',
    component: () => import('@/views/Edit.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  linkExactActiveClass: 'active',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.getItem('vue-token-custom')) {
      next({
        path: '/users',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

router.beforeResolve((to, from, next) => {
  if (to.path) {
    NProgress.start()
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
