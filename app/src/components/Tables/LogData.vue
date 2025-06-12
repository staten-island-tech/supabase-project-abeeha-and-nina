<template>
    <h1 class="text-center">Log Transactions and Earnings</h1><br/>
    <div class="flex justify-center">
        <div class="grid grid-cols-2 gap-6">
    <button class="hover:text-xl duration-150 font-medium italic px-4 py-2 rounded-lg bg-base-200">Add Transaction</button>

    <button class="hover:text-xl duration-150 font-medium italic px-4 py-2 rounded-lg bg-base-200">Add Additional Earnings</button>
    </div>
    
    </div><br/>
    

    <Form v-slot="$form" :initialValues >


        <!-- <div class="flex justify-center">
    <AutoComplete v-model="selectedCategory" optionLabel="selectedCategory.name" :suggestions="categoryStore.categories"> 
        <template #header>
            <div class="font-medium px-3 py-2">Available Categories</div>
        </template>

    <template #option="useAuthStore.categories">
            <div class="flex items-center">
                <div>{{ categories.value.name }}</div>
            </div>
        </template>
        
        <template #footer>
            <div class="px-3 py-3">
                <Button label="Add New Category" @click="add_Option()" text size="small" icon="pi pi-plus"></Button>
                <ExpenseForm v-if="showCatForm"></ExpenseForm>
            </div>
        </template>
    </AutoComplete>
    
    </div><br/><br/> -->
    </Form>

    
</template>

<script setup lang="ts">
import { useCategoriesStore } from '@/stores/categories';
import { useExpensesStore } from '@/stores/expenses';
import { ref } from 'vue';
import { Form } from '@primevue/forms';
import { useAuthStore } from '@/stores/pinia';

const selectedCategory = ref()
const auth = useAuthStore()
const expenseStore = useExpensesStore()
const categoryStore = useCategoriesStore()

const initialValues = ref([
    {name:"Purchase Name", 
    price: "Purchase Price",
    category: "Expense Category",
    type:"Purchase Type",
    date:"Date of Purchase"    }
])


//









</script>

<style lang="ts" scoped>

</style>