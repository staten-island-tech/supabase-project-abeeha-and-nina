import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/supabase'
import type { CostType, Expense, DateFormat } from '@/types'
import { useAuthStore } from './pinia'

export const useExpensesStore = defineStore("expenses", () => {
    const expenses = ref<Expense[]>([])
    const loading = ref(false)
    const error = ref<string |null>(null)
    const auth = useAuthStore()

const fetchExpenses = async () => {
    if (expenses.value.length > 0) return

    loading.value = true
    error.value = null

    try {
      const { data:expense_data, error: supabaseError } = await supabase
        .from("expenses")
        .select("created_at, category_name, cost_type, purchase_price, purchase_name")
        .eq("user_id", auth.currentUser?.userId)

    
    if (supabaseError) throw supabaseError
    const mappedExpenses = expense_data?.filter(item => item.purchase_name!=null).map(item =>({
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
    

const addExpense = async (userId:string, expenseName:string, expensePrice: number, expenseCategory:string, expenseType:CostType) => {
  loading.value = true
  error.value = null
  try {
    const {data, error:supabaseError} = await supabase.from("expenses").insert({
      user_id: auth.currentUser?.userId,
      purchase_name: expenseName,
      purchase_price: expensePrice,
    category_name: expenseCategory,
    cost_type: expenseType,      
    })
    .select()

    if (supabaseError) throw supabaseError

    const newExpense: Expense = {
        name: expenseName,
        price: expensePrice,
        category: expenseCategory,
        type: expenseType,
        date: new Date().toISOString().substring(0, 10) as DateFormat

    }
      expenses.value.unshift(newExpense)
            
            return { success: true }
        } catch (error) {
            console.error('Error adding expense:', error)
            return { success: false }
        } finally {
            loading.value = false
        }
  }

  const refreshExpenses = async() => {
    expenses.value = []
    await fetchExpenses()
  }



  return { expenses, loading, error, fetchExpenses, addExpense, refreshExpenses }
}

)
