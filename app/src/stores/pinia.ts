import { computed, ref } from 'vue'
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

  const username = computed(() => currentUser.value?.username || '')

  // async function fetchUsername(userId: string) {
  //   const { data, error } = await supabase
  //     .from('users')
  //     .select('username')
  //     .eq('id', userId)
  //     .maybeSingle()

  //   if (error) {
  //     alert(error.message)
  //   } else if (data) {
  //     currentusername.value = data.username
  //   }
  // }

  return { isLoggedIn, currentUser, username, login, logout, check }
})