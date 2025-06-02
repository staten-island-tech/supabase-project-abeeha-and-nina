<template>
    <h1>Log Transactions and Earnings</h1>
    <button>Add Transaction</button>
    
    <div>

    </div>
    <button>Add Additional Earnings</button>
    <!-- <AutoComplete v-model="selectedCategory" :suggestions="categories">
    
</AutoComplete> -->

    
</template>

<script setup lang="ts">
import { ref } from "vue";
import categories from "./ProfileInfo/ExpenseForm.vue";
const selectedCategory = ref("")
</script>

<style lang="ts" scoped>

</style>