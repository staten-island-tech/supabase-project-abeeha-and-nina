<script setup lang="ts">
import {supabase} from "../../supabase.ts"
import { ref } from 'vue'

const password = ref('');
const email = ref("");


async function signInWithEmail() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })

}
</script>

<template>
<div class="flex justify-center">
  <div class="bg-base-100 w-1/4 pb-8 pt-6 h-auto border-2 hover:border-4 duration-200 rounded-lg my-5 min-w-64 shadow-lg">
    <form>
      <h1 class="text-center text-2xl text-neutral my-1 mx-5 font-bold">Login here!</h1>
      <label for="email" class="flex justify-center pt-3">What is your email?</label>
      <input placeholder="Email" type="email" id="email" v-model="email"><br>
      <input placeholder="Password" type="password" id="password" v-model="password"><br>
      <input type="submit" @click="signInWithEmail()"></input>
    </form>
    <RouterLink to="/reset" class="text-blue-600 hover:underline font-medium"
            >Reset Password</RouterLink><br>
  </div>
</div>
</template>