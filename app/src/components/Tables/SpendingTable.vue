<template>
  <div class="w-full px-36">
    <DataTable :value="usersRowData" showGridlines tableStyle="max-width: 100rem">
      <Column field="cost_type" header="Cost Type"></Column>
      <Column field="category_name" header="Category Name"></Column>
      <Column field="budget_percent" header="Budget Percent"></Column>
    </DataTable>
  </div>
</template>

<script lang="ts" setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { supabase } from '@/supabase';
import { ref, onMounted } from 'vue'
import type { Expense } from '@/types'

const usersRowData = ref<Expense[]>([])

onMounted(async () => {
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError) {
    alert("There was an error fetching user!")
    return
  }
  if (user) {
    const { data, error } = await supabase
      .from('expenses')
      .select("user_id, category_name, cost_type, budget_percent")
      .eq('user_id', user.id)
    if (error) {
      alert("There was an error fetching the data")
    } else if (data) {
      usersRowData.value = data
      console.log(usersRowData.value)
    }
  }
})
</script>