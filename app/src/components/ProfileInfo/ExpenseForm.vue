<template>
    <div class="flex place-content-center grid-cols-2 gap-16">
        <form class="form bg-base-200 rounded-lg px-32" @submit.prevent>
            <h1 class="flex justify-center text-4xl ml-48 px-4 py-4 font-extrabold">EXPENSE FORM</h1>
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

    <div v-if="showInfo" class="info_container bg-base-200 rounded-lg px-16">
        <h1 class="flex justify-center text-4xl ml-48 px-4 py-4 font-extrabold">Spending Categories</h1>
        <h1 v-for="newCategory in categories"  :key="newCategory.name">
            {{ newCategory.name}} - Monthly budget_percent
    : {{ newCategory.budget_percent
    }}, Type: {{ newCategory.cost_type }}
        </h1>
    </div>
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
    showInfo.value = true
    categories.push({...(newCategory)})
    newCategory.name = ""
    newCategory.budget_percent = null
    newCategory.cost_type = "fixed"
}


</script>