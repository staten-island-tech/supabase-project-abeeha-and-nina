import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/supabase'
import type { Expense } from '@/types'

export const useExpensesStore = defineStore("expenses", () => {
    const expenses = ref<Expense[]>([])
    const loading = ref(false)
    const error = ref<string |null>(null)

const fetchExpenses = async (userId: string) => {
    if (expenses.value.length > 0) return

    loading.value = true
    error.value = null

    try {
      const { data:expense_data, error: supabaseError } = await supabase
        .from("expenses")
        .select("created_at, category_name, cost_type, purchase_price, purchase_name")
        .eq("user_id", userId)

    
    if (supabaseError) throw supabaseError

    const mappedExpenses = expense_data?.map(item =>({
        name: item.purchase_name,
        price: item.purchase_price,
        category: item.category_name,
        type:item.cost_type,
        date:item.created_at.substring(0, 10)
      }))
      expenses.value = mappedExpenses
    }
    catch (error) {
        console.error(error)
    } finally {
      loading.value = false
    }
    

}
  return { expenses, loading, error, fetchExpenses }

})
