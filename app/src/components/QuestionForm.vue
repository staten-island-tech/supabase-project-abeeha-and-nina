<template>

<form>
    <h1>INCOME FORM</h1>
    <input id="p_income" placeholder="Enter Monthly Income">
    <input id="s_income" placeholder="Enter Secondary Income">


</form>

<form>
    <h1>EXPENSE FORM</h1>
    <div>
    <input id="groceries" placeholder="Estimated Monthly Grocery cost">

    <select v-model="selected">
    <option v-for="groc_option in groc_options" :value="groc_option.value">
        {{ groc_option.text }}
    </option>
    </select>
    </div>
    <div>
        <input id="utilities" placeholder="Estimated Monthly Utilities cost">


    </div>
   


</form>

</template>


<script setup lang="ts">
import {ref} from "vue"

const selected = ref('flex')

const groc_options = ref([
  { text: 'Flexible', value: 'flexible' },
  { text: 'Rigid', value: 'rigid' },
])

function appendInfo() {
    const groc_cost = 
}

//append info to profile, 

</script>
