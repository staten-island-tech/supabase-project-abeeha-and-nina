<template>
    <div class="flex justify-center">
      <div class="bg-base-100 w-1/4 pb-8 pt-6 h-auto border-2 hover:border-4 duration-200 rounded-lg my-5 min-w-64 shadow-lg bg-base-200">
      <h1 class="text-center text-2xl my-1 mx-5 font-bold">Register here!</h1>
      <form @submit.prevent="registerUser">
        <label for="name" class="pt-3 flex justify-center pb-2">What is your name?</label>
        <div class="flex justify-center">
        <input class="text-center" placeholder="Full Name" type="text" id="name" v-model="name">
      </div>
        <label for="email" class="flex justify-center pt-3">What is your email?</label>
        <div class="flex justify-center">
        <input class="text-center" placeholder="Email" type="email" id="email" v-model="email">
      </div>
        <label for="password" class="flex justify-center pt-3">Create a secure password:</label>
        <div class="flex justify-center">
        <input class="text-center" placeholder="Password" type="password" id="password" v-model="password">
      </div>
      <div class="flex justify-center pt-3 hover:text-xl duration-200 font-medium italic">
        <input type="submit" value="Ready to Register!">
      </div>
      </form>
    </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {supabase} from "../../supabase"
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/pinia'

const router = useRouter()
const auth = useAuthStore()

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
  if (error) alert(error.message);
  else{
    alert('You are now registered in the Finance App!');
    await linkUsers(data.user.id);
    auth.login();
    router.push("/");

  }
}

const linkUsers = async (userId) => {
  const { error} = await supabase.from('Users').insert({
    auth_id: userId,
    email: email.value,
    user_name: name.value,
  })
}

// export async function getUserPublicId() {
//   const {data: {user}} = await supabase.auth.getUser();
//   if (!user) {
//     return null
//   }
//   else {
//     const {data, error} = await supabase.from("users").select("user_id").eq("UID", user.id).single();
//     if (error) {
//       console.error("unable to get user_id")
//       return null
//     } 
//     else {
//       return data ?.user_id?? null
//     }
//   }
  
// }

</script>