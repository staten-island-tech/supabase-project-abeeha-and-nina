<template>
    <div class="w-full px-36">
<DataTable :value="usersRowData" tableStyle="min-width: 50rem">
    <Column field="primary_income" header="Primary Income"></Column>
    <Column field="secondary_income" header="Secondary Income"></Column>
    <Column field="savings_goal" header="Savings Goal"></Column>
</DataTable>
</div>
</template>

<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { supabase } from '@/supabase';
import { ref, onMounted } from 'vue'
import type { UserPersonalizedResponse } from '@/types'

const usersRowData = ref<UserPersonalizedResponse[]>([])

onMounted(async () => {
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError) {
    alert("There was an error fetching user!")
    return
  }

  if (user) {
    const { data, error } = await supabase
      .from('user_personalized_responses')
      .select("primary_income, secondary_income, savings_goal")
      .eq('user_id', user.id)
      .single()

    if (error) {
      alert("There was an error fetching the data")
    } else if (data) {
      usersRowData.value = [data]
    }
  }
})
</script>