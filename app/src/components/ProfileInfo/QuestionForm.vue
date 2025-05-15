<template>

<form>
    <h1>INCOME & SAVINGS FORM</h1>
    <input id="p_income" placeholder="Enter Estimated Monthly Income">
    <input id="s_income" placeholder="Enter Secondary Income">



</form>

<form>
    <h1>EXPENSE FORM</h1>
    <div>
    <input v-model="expenseData.groceries" placeholder="Estimated Monthly Grocery cost"/>
    <select v-model="expenseData.groceries.cost_type" >
        <option value="flex">Flexible</option>
        <option value="fixed">Fixed</option>
    </select>
    </div>

    <div>
    <input v-model="expenseData.utilities" placeholder="Estimated Monthly Utilities cost"/>
    <select v-model="expenseData.utilities.cost_type" >
        <option value="flex">Flexible</option>
        <option value="fixed">Fixed</option>
    </select>
    </div>

    <div>
    <input id="expenseData.shopping" placeholder="Estimated Monthly Shopping cost"/>
    <select v-model="expenseData.shopping.cost_type" >
        <option value="flexible">Flexible</option>
        <option value="fixed">Fixed</option>
    </select>
    </div>

    <button type="submit" @click="previewInfo()">Submit Form</button>
</form>

<div>
    <h1>Please verify that the information provided is:</h1><br>

    <h2>Monthly Gorcery Cost: {{expenseData.groceries.value}} </h2>
    <h2>Type: {{ expenseData.groceries.cost_type }}</h2> <br>

    <h2>Monthly Utilities Cost: {{expenseData.utilities.value}}</h2>
    <h2>Type: {{ expenseData.utilities.cost_type }}</h2><br>

    <h2>Monthly Shopping Cost: {{expenseData.shopping.value}}</h2>
    <h2>Type: {{ expenseData.shopping.cost_type }}</h2><br>
</div>

</template>

<script setup lang="ts">
//make formDatat a speparate component bc Im gonna need it againa and tis too coplex to be inline
import {reactive, ref} from "vue"


const expenseData = reactive({
    groceries: { value:0, cost_type:"fixed"}, 
    utilities: { value:0, cost_type:"fixed"},
    shopping: {value:0, cost_type:"fixed"}

})

function previewInfo() {
    //contianer.innerHTML=""
}



</script>
