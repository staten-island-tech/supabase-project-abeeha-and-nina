<template>

<form>
    <h1>INCOME & SAVINGS FORM</h1>
    <input id="p_income" placeholder="Enter Estimated Monthly Income">
    <input id="s_income" placeholder="Enter Secondary Income">



</form>

<form>
    <h1>EXPENSE FORM</h1>
    <div>
    <input v-model="expenseData.groceries.value" placeholder="Estimated Monthly Grocery cost"/>
    <select v-model="expenseData.groceries.cost_type" >
        <option value="flex">Flexible</option>
        <option value="fixed">Fixed</option>
    </select>
    </div>

    <!-- <div>
    <input v-model="expenseData.utilities" placeholder="Estimated Monthly Utilities cost"/>
    <select v-model="expenseData.utilities.cost_type" >
        <option value="flex">Flexible</option>
        <option value="fixed">Fixed</option>
    </select>
    </div>
    <h1>SHOPPING</h1>
    <div>
    <input id="expenseData.shopping" placeholder="Estimated Monthly Shopping cost"/>
    <select v-model="expenseData.shopping.cost_type" >
        <option value="flexible">Flexible</option>
        <option value="fixed">Fixed</option>
    </select>
    </div> -->

    <button type="submit" @click="previewInfo()">Submit Form</button>
</form>

<div :v-if="{showPreview}">
    <h1>Please verify that the information provided is correct:</h1><br>

    <h2 v-for="(item,name) in expenseData" :key="name">{{ item.name }} - Est. Monthly Cost: {{item.value }}, Cost Type: {{ item.cost_type }} </h2>

</div>

</template>

<script setup lang="ts">

import {reactive, ref} from "vue"


const expenseData = reactive({
    groceries: { value:0, cost_type:"fixed"}, 
    utilities: { value:0, cost_type:"fixed"},
    shopping: {value:0, cost_type:"fixed"}

})
//submit pressed, displayprev = true, it displays, v-else on form and it dissappears
//button in preview has option to submit(appends data to profile) or edit, which turns the preview off and the form on.
//repeat with the submit button

const showPreview = ref("false")

function previewInfo() {
    showPreview.value = "true"
    


}

//Expenses: Category 1, 2, etc(class). Individual Costs: properties =>
// Select: Monthly or Weekly, Type: Flexible or Fixed, Value/Cost, Weekly/Monthly Spending Goal: 

//Income
//Add Primary Income: 
//Savings Goal per week/month




</script>
