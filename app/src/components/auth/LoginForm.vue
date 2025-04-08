<script setup lang="ts">
import supabase from supabase.ts

async function signInWithEmail() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'user.email',
    password: '//user.password',
  })
}
</script>

<template>
<h1>Login</h1>
<input placeholder="Email" />
<input placeholder="Password" />
<btn type="submit" @click="signInWithEmail()">Submit</btn>


</template>