<template>
  <div>
    <h1>Do you want to sign up or log in?</h1>
    <RouterLink to="/register" class="text-blue-600 hover:underline font-medium"
        >Sign Up</RouterLink>
    <RouterLink to="/login" class="text-blue-600 hover:underline font-medium"
        >Sign In</RouterLink>
    <RouterLink to="/reset"class="text-blue-600 hover:underline font-medium"
        >Reset Password</RouterLink>
    <RouterView></RouterView>
  </div>
</template>

<style>

</style>
