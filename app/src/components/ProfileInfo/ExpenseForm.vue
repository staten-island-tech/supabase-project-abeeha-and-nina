<template>
    <div class="flex place-content-center grid-cols-2 gap-16">
        <form class="form bg-base-200 rounded-lg px-32" @submit.prevent>
            <h1 v-if="showUpdateIfSubmitted" class="flex justify-center text-4xl ml-48 px-4 py-4 font-extrabold">ADD TO EXPENSE FORM</h1>
            <h1 v-else class="flex justify-center text-4xl ml-48 px-4 py-4 font-extrabold">EXPENSE FORM</h1>
    <h1>Add Spending Categories</h1>
    <div>
    <input v-model="newCategory.name" placeholder="Name"/>
    <input v-model="newCategory.budget_percent" placeholder="Spending budget percentage"/>
    <select v-model="newCategory.cost_type" >
        <option value="flexible">Flexible</option>
        <option value="fixed">Fixed</option>
    </select>
    </div>
    <button type="submit" @click="addCategory(), showTab = true" class="font-medium italic cursor-pointer">Add Category</button><br/>
    <button type="reset" class="font-medium italic cursor-pointer">Reset Values</button><br/>
    <RouterLink to="/dashboard" class="font-medium italic cursor-pointer"> Go Back </RouterLink><br/>
    <button v-if="finishedAnExpense" @click="goHome" class="font-medium italic cursor-pointer">Finish Expenses - can still be updated later!</button><br/>
    <br/><br/><br/>
</form>

</div><br/>
<div class="flex justify-center" v-if="showTab">
  <div class="info_container bg-base-200 rounded-lg px-4 py-6 max-w-3xl mx-auto">
      <h1 class="flex justify-center">SPENDING CATEGORIES</h1><br/>
      <h1 v-for="newCategory in categories"  :key="newCategory.name">
          {{ newCategory.name}} - Monthly Budget Percent
  : {{ newCategory.budget_percent
  }} <br/> Type: {{ newCategory.cost_type }}
      </h1>
      <button @click="append_toProf(), showUpdate()" class="font-medium italic cursor-pointer">Add to Profile!</button><br/>
      <button @click="removeTab()" type="reset" class="font-medium italic cursor-pointer">Remove</button>
  </div>
</div>
</template>

<script lang="ts" setup>
import { type Category } from '@/types.ts'
import {reactive, ref} from "vue"
import { supabase } from '@/supabase'
import router from '@/router'
import { finished } from 'stream'
import { useCategoriesStore } from '@/stores/categories'
import { checkSubmitted } from '@/stores/pinia'

const check = checkSubmitted()


const showTab = ref<boolean>(false)
function removeTab(){
  showTab.value = false
  categories.splice(0, categories.length) 
}

const showUpdateIfSubmitted = ref<boolean>(false)

function resetForm() {
  newCategory.name = "";
  newCategory.budget_percent = null;
  newCategory.cost_type = "fixed";
}

function showUpdate(){
  showUpdateIfSubmitted.value = true
}

function goHome(){
  router.push("/dashboard")
}

const categories = reactive<Category[]>([])

const finishedAnExpense = ref<boolean>(false)

const newCategory = reactive<Category>({
    name: "",
    budget_percent:null,
    cost_type:'fixed'
})

function addCategory() {
    categories.push({...(newCategory)})

}

async function append_toProf() {
  const user = (await supabase.auth.getUser()).data.user;
  if (user) {
    const { data, error } = await supabase.from('expenses').insert([{
      user_id: user.id,
      category_name: newCategory.name,
      budget_percent: newCategory.budget_percent,
      cost_type: newCategory.cost_type
    },
  ])
  if (error) {
    alert("Error updating expenses!")
    console.log(error)
  }else{
    alert("Profile Updated!")
    showTab.value = false
    finishedAnExpense.value = true
    check.markExpenseSubmitted()
  }
  }
}
</script>