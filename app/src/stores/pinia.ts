import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '../supabase'
import type { AppUser } from '@/types'

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false)
  const currentUser = ref<AppUser | null>(null);
  const check = ref(false)

 const getEmptyUser = (): AppUser => ({
    userId: "",
    email: '',
    username: '',
  })

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
    currentUser.value = getEmptyUser()
    localStorage.removeItem("hasSubmittedExpense")
    localStorage.removeItem("hasSubmittedIncome")
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

export const checkSubmitted = defineStore('forms', () => {
  const hasSubmittedExpense = ref(false)
  const hasSubmittedIncome = ref(false)
  
  function markExpenseSubmitted() {
    hasSubmittedExpense.value = true
    localStorage.setItem("hasSubmittedExpense", "true")
  }

  function markIncomeSubmitted() {
    hasSubmittedIncome.value = true
    localStorage.setItem("hasSubmittedIncome", "true")
  }

  function loadSubmissionState() {
    hasSubmittedExpense.value = localStorage.getItem("hasSubmittedExpense") === "true"
    hasSubmittedIncome.value = localStorage.getItem("hasSubmittedIncome") === "true"
  }

  return { hasSubmittedExpense, hasSubmittedIncome, markExpenseSubmitted, markIncomeSubmitted, loadSubmissionState }
})

