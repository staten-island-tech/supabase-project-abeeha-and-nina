<template>

<form>
    
    <h1>PERSONAL INFO</h1>
    <input placeholder="Enter Full Name"/>
    <input placeholder="Enter Preferred Name"/>
    <input placeholder="Enter Age"/>

    //name, age, update DisplayName Property in auth tble

    <h1>INCOME</h1>
    <input id="p_income" placeholder="Enter Estimated Monthly Income">
    <input id="s_income" placeholder="Enter Secondary Income">
    <input id="deps" placeholder="Number of Dependents">

    <h1>GOALS</h1>
    <input id="savings_goal" placeholder="MONTHLY SAVINGS GOAL">
    <input id="spend_goal" placeholder="MONTHYL SPENDING GOAL">
</form>

<form>
    <h1>EXPENSE FORM</h1>
    <h1>Add Spending Categories</h1>
    <div>
    <input id="cat_name" :v-model="expenseData.category.name" placeholder="Name"/>
    <input id="spend_limit" :v-model="expenseData.category.value" placeholder="Spending Limit"/>
    <select id="flexiblity" :v-model="expenseData.category.cost_type" >
        <option value="flex">Flexible</option>
        <option value="fixed">Fixed</option>
    </select>
    </div>
    <btn @click="addCategory()">Add Category</btn>
    <btn>Done</btn> 


    <button type="submit" @click="previewInfo()">Submit Form</button>
</form>

<div :v-if="{showPreview}" >
    <h1>Please verify that the information provided is correct:</h1><br>

    <!-- <h2 v-for="(item,name) in expenseData" :key="name">Est. Monthly Cost: {{item.value }}, Cost Type: {{ item.cost_type }} </h2> -->

</div>

</template>

<script setup lang="ts">

import {reactive, ref} from "vue"

const categories = reactive({ 

})

const expenseData = reactive(
    {
        category: {name:"", value:0, cost_type:"fixed"}
    }
)

//Note: next step is to store all user info, append it to one place, and then import it into profile
//q:

const showPreview = ref("false")

function previewInfo() {
    showPreview.value = "true"
    
}

function addCategory() {

}



</script>
