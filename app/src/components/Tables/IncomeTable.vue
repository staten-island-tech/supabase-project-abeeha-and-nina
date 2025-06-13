<template>
  <h1 style="background: blue; color: white; padding: 10px;">
    SPENDING LOG COMPONENT IS RENDERING!
  </h1>
  <Card>
    <template #title>
      Finance Logs
    </template>
    
    <template #content>
      <DataTable 
        :value="financesStore.finances" 
        :loading="financesStore.loading"
        paginator 
        :rows="10"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        tableStyle="min-width: 50rem"
        :globalFilterFields="['logged_date', 'p_income', 's_income']"
      >
        <template #header>
          <div class="flex justify-content-between align-items-center">
            <h5 class="m-0">Manage Finances</h5>
            <span class="p-input-icon-left">
              <i class="pi pi-search"></i>
              <InputText v-model="filters['global'].value" placeholder="Search..." />
            </span>
          </div>
        </template>
        
        <Column field="logged_date" header="Date" sortable>
          <template #body="slotProps">
            <span class="font-medium">{{ formatDate(slotProps.data.logged_date) }}</span>
          </template>
        </Column>
        
        <Column field="p_income" header="Primary Income" sortable>
          <template #body="slotProps">
            <span class="font-semibold text-blue-600">
              ${{ slotProps.data.p_income.toFixed(2) }}
            </span>
          </template>
        </Column>
        
        <Column field="s_income" header="Secondary Income" sortable>
          <template #body="slotProps">
            <span class="font-semibold text-green-600">
              ${{ slotProps.data.s_income.toFixed(2) }}
            </span>
          </template>
        </Column>
        
        <Column field="sav_goal" header="Savings Goal" sortable>
          <template #body="slotProps">
            <Tag 
              :value="`$${slotProps.data.sav_goal.toFixed(2)}`" 
              severity="success"
            />
          </template>
        </Column>
        
        <Column field="spend_goal" header="Spending Goal" sortable>
          <template #body="slotProps">
            <Tag 
              :value="`$${slotProps.data.spend_goal.toFixed(2)}`" 
              severity="warning"
            />
          </template>
        </Column>
        
        <Column field="debt" header="Debt" sortable>
          <template #body="slotProps">
            <Tag 
              :value="`$${slotProps.data.debt.toFixed(2)}`" 
              :severity="slotProps.data.debt > 0 ? 'danger' : 'success'"
            />
          </template>
        </Column>
        
        <template #empty>
          <div class="text-center p-4">
            <i class="pi pi-wallet text-4xl text-400 mb-3"></i>
            <p class="text-600 text-lg">No finance records found</p>
            <p class="text-500">Add your first income entry to see it here</p>
          </div>
        </template>
      </DataTable>
    </template>
  </Card>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { FilterMatchMode } from '@primevue/core/api'
import { useFinanceStore } from '@/stores/finances'
import { useAuthStore } from '@/stores/pinia'

import Card from 'primevue/card'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import Tag from 'primevue/tag'

const financesStore = useFinanceStore()
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
  financesStore.fetchFinances()
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