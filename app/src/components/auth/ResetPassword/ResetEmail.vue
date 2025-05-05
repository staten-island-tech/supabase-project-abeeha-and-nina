<template>

  <form @submit.prevent="sendresetEmail">
  <input placeholder="Enter Email" id="email" type="email" v-model="email"></input>
  <button type="submit">Submit</button>
  </form>
  
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
