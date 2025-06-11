<template>
  <div class="flex justify-center mb-4">
    <div class="hover:text-xl duration-150 font-medium italic px-4 py-2 rounded-lg bg-base-200">
      <RouterLink to="/questionform">Click Here to Build My Profile!</RouterLink>
    </div>
  </div><br/>
  <div class="flex justify-center">
    <div class="hover:text-xl duration-150 font-medium italic px-4 py-2 rounded-lg bg-base-200">
      <RouterLink to="/expenseform">Click Here to Organize My Expenses!</RouterLink>
    </div>
  </div><br/>
  <div v-if="check.hasSubmittedExpense && check.hasSubmittedIncome" class="flex justify-center">
    <div class="hover:text-2xl duration-150 font-medium px-4 py-2 rounded-lg bg-base-200 text-xl">
      <RouterLink to="/main">Click Here to Go To Data and Budgeting!</RouterLink>
    </div>
  </div>
  <div class="flex justify-center">
    <div class="hover:text-xl duration-150 font-medium italic px-4 py-2 rounded-lg bg-base-200">
      <RouterLink to="/profile">Click Here to View Profile!</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { checkSubmitted } from '@/stores/pinia';

const check = checkSubmitted()

</script>