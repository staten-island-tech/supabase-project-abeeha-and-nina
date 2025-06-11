<template>
<h1>Hello {{ currentUser?.username }}!</h1><br>
<h2> {{ currentUser?.email }}</h2><br>

<h1>Financial Data</h1>
<DataTable>




  
</template>

<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { supabase } from '@/supabase';
import { useAuthStore } from '@/stores/pinia';
import { onMounted, ref, computed } from 'vue';
const authStore = useAuthStore()
const currentUser = authStore.currentUser



const finance_info = ref([
{ name:"Primary Income", value:0},
{name:"Secondary Income", value:0},
{ name:"Debt", value:0},
{ name:"Savings Goal", value:0},
{ name:"Spending Income", value:0},



])

const expense_info = ref({

})

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
    

}

onMounted(() => getFinanceData())



</script>

<style lang="scss" scoped>

</style>