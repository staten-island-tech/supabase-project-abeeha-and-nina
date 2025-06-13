<script setup lang="ts">
import {supabase} from "../../supabase"
import { ref } from 'vue'
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/pinia.ts";

const password = ref('');
const email = ref("");
const auth = useAuthStore();
const router = useRouter();

const logInUser = async() =>{
  const { data , error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
    }
)
    if (error) alert (error.message);
    else if (data.user){
      alert("Logged in successfully!");
      await auth.login(data.user);
      router.push("/")
    }
}

</script>

<template>
<div class="flex justify-center">
  <div class="bg-base-100 w-1/4 pb-8 pt-6 h-auto border-2 hover:border-4 duration-200 rounded-lg my-5 min-w-64 shadow-lg bg-base-200">
    <form @submit.prevent="logInUser">
      <h1 class="text-center text-2xl my-1 mx-5 font-bold">Login here!</h1>
      <label for="email" class="flex justify-center pt-3">What is your email?</label>
      <div class="flex justify-center">
        <input class="text-center" placeholder="Email" type="email" id="email" v-model="email">
      </div>
      <label for="password" class="flex justify-center pt-3">What is your password?</label>
      <div class="flex justify-center">
        <input class="text-center" placeholder="Password" type="password" id="password" v-model="password">
      </div>
      <div class="flex justify-center pt-3 hover:text-xl duration-200 font-medium italic cursor-pointer">
        <input type="submit" value="Log In"></input>
      </div>
    </form>
    <RouterLink to="/reset" class="flex justify-center pt-3 hover:text-xl duration-200 font-medium italic"
            >Reset Password</RouterLink>
    <RouterLink to="/register" class="flex justify-center pt-3 hover:text-xl duration-200 font-medium italic"
            >Register Instead</RouterLink><br>        
  </div>
</div>
</template>