<template>
    <h1>Log Transactions and Earnings</h1>
    <button>Add Transaction</button>
    
    <div>

    </div>
    <button>Add Additional Earnings</button>
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

    
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import categories from "../ProfileInfo/ExpenseForm.vue";
import AutoComplete from 'primevue/autocomplete';
import type { Category } from "@/types";
import Button from "primevue/button";
import ExpenseForm from "../ProfileInfo/ExpenseForm.vue";
import { supabase } from "@/supabase";
import { useAuthStore } from '@/stores/pinia'

const auth = useAuthStore()
const currentUser = auth.currentUser

const selectedCategory = ref("")

const c_options = computed(() => 
    categories.value.map((c_option:Category) => ({label: c_option.name })) //map reading undef bc categories is empty
)

const showCatForm = ref(false)

function add_Option() {
    showCatForm.value = true
}

//need to access the content of categories from supabase, and store it initially in expenseform

async function getCategories() {
    const { data, error } = await supabase
  .from('expenses')
  .select("category_name")
   .eq('user_id', currentUser.publicId) //make public_id a variable avaiable everywhere

    }

</script>

<style lang="ts" scoped>

</style>