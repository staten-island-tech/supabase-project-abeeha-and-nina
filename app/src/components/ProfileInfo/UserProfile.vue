<template>
<div class="w-full px-36">
    <h1 class="text-center">Name: {{ auth.username }}</h1><br>
    <h2 class="text-center">Username: {{ currentUser?.email }}</h2><br>

    <h1 class="text-center text-3xl">ALL RECORDED FINANCIAL DATA</h1>

    <div>
    <DataTable :value="finance_info" tableStyle="min-width: 50rem">
        <Column field="name" header="Category"></Column>
        <Column field="value" header="Amount"></Column>
    </DataTable>
    </div><br/>
    <div>
    <DataTable :value="expense_info" tableStyle="min-width: 50rem">
        <Column field="category_name" header="Category"></Column>
        <Column field="budget_percent" header="Percent of Budget"></Column>
        <Column field="cost_type" header="Cost Type"></Column>
        <Column field="purchase_price" header="Purchase Price"></Column>


    </DataTable><br/><br/>
    </div>
</div>
</template>

<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { supabase } from '@/supabase';
import { useAuthStore } from '@/stores/pinia';
import { onMounted, ref, computed } from 'vue';
import { type FinanceInfo, type CostType, type Expense } from '@/types';
import { type profileExpense } from '@/types';

import type { displayFinance } from '@/types';

const finance_info = ref<displayFinance[]>([]);


const expense_info = ref<profileExpense[]>([])




const authStore = useAuthStore()
const currentUser = authStore.currentUser

const auth = useAuthStore()

async function getFinanceData() {
    if (!currentUser) return;
          
    const {data, error} = await supabase.from("user_personalized_responses").select("primary_income, secondary_income, savings_goal, spend_goal, debt").eq("user_id", currentUser.userId).single()
    if (error){
        alert(error)
        return
    }
    if (data) {
        finance_info.value = [
        { name: "Primary Income", value: data.primary_income },
      { name: "Secondary Income", value: data.secondary_income },
      { name: "Debt", value: data.debt },
      { name: "Savings Goal", value: data.savings_goal },
      { name: "Spending Goal", value: data.spend_goal }
]
    }
    }

async function getExpenseData() {
    if (!currentUser) return;
          
    const {data, error} = await supabase.from("expenses")
        .select("user_id, category_name, budget_percent, cost_type, purchase_price")
        .eq("user_id", currentUser.userId)
    
    if (error){
        alert(error)
        return
    }
    if (data){
        expense_info.value = data
    }
}

async function getData() {
    getFinanceData(),
    getExpenseData()
}

onMounted(() => getData())



</script>

<style lang="scss" scoped>

</style>