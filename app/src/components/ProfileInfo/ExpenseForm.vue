<template>
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
    <button type="submit" @click="addCategory()" class="font-medium italic cursor-pointer">Add Category</button><br>
    <br>
</form>

<div v-if="previewInfo" class="info_container">
    <h1>Spending Categories</h1>
    <h1 v-for="newCategory in categories"  :key="newCategory.name">
        {{ newCategory.name}} - Monthly budget_percent
: {{ newCategory.budget_percent
 }}, Type: {{ newCategory.cost_type }}
    </h1>
</div>
</template>

<script lang="ts" setup>
import { type UserData, type Category } from '@/types'
import {reactive, ref} from "vue"

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
</script>