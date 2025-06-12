import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/supabase'
import type { Category } from '@/types'

export const useCategoriesStore = defineStore("categories", () => {
    const categories = ref<Category[]>([])
    const loading = ref(false)
    const error = ref<string |null>(null)

const fetchCategories = async (userId: string) => {
    if (categories.value.length > 0) return

    loading.value = true
    error.value = null

    try {
      const { data:category_data, error: supabaseError } = await supabase
        .from("expenses")
        .select("category_name, budget_percent, cost_type")
        .eq("user_id", userId)

    
    if (supabaseError) throw supabaseError

    const uniqueCategories = category_data?.filter((item, index, self) => index === self.findIndex(cat => cat.category_name === item.category_name)
      ).map(item =>({
        name: item.category_name,
        budget_percent: item.budget_percent,
        cost_type: item.cost_type
      }))
      categories.value = uniqueCategories
    }
    catch (error) {
        console.error(error)
    } finally {
      loading.value = false
    }
    

}
  return { categories, loading, error, fetchCategories }

})
