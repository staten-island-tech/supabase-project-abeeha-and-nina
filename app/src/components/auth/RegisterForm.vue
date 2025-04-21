<template>
    <div>
      <h1>Register here!</h1>
      <form @submit.prevent="registerUser">
        <label for="name">What is your name?</label><br>
        <input type="text" id="name" v-model="name"><br>
        <label for="email">What is your email?</label><br>
        <input type="email" id="email" v-model="email"><br>
        <label for="password">Create a secure password:</label><br>
        <input type="password" id="password" v-model="password"><br>
        <input type="submit" value="Register for an account">
      </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import {supabase} from "../../supabase.ts"

const name = ref('')
const email = ref('')
const password = ref('')

const registerUser = async () => {
  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: {
        name: name.value
      }
    }
  })

  if (error) {
    alert('error:', error.message)
  } else {
    alert('You are now registered in the Finance App!', data)
  }
}
</script>