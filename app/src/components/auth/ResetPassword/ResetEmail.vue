<template>

<input placeholder="Enter Email" v-model="email"></input>

</template>
<script>

async function sendresetEmail() {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: 'https://xycrjhhgpeqxbwydtjzl.supabase.co/update-password', })

}

</script>
