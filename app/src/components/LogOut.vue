<script setup lang="ts">
import App from '@/App.vue';
import { useRouter } from 'vue-router';
import { supabase } from '@/supabase';
import { useAuthStore } from '@/stores/pinia'

const auth = useAuthStore()
const router = useRouter()

async function onlogout() {
  await supabase.auth.signOut()
  await auth.logout()
  router.push("/auth")
}

</script>

<template>
    <div class="flex justify-center hover:text-xl duration-150">
      <button
        @click="onlogout()"
        class="font-medium flex justify-center italic cursor-pointer border-primary text-lg px-8 py-8 rounded-lg bg-base-200"
      >
        Logout
      </button>
    </div>
</template>