<template>
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

<script setup>
import QuestionForm from './QuestionForm.vue';

function appendInfo(expenseData) {
    
}

</script>

<style lang="scss" scoped>

</style>