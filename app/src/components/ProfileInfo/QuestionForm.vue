<template>
<div class="flex place-content-center ">
    <form>   
    <h1>BASIC INFO</h1>
    <input placeholder="Full Name"/><br>
    <input placeholder="Preferred Name"/><br>
    <input placeholder="Age"/><br>

    <h1>INCOME</h1>
    <input id="p_income" placeholder="Estimated Monthly Income"><br>
    <input id="s_income" placeholder="Secondary Income"><br>
    <input id="deps" placeholder="Number of Dependents"><br>
    <input placeholder="Debt (optional)"><br>

    <h1>GOALS</h1>
    <input id="savings_goal" placeholder="MONTHLY SAVINGS GOAL">
    <input id="spend_goal" placeholder="MONTHYL SPENDING GOAL">

    <h1>EXPENSE FORM</h1>
    <h1>Add Spending Categories</h1>
    <div>
    <input id="cat_name" :v-model="newCategory.name" placeholder="Name"/>
    <input id="spend_limit" :v-model="newCategory.limit" placeholder="Spending Limit"/>
    <select id="flexiblity" :v-model="newCategory.cost_type" >
        <option value="flex">Flexible</option>
        <option value="fixed">Fixed</option>
    </select>
    </div>
    <btn @click="addCategory()">Add Category</btn><br>
    <btn>Done</btn> <br>
    <button type="submit" @click="previewInfo()">Submit Form</button><br>
</form>

<div :v-if="{showPreview}" >
    <h1>Please verify that the information provided is correct:</h1><br>
    <h1 :v-for="newCategory" in categories>
        {{ newCategory.name}}
    </h1>
</div>
</div>

</template>

<script setup lang="ts">
import type { Category } from '@/types'
import {reactive, ref} from "vue"

//Frm INfo stroe



//Categories
const categories = reactive<Category[]>([])

const newCategory = reactive<Category>({
    name: "",
    limit:0,
    cost_type:'fixed'
})

function addCategory() {
    categories.push({...newCategory}
    ) //spread operator that creates a blank copy of that object
    newCategory.name = "",
    newCategory.limit = 0,
    newCategory.cost_type = 'fixed'
}

//Preview
const showPreview = ref("false")

function previewInfo() {
    showPreview.value = "true"

}

</script>
<style>

</style>
