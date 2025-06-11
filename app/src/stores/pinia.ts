import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '../supabase'
import type { AppUser } from '@/types'

export const useAuthStore = defineStore('auth', () => {

  const isLoggedIn = ref(false)
  const currentUser = ref<AppUser | null>(null)
  const username = ref("")
  const check = ref(false)

  async function login(userData?: any) {
    isLoggedIn.value = true
    if (userData) {
      currentUser.value = userData
      await fetchUsername(userData.id) 
    }
  }

  function logout() {
    supabase.auth.signOut()
    isLoggedIn.value = false
    currentUser.value = null
    username.value = ""
  }

  async function fetchUsername(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('username')
      .eq('id', userId)
      .maybeSingle()

    if (error) {
      alert(error.message)
    } else if (data) {
      username.value = data.username
    }
  }

  return { isLoggedIn, currentUser, username, login, logout, check }
})