<template>
  <div class="w-full px-24">
  <DataTable :value="expenseStore.expenses" showGridlines tableStyle="max-width: 100rem">
    <Column field="type" header="Type"></Column>
    <Column field="name" header="Name"></Column>
    <Column field="category" header="Category"></Column>
    <Column field="price" header="Price"></Column>
    <Column field="date" header="Date"></Column>

  </DataTable>
</div>
</template>

<script lang="ts" setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/pinia';
import { supabase } from '@/supabase';
import { ref } from 'vue';
import { useExpensesStore } from '@/stores/expenses';

const expenseStore = useExpensesStore()
const auth = useAuthStore()

onMounted(async () => {
  if (auth.currentUser?.userId) {
    await expenseStore.fetchExpenses(auth.currentUser.userId)
  } else {
    console.error('User ID not available')
  }
})

</script>

<style lang="scss" scoped>

</style>
