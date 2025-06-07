import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '../supabase'
import type { AppUser } from '@/types'
// import { getUserPublicId } from '@/components/auth/RegisterForm.vue'

export const useAuthStore = defineStore('auth', () => {

  const isLoggedIn = ref(false)
  const currentUser = ref<AppUser | null>(null) //changed name to currentUSer bc confusing naming
  const check = ref(false)

  function login(userData?: any) {
    isLoggedIn.value = true
    if (userData) {
      currentUser.value = userData
    }
  }

  function logout() {
    supabase.auth.signOut()
    isLoggedIn.value = false
    currentUser.value = null
  }


  return { isLoggedIn, currentUser, login, logout, check }
})