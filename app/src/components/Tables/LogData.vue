<template>
    <h1 class="text-center">Log Transactions and Earnings</h1><br/>
    <div class="flex justify-center">
        <div class="grid grid-cols-2 gap-6">
    <button class="hover:text-xl duration-150 font-medium italic px-4 py-2 rounded-lg bg-base-200">Add Transaction</button>

    <button class="hover:text-xl duration-150 font-medium italic px-4 py-2 rounded-lg bg-base-200">Add Additional Earnings</button>
    </div>
    
    </div><br/>
    

    <Form v-slot="$form" :expenseStore.expenses :initialValues>

    <FormField v-slot="$field" name="name" initialValue="" class="flex flex-col gap-1">
        <input type="text" placeholder="Purchase Name" :class="[{ error: $field?.invalid }]" v-bind="$field.props" />
        <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}</Message>
    </FormField>
    <FormField v-slot="$field" name="price" initialValue="PrimeVue" class="flex flex-col gap-1">
        <input v-model="$field.value" placeholder="Password" :class="[{ error: $field?.invalid }]" @input="$field.onInput" @blur="$field.onBlur" @change="$field.onChange" />
        <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}</Message>
    </FormField>
    <Button type="submit" severity="secondary" label="Submit"></Button>
    <InputText name="price" type="text" fluid></InputText>


    <InputText name="name" :placeholder="initialValues.name" />
    <InputText name="category" :placeholder="initialValues.category" />
    <InputNumber name="price" :placeholder="initialValues.price" />
    <Dropdown
      name="type"
      :options="costTypeOptions"
      optionLabel="label"
      optionValue="value"
      placeholder="Purchase Type"
    />
    <Calendar name="date" :placeholder="initialValues.date" dateFormat="yy-mm-dd" />
    <Button type="submit" label="Add Expense"></Button>

    </Form>    <Message></Message>


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

const initialValues = {
  name: "Purchase Name",
  category: "Expense Category",
  price: "Purchase Price",
  type: "Purchase Type",
  date: "Date of Purchase"
}

const costType= {
    label: 
}










</script>

<style lang="ts" scoped>

</style>