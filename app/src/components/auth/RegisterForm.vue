<template>
    <div>
      <h1>Register here!</h1>
      <form @submit.prevent="registerUser">
        <label for="name">What is your name?</label><br>
        <input placeholder="Full Name" type="text" id="name" v-model="name"><br>
        <label for="email">What is your email?</label><br>
        <input placeholder="Email" type="email" id="email" v-model="email"><br>
        <label for="password">Create a secure password:</label><br>
        <input placeholder="Password" type="password" id="password" v-model="password"><br>
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
  if (error) alert('You are already registered in this Finance App. Please login.', error.message);
  else alert('You are now registered in the Finance App!', data);
}

const linkUsers = async () => {
  const { data, error} = await supabase.from('Users').insert({
    email: email.value,
    password: password.value,
    user_name: name.value,
    options: {
      data: {
        user_name: name.value
      }
    }
  })
  if (error) alert('You are already registered in this Finance App. Please login.', error.message);
  else alert('You are now registered in the Finance App!', data);
}
</script>