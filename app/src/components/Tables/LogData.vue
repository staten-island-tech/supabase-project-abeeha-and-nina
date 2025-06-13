<template>
  
    <h1 class="text-center">Log Transactions and Earnings</h1><br/>
    < class="flex justify-center">
        <div class="grid grid-cols-2 gap-6">
    <button v-if="showAddExpense != true" @click="showExpenseForm" class="hover:text-xl duration-150 font-medium italic px-4 py-2 rounded-lg bg-base-200">Add Transaction</button>
    <SpendingTable v-if="showAddExpense"/>
    <button @click="showIncomeForm()" v-if="showAddIncome != true" class="hover:text-xl duration-150 font-medium italic px-4 py-2 rounded-lg bg-base-200">Add Additional Earnings</button>
    <IncomeTable v-if="showAddIncome" />
    </div><br/>
    
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SpendingTable from './SpendingForm.vue';
import IncomeTable from './IncomeForm.vue';

const showAddExpense = ref<boolean>(false)

function showExpenseForm() {
  showAddExpense.value= true
}

const showAddIncome = ref<boolean>(false)

function showIncomeForm() {
  showAddIncome.value= true
}

</script>

<style lang="ts" scoped>

</style>