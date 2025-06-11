<template>
  <div class="w-full px-24">
  <DataTable :value="expenses" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" showGridlines tableStyle="max-width: 100rem">
    <Column field="type" header="Type"></Column>
    <Column field="name" header="Name"></Column>
    <Column field="category" header="Category"></Column>
    <Column field="price" header="Price"></Column>
</DataTable>
</div>
</template>

<script lang="ts" setup>

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { defineProps, onMounted } from 'vue';
import userExpenses from "./LogData.vue"
import getCategories from "./LogData.vue"
import c_options from "./LogData.vue"
import categories from "../ProfileInfo/ExpenseForm.vue"


 defineProps ({
  userExpenses,
  getCategories,
  c_options,
  categories
}
)

onMounted(() => {
  
})
</script>

<style lang="scss" scoped>

</style>