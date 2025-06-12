<template>
<h1>Hello {{ auth.username }}!</h1><br>
<h2> {{ currentUser?.email }}</h2><br>

<h1>Financial Data</h1>

<DataTable :value="finance_info" tableStyle="min-width: 50rem">
    <Column field="name" header="Name"></Column>
    <Column field="value" header="Amount"></Column>
</DataTable>

<DataTable :value="expense_info" tableStyle="min-width: 50rem">
    <Column field="name" header="Category"></Column>
    <Column field="value" header="Percent of Budget"></Column>
    <Column field="type" header="Cost Type"></Column>

</DataTable>


</template>

<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { supabase } from '@/supabase';
import { useAuthStore } from '@/stores/pinia';
import { onMounted, ref, computed } from 'vue';
import { type Finance_Info, type CostType, type Expense } from '@/types';
const authStore = useAuthStore()
const currentUser = authStore.currentUser

const auth = useAuthStore()

const finance_info = ref<Finance_Info[]>([
{ name:"Primary Income", value:0},
{name:"Secondary Income", value:0},
{ name:"Debt", value:0},
{ name:"Savings Goal", value:0},
{ name:"Spending Income", value:0},

])

const expense_info = ref<Expense[]>([
])


async function getFinanceData() {
    if (!currentUser) return;
          
    const {data: financeData, error} = await supabase.from("user_personalized_responses").select("primary_income, secondary_income, savings_goal, spend_goal, debt").eq("user_id", currentUser.userId).single()
    if (financeData) {
        finance_info.value = [
        { name: "Primary Income", value: financeData.primary_income },
      { name: "Secondary Income", value: financeData.secondary_income },
      { name: "Debt", value: financeData.debt },
      { name: "Savings Goal", value: financeData.savings_goal },
      { name: "Spending Goal", value: financeData.spend_goal }
]
    }
    }

async function getExpenseData() {
    if (!currentUser) return;
          
    const {data: expenseData, error} = await supabase.from("expenses").select("category_name, budget_percent, cost_type").eq("user_id", currentUser.userId).maybeSingle()
    if (expenseData) {
        console.log("hello world")
        expense_info.value.push(
        { name:expenseData.category_name, value: expenseData.budget_percent, type:expenseData.cost_type.toString() },
        )
    }
    else if (error) {
        console.error(error)
    }
}

function getData() {
    getFinanceData(),
    getExpenseData()
}

onMounted(() => getData())



</script>

<style lang="scss" scoped>

</style>