import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/supabase'
import type { FinanceInfo, DateFormat } from '@/types'
import { useAuthStore } from './pinia'


export const useFinanceStore = defineStore("finances", () => {
    const finances = ref<FinanceInfo[]>([])
    const loading = ref(false)
    const error = ref<string |null>(null)
    const auth = useAuthStore()

const fetchFinances = async () => {
    if (finances.value.length > 0) return

    loading.value = true
    error.value = null

    try {
      const { data:finance_data, error: supabaseError } = await supabase
        .from("user_personalized_responses")
        .select("created_at, primary_income, secondary_income, savings_goal, spend_goal, debt")
        .eq("user_id", auth.currentUser?.userId)

    
    if (supabaseError) throw supabaseError
     const mappedFinances: FinanceInfo[] = finance_data?.map(item => ({
                p_income: item.primary_income,
                s_income: item.secondary_income,
                sav_goal: item.savings_goal,
                spend_goal: item.spend_goal,
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
  const addSecondaryIncome = async (userId: string, incomeAmount: number, incomeSource: string) => {
        loading.value = true
        error.value = null
        
        try {
            const { data, error: supabaseError } = await supabase
                .from("user_personalized_responses")
                .insert({
                    user_id: userId,
                    secondary_income: incomeAmount,
                    income_source: incomeSource,
                 created_at: new Date().toISOString()
                })
                .select()
                if (supabaseError) throw supabaseError 
            
            const newIncomeEntry: FinanceInfo = {
                p_income: 0, 
                s_income: incomeAmount,
                sav_goal: 0,
                spend_goal: 0,
                debt: 0,
                logged_date: new Date().toISOString().substring(0, 10) as DateFormat
            }
            
            finances.value.unshift(newIncomeEntry)
            return { success: true }
        } catch (error) {
            console.error('Error adding secondary income:', error)
            return { success: false }
        } finally {
            loading.value = false
        }
    }

    const refreshFinances = async () => {
        finances.value = []
        await fetchFinances()
    }

  return { finances, loading, error, fetchFinances, refreshFinances, addSecondaryIncome }

})
