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
      <div class="flex justify-center pt-3 hover:text-xl duration-200 font-medium italic cursor-pointer">
        <input type="submit" value="Ready to Register!">
      </div>
          <RouterLink to="/login" class="flex justify-center pt-3 hover:text-xl duration-200 font-medium italic"
            >Log In Instead</RouterLink><br>    
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
  else if (data.user) {
        alert('You are now registered in the Finance App!');
    await linkUsers(data.user.id);
    auth.login();
    router.push("/");
  }
  else{
      console.log(error);
  }

}

const linkUsers = async (userId: string) => {
  const { error } = await supabase.from('users').upsert({
    id: userId,
    email: email.value,
    username: name.value,
  }, {
      onConflict: 'id', //this tells supabase to update the existing row if its already there
    }
    );

  if (error) {
    console.error( error.message, error.details);
    alert( error.message);
  }
   const { data: row, error: fetchError } = await supabase
    .from('users')
    .select('public_id')
    .eq('id', userId)
    .single();

  if (fetchError) {
    console.error(fetchError.message);
    return null;
  }

  return row.public_id;
};


</script>