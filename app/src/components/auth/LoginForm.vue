<script setup lang="ts">
import {supabase} from "../../supabase.ts"
import { ref } from 'vue'
import router from "@/router/index.ts";

const password = ref('');
const email = ref("");


async function signInWithEmail() {
  const { data , error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
    }
)
  if (error) {
    console.error(error);
    alert('Invalid email or password');
  }
  else {
    console.log(data);
    alert("Logged in successfully!");
    router.push("/dashboard")
  }
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