<template>

<form>
    <h1>INCOME & SAVINGS FORM</h1>
    <input id="p_income" placeholder="Enter Estimated Monthly Income">
    <input id="s_income" placeholder="Enter Secondary Income">



</form>

<form>
    <h1>EXPENSE FORM</h1>
    <h1>Add Spending Categories</h1>
    <div>
    <input :v-model="categories.category.name" placeholder="Name"/>
    <input :v-model="categories.category.value" placeholder="Spending Limit"/>
    <select v-model="categories.category.cost_type" >
        <option value="flex">Flexible</option>
        <option value="fixed">Fixed</option>
    </select>
    </div>
    <btn @click="addCategory()">Add Category</btn>
    <btn>Done</btn> 
<div :v-for="(category) in categories" :key="category.name">

</div>


    <button type="submit" @click="previewInfo()">Submit Form</button>
</form>

<div :v-if="{showPreview}">
    <h1>Please verify that the information provided is correct:</h1><br>

    <!-- <h2 v-for="(item,name) in expenseData" :key="name">Est. Monthly Cost: {{item.value }}, Cost Type: {{ item.cost_type }} </h2> -->

</div>

</template>

<script setup lang="ts">

import {reactive, ref} from "vue"

const categories = reactive({
    category: {name:"", value:0, cost_type:"fixed"}, 

})












const showPreview = ref("false")

function previewInfo() {
    showPreview.value = "true"
    


}

function addCategory() {

}

//Expenses: Category 1, 2, etc(class). Individual Costs: properties =>
// Select: Monthly or Weekly, Type: Flexible or Fixed, Value/Cost, Weekly/Monthly Spending Goal: 

//Income
//Add Primary Income: 
//Savings Goal per week/month




</script>
