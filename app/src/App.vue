<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { gsap } from "gsap"
import { ref, onMounted } from 'vue'
import { useAuthStore } from './stores/pinia';
import ThemeSelector from './components/ThemeSelector.vue'
import { supabase } from './supabase';
import LogOut from './components/LogOut.vue';
import DashboardView from './views/DashboardView.vue';
import router from './router';

const auth = useAuthStore()
const username = ref("")
const dashboardButtonVisible = ref<boolean>(true)

const headerRef = ref<HTMLElement | null>(null)

onMounted(() => {
  gsap.from(headerRef.value, {
    y: -50,
    opacity: 0,
    duration: 1,
    ease: "power2.out"
  })
  useAuth()
})

async function useAuth() {
  const { data } = await supabase.auth.getSession()
  if (data.session) {
    const user = data.session.user;

    auth.login(data.session.user)
    await getUsername(user.id);        
  }
}

function goToDashboard(){
  dashboardButtonVisible.value = false
  router.push("/dashboard")
}

function turnTrue(){
    dashboardButtonVisible.value = true
}

const getUsername = async (userId: string)=>{
  const{ data, error } = await supabase.from('users').select('username').eq('id', userId).maybeSingle();
  
  if (error){
    alert(error.message);
  }
  else if(data){
    username.value = data.username
    
  }
  }
</script>

<template>
  <div class="min-h-screen bg-base-100 text-base-content">
    <header>
      <div class="pt-3 flex justify-center">
        <ThemeSelector />
      </div>
      <div class="pt-3 flex justify-center">
      <RouterLink to="/" @click="turnTrue" class="cursor-pointer border-primary text-lg px-3 py-3 rounded-lg hover:text-3xl duration-200 border-4 border-solid bg-base-200">Home</RouterLink>
      </div>
      <h1
        v-if="!auth.isLoggedIn"
        ref="headerRef"
        class="flex justify-center text-4xl ml-48 px-4 py-4 font-extrabold"
      >
        Welcome to the Finance App!
      </h1>     
      <div class="wrapper">
        <div class=" flex justify-center">
            <RouterLink
              v-if="!auth.isLoggedIn"
              to="/auth"
              class="hover:text-xl duration-150 font-medium italic px-3 py-3 rounded-lg bg-base-200"
            >
              Register or Login Here
            </RouterLink>

            <div v-else class="text-center mt-4">
              <br/><LogOut/>
              <br/><h1>Welcome {{ username }}</h1><br/>
              <button v-if="dashboardButtonVisible" @click="goToDashboard" class="hover:text-xl duration-150 font-medium italic px-3 py-3 rounded-lg bg-base-200">Go To Dashboard</button>
            </div>
        </div>
        <br/>
        <RouterView />
      </div>
    </header>
  </div>
</template>