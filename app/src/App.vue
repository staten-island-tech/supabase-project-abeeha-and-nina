<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router';
import { gsap } from "gsap"
import { ref, onMounted } from 'vue'
import { useAuthStore } from './stores/pinia';
import ThemeSelector from './components/ThemeSelector.vue'
import { supabase } from './supabase';
import LogOut from './components/LogOut.vue';
import DashboardView from './views/DashboardView.vue';
import Menu from 'primevue/menu';
import router from './router';
import { checkSubmitted } from '@/stores/pinia';

const check = checkSubmitted()
const route = useRoute()
const auth = useAuthStore()
const dashboardButtonVisible = ref<boolean>(true)
const goMainHomeButtonVisible = ref<boolean>(true)
const goProfileButtonVisible = ref<boolean>(true)
const goGraphsButtonVisible = ref<boolean>(true)


const headerRef = ref<HTMLElement | null>(null)

onMounted(() => {
  gsap.from(headerRef.value, {
    y: -50,
    opacity: 0,
    duration: 1,
    ease: "power2.out"
  })
  useAuth()
  check.loadSubmissionState()
})

async function useAuth() {
  const { data } = await supabase.auth.getSession()
  if (data.session) {
    const user = data.session.user;
    await auth.login(user)       
    check.loadSubmissionState()
  }
  
}

function goToDashboard(){
  router.push("/dashboard")
}

function goMainHome(){
  router.push("/main")
}

function goProfile(){
  router.push("/profile")
}

function goGraphs(){
  router.push("/graphs")
}

</script>

<template>
  <Menu>
    
  </Menu>
  <div class="min-h-screen bg-base-100 text-base-content">
    <header>
      <div class="pt-3 flex justify-center">
        <ThemeSelector />
      </div>
      <div class="pt-3 flex justify-center">
      <RouterLink to="/" class="cursor-pointer border-primary text-lg px-3 py-3 rounded-lg hover:text-3xl duration-200 border-4 border-solid bg-base-200">Home</RouterLink>
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
              <br/><h1>Welcome {{ auth.username }}!</h1><br/>
              <div v-if="route.path === '/'">
                <button @click="goToDashboard" class="hover:text-xl duration-150 font-medium px-3 py-3 rounded-lg bg-base-300">Go To Dashboard</button>
                <br/><br/>
                <button v-if="check.hasSubmittedExpense && check.hasSubmittedIncome" @click="goProfile" class="hover:text-xl duration-150 font-medium px-3 py-3 rounded-lg bg-base-300">Go To Your Profile</button>
                <br/><br/>
                <button v-if="check.hasSubmittedExpense && check.hasSubmittedIncome" @click="goMainHome" class="hover:text-xl duration-150 font-medium italic px-3 py-3 rounded-lg bg-base-200">Go To Your Budgeting</button>
                <br/><br/>
                <button v-if="check.hasSubmittedExpense && check.hasSubmittedIncome" @click="goGraphs" class="hover:text-xl duration-150 font-medium italic px-3 py-3 rounded-lg bg-base-200">Go To Your Data</button>                
            </div>
            </div>
        </div>
        <br/>
        <RouterView />
      </div>
    </header>
  </div>
</template>