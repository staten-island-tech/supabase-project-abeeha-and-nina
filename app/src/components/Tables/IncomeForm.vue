<template>
  <Card>
    <template #title>
      Add Additional Income
    </template>
    
    <template #content>
      <form @submit.prevent="handleSubmit">
        <div class="p-fluid">
          <div class="field">
            <label for="incomeSource">Income Source</label>
            <InputText
              id="incomeSource"
              v-model="incomeSource"
              placeholder="Enter income source"
            />
          </div>
          
          <div class="field">
            <label for="incomeAmount">Amount</label>
            <InputNumber
              id="incomeAmount"
              v-model="incomeAmount"
              placeholder="0"
              :min="0"

            />
          </div>
          
          <Button
            type="submit"
            :loading="financesStore.loading"
            class="mt-3"
          >
            Add Income
          </Button>
        </div>
      </form>
    </template>
  </Card>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useFinanceStore } from '@/stores/finances'
import { useAuthStore } from '@/stores/pinia'

import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'

const financesStore = useFinanceStore()
const auth = useAuthStore()

const incomeSource = ref('')
const incomeAmount = ref<number | null>(null)

onMounted(async () => {
  if (auth.currentUser?.userId) {
    await financesStore.fetchFinances()
  }
})

const handleSubmit = async () => {
  if (!auth.currentUser?.userId) {
    console.error('User not authenticated')
    return
  }
  
  if (!incomeAmount.value || incomeAmount.value <= 0) {
    console.error('Please enter a valid income amount')
    return
  }

  const result = await financesStore.addSecondaryIncome(
    auth.currentUser.userId,
    incomeAmount.value,
    incomeSource.value
  )

  if (result.success) {
    incomeSource.value = ''
    incomeAmount.value = null
  }
}
</script>