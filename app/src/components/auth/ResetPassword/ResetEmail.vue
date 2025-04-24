<template>

  <input placeholder="Enter Email" id="email" type="email" v-model="email"></input>
  <input type="submit" @click="sendresetEmail()"></input>
  
  </template>
  <script>
  
  async function sendresetEmail() {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: 'https://xycrjhhgpeqxbwydtjzl.supabase.co/update-password', })
    if (error) alert('Email invalid.', error.message);
  else alert('Reset link sent to email!', data);
  }

  
  </script>
