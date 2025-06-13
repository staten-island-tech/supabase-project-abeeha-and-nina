<template>
    <h1 class="text-center">Log Transactions and Earnings</h1><br/>
    <div class="flex justify-center">
        <div class="grid grid-cols-2 gap-6">
    <button class="hover:text-xl duration-150 font-medium italic px-4 py-2 rounded-lg bg-base-200">Add Transaction</button>

    <button class="hover:text-xl duration-150 font-medium italic px-4 py-2 rounded-lg bg-base-200">Add Additional Earnings</button>
    </div>
    
    </div><br/>
    
</template>

<script setup lang="ts">
import { useCategoriesStore } from '@/stores/categories';
import { useExpensesStore } from '@/stores/expenses';
import { ref } from 'vue';
import { Form } from '@primevue/forms';
import { useAuthStore } from '@/stores/pinia';
import { supabase } from '@/supabase';

const selectedCategory = ref()
const auth = useAuthStore()
const expenseStore = useExpensesStore()
const categoryStore = useCategoriesStore()

const initialValues = {
  name: "Purchase Name",
  category: "Expense Category",
  price: "Purchase Price",
  type: "Purchase Type",
  date: "Date of Purchase"
}


const addExpense = async (userId:string, expenseName:string, expensePrice: number, expenseCategory:string, expenseType:CostType) =>
  loading.value = true
  error.value = null
  try {
    const {data, error:supabaseError} = await supabase.from("expenses").insert({
      user_id: auth.currentUser?.userId,
      purchase_name: expenseName,
      purchase_price: expensePrice,
    category_name: expenseCategory,
    cost_type: expenseType,
    created_at: Date.now()

      
    })
    .select()

    if (supabase) throw supabaseError

    const newExpense: Expense = {
        name: expenseName,
        price: expensePrice,
        category: expenseCategory,
        type: expenseType,
        date: Date.now().toString().substring(0,10)

    }
  }











</script>

<style lang="ts" scoped>

</style>