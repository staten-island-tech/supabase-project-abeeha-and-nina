<template>
  <div>
    <h1>Do you want to sign up or log in?</h1>
    <RouterLink to="/register" class="text-blue-600 hover:underline font-medium"
        >Sign Up</RouterLink><br>
    <RouterLink to="/login" class="text-blue-600 hover:underline font-medium"
        >Sign In</RouterLink><br>
    <RouterLink to="/reset"class="text-blue-600 hover:underline font-medium"
        >Reset Password</RouterLink><br>
  </div>
</template>

<script setup lang="ts">

import { RouterLink, RouterView } from 'vue-router'

</script>
