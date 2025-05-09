<template>
  <div class="flex justify-center">
  <div class="bg-base-100 w-1/4 pb-8 pt-6 h-auto border-2 hover:border-4 duration-200 rounded-lg my-5 min-w-64 shadow-lg">
    <h1 class="text-center text-2xl text-neutral my-1 mx-5 font-bold">Would you like to sign up or log in?</h1>
    <RouterLink to="/register" class="hover:text-xl duration-200 pt-8 font-medium flex justify-center mb-2 mx-5"
      >Sign Up</RouterLink
    ><br/>
    <RouterLink to="/login" class="hover:text-xl duration-200 font-medium flex justify-center mb-2 mx-5">Sign In</RouterLink>
  </div>
</div>
</template>

<script setup lang="ts">

import { RouterLink, RouterView } from 'vue-router'

</script>
