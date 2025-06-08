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
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>