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
<form>
  <h1>Login</h1>
  <input placeholder="Email" type="email" id="email" v-model="email"><br>
  <input placeholder="Password" type="password" id="password" v-model="password"><br>
  <input type="submit" @click="signInWithEmail()"></input>
</form>
<RouterLink to="/reset" class="text-blue-600 hover:underline font-medium"
        >Reset Password</RouterLink><br>
</template>