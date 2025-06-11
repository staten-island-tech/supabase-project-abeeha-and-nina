import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '../supabase'
import type { AppUser } from '@/types'

export const useAuthStore = defineStore('auth', () => {

  const isLoggedIn = ref(false)
  const currentUser = ref<AppUser |null>({
      userId: "",
      email:    '',
      username: '',
});
  const check = ref(false)

  async function login(userData?: any) {
  isLoggedIn.value = true;
  if (userData && userData.id && userData.email) {
    currentUser.value = { userId: userData.id, email: userData.email, username: '' };

    const { data: profileRow, error } = await supabase
      .from('users')
      .select('username')
      .eq('id', userData.id)
      .single();

    if (profileRow && currentUser.value) {
      currentUser.value.username = profileRow.username;
    }
  }
}

  function logout() {
    supabase.auth.signOut()
    isLoggedIn.value = false
    currentUser.value = null
  }


  return { isLoggedIn, currentUser, login, logout, check }
})