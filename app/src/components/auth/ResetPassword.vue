<template>
<input placeholder="New Password" type="password" id="newpassword" v-model="newpassword"><br>
<input type="submit" @click="updatePassword()">Submit</input>
</template>
<script>

async function updatePassword() {
const { data, error } = await supabase.auth.updateUser({
  email: newpassword.value
})
if (error) {
    console.error('Error resetting password:', error)
  } else {
    console.log('Password reset successfully', data)
  }
}

</script>
