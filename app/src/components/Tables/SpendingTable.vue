<template>
  <Card>
    <template #title>
      Expense Logs
    </template>
    
    <template #content>
      <DataTable 
        :value="expenseStore.expenses" 
        :loading="expenseStore.loading"
        paginator 
        :rows="10"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        tableStyle="min-width: 50rem"
        :globalFilterFields="['name', 'category', 'type']"
      >
        <template #header>
          <div class="flex justify-content-between align-items-center">
            <h5 class="m-0">Manage Expenses</h5>
            <span class="p-input-icon-left">
              <i class="pi pi-search" ></i>
              <InputText v-model="filters['global'].value" placeholder="Search..." />
            </span>
          </div>
        </template>
        
        <Column field="name" header="Expense Name" sortable>
          <template #body="slotProps">
            <span class="font-medium">{{ slotProps.data.name }}</span>
          </template>
        </Column>
        
        <Column field="price" header="Amount" sortable>
          <template #body="slotProps">
            <span class="font-semibold text-green-600">
              ${{ slotProps.data.price.toFixed(2) }}
            </span>
          </template>
        </Column>
        
        <Column field="category" header="Category" sortable>
          <template #body="slotProps">
            <Tag :value="slotProps.data.category" severity="info" />
          </template>
        </Column>
        
        <Column field="type" header="Cost Type" sortable>
          <template #body="slotProps">
            <Tag 
              :value="slotProps.data.type" 
              :severity="slotProps.data.type === 'fixed' ? 'danger' : 'warning'"
            />
          </template>
        </Column>
        
        <Column field="date" header="Date" sortable>
          <template #body="slotProps">
            {{ formatDate(slotProps.data.date) }}
          </template>
        </Column>
        
        <template #empty>
          <div class="text-center p-4">
            <i class="pi pi-inbox text-4xl text-400 mb-3"></i>
            <p class="text-600 text-lg">No expenses found</p>
            <p class="text-500">Add your first expense to see it here</p>
          </div>
        </template>
      </DataTable>
    </template>
  </Card>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { FilterMatchMode } from '@primevue/core/api'
import { useExpensesStore } from '@/stores/expenses'
import { useAuthStore } from '@/stores/pinia'

import Card from 'primevue/card'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import Tag from 'primevue/tag'

const expenseStore = useExpensesStore()
const auth = useAuthStore()

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

onMounted(async () => {
  if (auth.currentUser?.userId) {
    await expenseStore.fetchExpenses()
  }
  console.log(expenseStore.expenses)
  console.log("Hello world")

})
</script>

<style lang="scss" scoped>
:deep(.p-datatable .p-datatable-header) {
  background: transparent;
  border: none;
  padding: 1rem 0;
}

:deep(.p-tag) {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
}
</style>