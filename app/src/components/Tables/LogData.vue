<template>
    <h1 class="text-center">Log Transactions and Earnings</h1><br/>
    <div class="flex justify-center">
        <div class="grid grid-cols-2 gap-6">
    <button class="hover:text-xl duration-150 font-medium italic px-4 py-2 rounded-lg bg-base-200">Add Transaction</button>
    <button class="hover:text-xl duration-150 font-medium italic px-4 py-2 rounded-lg bg-base-200">Add Additional Earnings</button>
    </div>
    </div><br/>
    <div class="flex justify-center">
    <AutoComplete v-model="selectedCategory" optionLabel="label" :suggestions="c_options"> 
    <template #option="c_options">
            <div class="flex items-center">
                <div>{{ c_options.option.name }}</div>
            </div>
        </template>
        <template #header>
            <div class="font-medium px-3 py-2">Available Categories</div>
        </template>
        <template #footer>
            <div class="px-3 py-3">
                <Button label="Add New Category" @click="add_Option()" text size="small" icon="pi pi-plus"/>
                <ExpenseForm v-if="showCatForm"></ExpenseForm>
            </div>
        </template>
    </AutoComplete>
    </div><br/><br/>

    
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import AutoComplete from 'primevue/autocomplete';
import type { Category } from "@/types";
import Button from "primevue/button";
import ExpenseForm from "../ProfileInfo/ExpenseForm.vue";
import { supabase } from "@/supabase";
import { useAuthStore } from '@/stores/pinia'

const auth = useAuthStore()
const currentUser = auth.currentUser

const selectedCategory = ref("")


const showCatForm = ref(false)

function add_Option() {
    showCatForm.value = true
}

//need to access the content of categories from supabase, and store it initially in expenseform

const c_options = ref<any>(null)

async function getCategories() {
    if (currentUser) {
    const { data, error } = await supabase
  .from('expenses')
  .select("category_name")
   .eq('user_id', currentUser.userId) 
    
    if (data) {
    c_options.value = data
}
    }
}

const userExpenses = ref([""])

async function getExpenses() {
    if (currentUser) {
const { data, error } = await supabase
  .from('expenses')
  .select("*")
   .eq('user_id', currentUser.userId)
    
if (data) {
    userExpenses.value = data
}
else {
    console.error(error)
}
}
}


</script>

<style lang="ts" scoped>

</style>