<template>
<div class="flex place-content-center">
<form class="form" @submit.prevent>   
  <h1>BASIC INFO</h1>
  <input v-model="UserInfo.nName" placeholder="Preferred Name" /><br> 

  <h1>INCOME</h1>
  <input v-model.number="UserInfo.pIncome" placeholder="Estimated Monthly Income"><br>
  <input v-model.number="UserInfo.sIncome" placeholder="Secondary Income (optional)"><br>
  <input v-model.number="UserInfo.Debt" placeholder="Debt (optional)"><br>

  <h1>GOALS (Monthly)</h1>
  <input v-model.number="UserInfo.sav_goal" placeholder="MONTHLY SAVINGS GOAL"><br>
  <input v-model.number="UserInfo.spend_goal" placeholder="OVERALL MONTHLY SPENDING GOAL"><br>

    <button type="submit" @click="previewInfo()">Submit Form</button><br>
</form>


<form class="form" @submit.prevent>
    <h1>EXPENSE FORM</h1>
    <h1>Add Spending Categories</h1>
    <div>
    <input v-model="newCategory.name" placeholder="Name"/>
    <input v-model="newCategory.budget_percent" placeholder="Spending budget_percent"/>
    <select v-model="newCategory.cost_type" >
        <option value="flex">Flexible</option>
        <option value="fixed">Fixed</option>
    </select>
    </div>
    <button type="submit" @click="addCategory()">Add Category</button><br>
    <br>
</form>

<div class="info_container">
    <h1>Spending Categories</h1>
    <h1 v-for="newCategory in categories"  :key="newCategory.name">
        {{ newCategory.name}} - Monthly budget_percent
: {{ newCategory.budget_percent
 }}, Type: {{ newCategory.cost_type }}
    </h1>
</div>

<div v-if="showInfo" class="infocontainer">
    <h1>Please verify that the information provided is correct:</h1><br>
    <h3>Name: {{ UserInfo.nName }}</h3>
    <h3>Estimated Monthly Income: {{ UserInfo.pIncome }}</h3>
    <h3>Secondary Income: {{ UserInfo.sIncome ?? "None" }}</h3>
    <h3>Debt: {{ UserInfo.Debt ?? "None" }}</h3>
    <h3>Monthly Savings Goal: {{ UserInfo.sav_goal }}</h3>
    <h3>Monthly Spending Goal: {{ UserInfo.spend_goal }}</h3>
    
    <button @click="updateProfile()">Yes</button>
    <button @click="">No</button>
</div>
</div>

</template>

<script setup lang="ts">
import { type UserData, type Category } from '@/types'
import {reactive, ref} from "vue"
import { supabase } from '@/supabase'

//Frm INfo stroe

const UserInfo = reactive<UserData>({
    nName:"",
    pIncome:null,
    sIncome:null,
    Debt:null,
    sav_goal:null,
    spend_goal:null,
})

//Categories
const categories = reactive<Category[]>([])

const newCategory = reactive<Category>({
    name: "",
    budget_percent:null,
    cost_type:'fixed'
})

function addCategory() {
    categories.push({...(newCategory)})
    newCategory.name = ""
    newCategory.budget_percent = null
    newCategory.cost_type = "fixed"
}

const showInfo = ref<boolean>(false)

function previewInfo() {
    showInfo.value = true
}

//Append to tables
async function updateProfile() {
    const { data, error } = await supabase.from('User Personalized Responses').insert([
  {
    primary_income: UserInfo.pIncome,
    secondary_income:UserInfo.sIncome,
    savings_goal: UserInfo.sav_goal,
    spend_goal: UserInfo.spend_goal,
    debt: UserInfo.Debt,
  },
])

if (error) {
    console.error(error)
    alert("Error updating profile!")
}
if (data) {
    alert("Profile Updated!")
}
}

</script>

<style>


</style>
