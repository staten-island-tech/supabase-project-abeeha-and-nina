<template>
  <div class="flex justify-center">
  <div class="bg-base-100 w-1/5 pb-8 pt-6 h-auto border-2 hover:border-4 rounded-lg my-5 min-w-64 shadow-lg">
    <h1 class="text-center text-2xl text-neutral my-1 mx-5 font-bold">Do you want to sign up or log in?</h1>
    <RouterLink to="/register" class="text-blue-600 hover:underline font-medium text-center mb-2 italic"
      >Sign Up</RouterLink
    ><br/>
    <RouterLink to="/login" class="text-blue-600 hover:underline font-medium text-center mb-2 mx-5">Sign In</RouterLink>
  </div>
</div>
</template>

<style></style>
