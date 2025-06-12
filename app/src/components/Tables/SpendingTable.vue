<template>
  <div class="w-full px-24">
    <DataTable :value="usersRowData" showGridlines tableStyle="max-width: 100rem">
      <Column field="cost_type" header="Type"></Column>
      <Column field="category_name" header="Category Name"></Column>
      <Column field="budget_percent" header="Budget Percent"></Column>
    </DataTable>
    <pre>{{ usersRowData }}</pre>
  </div>
</template>

<script lang="ts" setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { supabase } from '@/supabase';
import { ref, onMounted } from 'vue'
import type { expenses } from '@/types'

const usersRowData = ref<expenses[]>([])

onMounted(async () => {
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError) {
    alert("There was an error fetching user!")
    return
  }

  if (user) {
    const { data, error } = await supabase
      .from('expenses')
      .select("category_name, cost_type, budget_percent")
      .eq('entry_id', user.id)

    if (error) {
      alert("There was an error fetching the data")
    } else if (data) {
      usersRowData.value = data
    }
  }
})
</script>