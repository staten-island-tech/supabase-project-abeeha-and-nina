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
        name: name.value,
        confirmation_sent_at: Date.now(),
      }
    }
  })
  if (error) alert('There was an error signing you up.', error.message);
  else{
    alert('You are now registered in the Finance App!');
    await linkUsers(data.user.id);
  }
}

const linkUsers = async (userId) => {
  const { error} = await supabase.from('Users').insert({
    id: userId,
    email: email.value,
    password: password.value,
    user_name: name.value,
  })
  if (error) alert('Error linking user to the table' + error.message);
  else alert('You are now in the Users table!');
}
</script>