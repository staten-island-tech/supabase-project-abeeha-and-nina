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
        <option value="flex">Flexible</option>
        <option value="fixed">Fixed</option>
    </select>
    </div>

    <button type="submit" @click="previewInfo()">Submit Form</button>
</form>

<div>
    <h1>Please verify information before submitting.</h1><br>

    <h2>Monthly Gorcery Cost: {{expenseData.groceries.value}} </h2>
    <h2>Type: {{ expenseData.groceries.cost_type }}</h2> <br>

    <h2>Monthly Utilities Cost: {{expenseData.utilities.value}}</h2>
    <h2>Type: {{ expenseData.utilities.cost_type }}</h2><br>

    <h2>Monthly Shopping Cost: {{expenseData.shopping.value}}</h2>
    <h2>Type: {{ expenseData.shopping.cost_type }}</h2><br>


    

</div>

</template>


<script setup lang="ts">
import {reactive, ref} from "vue"


const expenseData = reactive({
    groceries: { value:0, cost_type:""},  //in types.ts, interface formData, int expected for value, and string for cost_type
    utilities: { value:0, cost_type:""},
    shopping: {value:0, cost_type:""}



})

function previewInfo() {
    
}
    

//append info to formData before profile, bc we need to likely preview it before changing main state
//user needs to be able to select type, type needs to be shown. So each property has its own property so it needs to be an object

</script>
