<template>
  <div class="dropdown dropdown-bottom dropdown-hover flex justify-center pt-5">
    <label tabindex="0" class="btn m-1 text-base-content">
      Theme
      <svg
        width="12"
        height="12"
        class="inline-block h-2 w-2 fill-current opacity-60 ml-2"
        viewBox="0 0 2048 2048"
      >
        <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z" />
      </svg>
    </label>

    <ul
      tabindex="0"
      class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
    >
      <li v-for="theme in themes" :key="theme">
        <label class="cursor-pointer label justify-start gap-2">
          <input
            type="radio"
            class="radio"
            name="theme"
            :value="theme"
            v-model="selectedTheme"
          />
          <span class="label-text capitalize">{{ theme }}</span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

const themes = [
  'default',
  'retro',
  'cyberpunk',
  'valentine',
  'aqua',
  'synthwave'
]

const selectedTheme = ref('default')

onMounted(() => {
  const saved = localStorage.getItem('theme')
  if (saved && themes.includes(saved)) {
    selectedTheme.value = saved
    document.documentElement.setAttribute('data-theme', saved)
  }
})

watch(selectedTheme, (theme) => {
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('theme', theme)
})
</script>