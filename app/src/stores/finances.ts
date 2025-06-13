import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/supabase'
import type { FinanceInfo } from '@/types'

export const useExpensesStore = defineStore("expenses", () => {
    const finances = ref<FinanceInfo[]>([])
    const loading = ref(false)
    const error = ref<string |null>(null)

const fetchFinances = async (userId: string) => {
    if (finances.value.length > 0) return

    loading.value = true
    error.value = null

    try {
      const { data:finance_data, error: supabaseError } = await supabase
        .from("user_personalized_responses")
        .select("created_at, primary_income, secondary_income, savings_goal, spending_goal, debt")
        .eq("user_id", userId)

    
    if (supabaseError) throw supabaseError
     const mappedFinances: FinanceInfo[] = finance_data?.map(item => ({
                p_income: item.primary_income,
                s_income: item.secondary_income,
                sav_goal: item.savings_goal,
                spend_goal: item.spending_goal,
                debt: item.debt,
                logged_date: item.created_at.substring(0, 10)}))

      finances.value = mappedFinances
      console.log(finances)
    }
    catch (error) {
        console.error(error)
    } finally {
      loading.value = false
    }
  }
  return { finances, loading, error, fetchFinances }

})
