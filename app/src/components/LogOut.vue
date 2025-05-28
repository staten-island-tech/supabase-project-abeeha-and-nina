<script setup lang="ts">
import { useAuthStore } from '@/stores/pinia'

const auth = useAuthStore()

</script>

<template>
    <div class="flex justify-center hover:text-xl duration-150">
      <button
        @click="auth.logout"
        class="font-medium flex justify-center italic cursor-pointer border-primary text-lg px-8 py-8 rounded-lg bg-base-200"
      >
        Logout
      </button>
    </div>
</template>