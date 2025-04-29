<template>
    <input placeholder="New Password" type="password" id="newpassword" v-model="newpassword"><br>
    <input type="submit" @click="updatePassword()">Submit</input>
    <RouterLink to="/login" class="text-blue-600 hover:underline font-medium"
        >Log In</RouterLink><br>
    
    </template>
    <script>
    async function updatePassword() {
    const { data, error } = await supabase.auth.updateUser({
      password: newpassword.value
    })
    if (error) {
        console.error('Error resetting password:', error)
      } else {
        console.log('Password reset successfully', data)
      }
    }
    
    </script>