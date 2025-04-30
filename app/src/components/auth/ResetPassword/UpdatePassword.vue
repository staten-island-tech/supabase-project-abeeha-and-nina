<template>
  <form @submit.prevent="updatePassword">
    <input placeholder="New Password" type="password" id="password" v-model="password"><br>
    <btn type="submit">Submit</btn>
  </form>
    <RouterLink to="/login" class="text-blue-600 hover:underline font-medium"
        >Log In</RouterLink><br>
    
    </template>
    <script setup lang="ts">
    import {ref} from "vue"
    import { supabase } from '@/supabase'

    const password = ref("")

    async function updatePassword() {
    if (password.value === "") {
      alert("Password field is empty")
      return
    }
    const { data, error } = await supabase.auth.updateUser({
      password: password.value
    })
    if (error) {
    console.error(error);
    alert('Error resetting password:');
  }
  else {
    console.log(data);
    alert('Password reset successfully! You may now log in.');
  }
  }
    
    </script>