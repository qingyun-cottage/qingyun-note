import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import PasswordView from '@/views/PasswordView.vue'
import { AV } from '@/utils/leancloud'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: PasswordView,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      component: LoginView
    },
    {
      path: '/register',
      component: RegisterView
    }
  ]
})

router.beforeEach((to, from, next) => {
  const currentUser = AV.User.current()
  if (to.meta.requiresAuth && !currentUser) {
    next('/login')
  } else {
    next()
  }
})

export default router