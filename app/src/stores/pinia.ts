import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '../supabase'

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false)
  const User = ref({})
  const check = ref(false)

  function login(userData?: any) {
    isLoggedIn.value = true
    if (userData) {
      User.value = userData
    }
  }

  function logout() {
    supabase.auth.signOut()
    isLoggedIn.value = false
    User.value = {}
  }

  return { isLoggedIn, User, login, logout, check }
})