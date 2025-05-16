<template>
  <div class="flex justify-center">
    <div class="bg-base-100 w-1/4 pb-8 pt-6 h-auto border-2 hover:border-4 duration-200 rounded-lg my-5 min-w-64 shadow-lg">
      <h1 class="text-center text-2xl text-neutral my-1 mx-5 font-bold">Resetting password...</h1>
      <label for="email" class="pt-3 flex justify-center pb-2">What is your email?</label>
      <div class="flex justify-center">
        <input placeholder="Enter Email" id="email" type="email" v-model="email"></input>
        <input type="submit" @click="sendresetEmail()" class="pl-5 pt-3 hover:text-xl duration-200 font-medium italic"></input>
      </div>
      <RouterLink to="/login" class="flex justify-center pt-3 hover:text-xl duration-200 font-medium italic"
            >Back to Log In</RouterLink><br>
    </div>
  </div>
  </template>
  <script setup lang="ts">
  import {ref} from "vue"
  import { supabase } from "@/supabase";
  const email = ref("");
  
  async function sendresetEmail() {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email.value, { redirectTo: 'https://Abeeha-Nina-Fiance-App/update-password', })
    if (error) console.error('Email invalid.', error);
  else console.log('Reset link sent to email!', data);
  }

  
  </script>
