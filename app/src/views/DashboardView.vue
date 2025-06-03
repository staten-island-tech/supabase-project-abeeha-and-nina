<template>
    <div class="hover:text-xl duration-150 font-medium italic px-3 py-3 rounded-lg bg-base-200">
        <RouterLink to="/questionform">Click Here to Build My Profile!</RouterLink>
    </div> <br/>
    <div class="hover:text-xl duration-150 font-medium italic px-3 py-3 rounded-lg bg-base-200">
        <RouterLink to="/expenseform">Click Here to Organize My Expenses!</RouterLink>
    </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>