<template>
  <Card>
    <template #title>
      Add New Expense
    </template>
    
    <template #content>
      <form @submit.prevent="handleSubmit">
        <div class="p-fluid">
          <div class="field">
            <label for="expenseName">Expense Name</label>
            <InputText 
              id="expenseName" 
              v-model="expenseName" 
              placeholder="Enter expense name"
            />
          </div>

          <div class="field">
            <label for="expensePrice">Price</label>
            <InputNumber 
              id="expensePrice" 
              v-model="expensePrice" 
              placeholder="0"
            />
          </div>

          <div class="field">
            <label for="expenseCategory">Category</label>
            <Select 
              id="expenseCategory" 
              v-model="expenseCategory" 
              :options="categoryOptions" 
              optionLabel="name" 
              optionValue="name"
              placeholder="Select category"
            ></Select>
          </div>

          <div class="field">
            <label for="expenseType">Cost Type</label>
            <Select 
              id="expenseType" 
              v-model="expenseType" 
              :options="costTypeOptions" 
              placeholder="Select type"
            ></Select>
          </div>

          <Button 
            type="submit" 
            :loading="expenseStore.loading"
            class="mt-3"
          >
            Add Expense
          </Button>
        </div>
      </form>
    </template>
  </Card>
</template>

<script lang="ts" setup>

const expenseStore = useExpensesStore()
const auth = useAuthStore()
const categoriesStore = useCategoriesStore()


import { ref, computed, onMounted } from 'vue'
import { useExpensesStore } from '@/stores/expenses'
import { useCategoriesStore } from '@/stores/categories'
import { useAuthStore } from '@/stores/pinia'
import type { CostType } from '@/types'

import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'
import { Select } from 'primevue'


const expenseName = ref('')
const expensePrice = ref<number | null>(null)
const expenseCategory = ref('')
const expenseType = ref<CostType | ''>('')

const costTypeOptions = ref<CostType[]>(['fixed', 'flexible'])

const categoryOptions = computed(() => {
  return categoriesStore.categories
})

onMounted(async () => {
  if (auth.currentUser?.userId) {
  await categoriesStore.fetchCategories(auth.currentUser?.userId)
  }
})


const handleSubmit = async () => {
    if (!auth.currentUser?.userId) {
    console.error('User not authenticated')
    return
  }
  const result = await expenseStore.addExpense(
    auth.currentUser?.userId,
    expenseName.value,
    expensePrice.value!,
    expenseCategory.value,
    expenseType.value as CostType
  )

  if (result.success) {
    expenseName.value = ''
    expensePrice.value = null
    expenseCategory.value = ''
    expenseType.value = ''
  }
}

</script>

<style lang="scss" scoped>

</style>
 