import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterForm from '@/components/auth/RegisterForm.vue'
import LoginForm from '@/components/auth/LoginForm.vue'
import ResetEmail from '@/components/auth/ResetPassword/ResetEmail.vue'
import DashboardView from '@/views/DashboardView.vue'
import AuthPage from '@/views/AuthPage.vue'

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginForm,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterForm,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/reset',
      name: 'reset',
      component: ResetEmail,
    },
    {
      path: '/update-password',
      name: 'update-password',
      component: UpdatePassword,
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthPage,
    },
  ],
})

export default router
