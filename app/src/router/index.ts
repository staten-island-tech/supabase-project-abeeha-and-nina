import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterForm from '@/components/auth/RegisterForm.vue'
import LoginForm from '@/components/auth/LoginForm.vue'
import ResetEmail from '@/components/auth/ResetPassword/ResetEmail.vue'
import DashboardView from '@/views/DashboardView.vue'
import AuthPage from '@/views/AuthPage.vue'
import UpdatePassword from "@/components/auth/ResetPassword/UpdatePassword.vue"
import QuestionForm from '@/components/ProfileInfo/QuestionForm.vue'
import { useAuthStore } from '@/stores/pinia'
import ExpenseForm from '@/components/ProfileInfo/ExpenseForm.vue'
import LogData from '@/components/Tables/LogData.vue'
import MainHome from '@/components/MainHome.vue'
import SpendingTable from "@/components/Tables/SpendingForm.vue"
import UserProfile from '@/components/ProfileInfo/UserProfile.vue'
import LogOut from '@/components/LogOut.vue'
import GraphData from '@/components/GraphData.vue'

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {requiresAuth: true}

    },
    {
      path: '/login',
      name: 'login',
      component: LoginForm,
      meta: {requiresAuth: false}

    },
    {
      path: '/register',
      name: 'register',
      component: RegisterForm,
      meta: {requiresAuth: false}
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: {requiresAuth: true}
    },
    {
      path: '/reset',
      name: 'reset',
      component: ResetEmail,
      meta: {requiresAuth: true}

    },
    {
      path: '/update-password',
      name: 'update-password',
      component: UpdatePassword,
      meta: {requiresAuth: true}
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthPage,
      meta: {requiresAuth: false}
    },
    {
      path: '/logout',
      name: 'logout',
      component: LogOut,
      meta: {requiresAuth: true}
    },
    {
      path: '/questionform',
      name: 'questionform',
      component: QuestionForm,
      meta: {requiresAuth: true}  //Change later, just for testing
    },    
    {
      path: '/expenseform',
      name: 'expenseform',
      component: ExpenseForm,
      meta: {requiresAuth: true}  //Change later, just for testing
    },
      {
      path: '/logs',
      name: 'logs',
      component: LogData,
      meta: {requiresAuth: true}  
    },
      {
      path: '/main',
      name: 'main',
      component: MainHome,
      meta: {requiresAuth: true} 
    },
    {
      path: '/explog',
      name: 'explog',
      component: SpendingTable,
      meta: {requiresAuth: true}  
    },
        {
      path: '/profile',
      name: 'profile',
      component: UserProfile,
      meta: {requiresAuth: true}  
    },
    {
      path: '/graphs',
      name: 'graphs',
      component: GraphData,
      meta: {requiresAuth: true}  
    },
  ],
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    next({path: "/"})
  } else {
    next()
  }
})

export default router

