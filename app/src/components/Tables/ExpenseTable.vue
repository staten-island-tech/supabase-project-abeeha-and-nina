<template>
  <DataTable :value="expenses" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" showGridlines tableStyle="min-width: 50rem">
    <Column field="type" header="Type"></Column>
    <Column field="name" header="Name"></Column>
    <Column field="category" header="Category"></Column>
    <Column field="price" header="Price"></Column>
</DataTable>
</template>

<script setup>

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';


</script>

<style lang="scss" scoped>

</style>