<template>
  <header class="sticky top-0 z-50 w-full border-b border-wire bg-canvas/85 backdrop-blur-md">
    <div class="max-w-[1280px] mx-auto px-6 h-[72px] flex items-center justify-between">
      <RouterLink to="/" class="flex items-center gap-2">
        <div class="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/15 text-primary">
          <span class="material-symbols-outlined" style="font-size:28px">package_2</span>
        </div>
        <h1 class="text-[22px] font-black tracking-[-0.5px] text-body">PackTrack</h1>
      </RouterLink>

      <nav class="hidden md:flex items-center gap-10">
        <RouterLink
          class="text-sm font-semibold text-soft transition-colors duration-200 hover:text-primary [&.router-link-exact-active]:text-primary"
          to="/"
        >Home</RouterLink>
        <RouterLink
          v-if="auth.isAuthenticated"
          class="text-sm font-semibold text-soft transition-colors duration-200 hover:text-primary [&.router-link-exact-active]:text-primary"
          to="/dashboard"
        >Dashboard</RouterLink>
        <RouterLink
          v-else
          class="text-sm font-semibold text-soft transition-colors duration-200 hover:text-primary [&.router-link-exact-active]:text-primary"
          to="/login"
        >Sign In</RouterLink>
      </nav>

      <div class="flex items-center gap-4">
        <RouterLink
          v-if="!auth.isAuthenticated"
          to="/login"
          class="hidden sm:flex items-center justify-center px-6 py-2.5 rounded-lg bg-primary text-canvas text-sm font-bold transition-transform duration-150 hover:scale-105 active:scale-95"
        >Get Started</RouterLink>
        <RouterLink
          v-else
          to="/dashboard"
          class="hidden sm:flex items-center justify-center px-6 py-2.5 rounded-lg bg-primary text-canvas text-sm font-bold transition-transform duration-150 hover:scale-105 active:scale-95"
        >Dashboard</RouterLink>
        <button class="text-body md:hidden">
          <span class="material-symbols-outlined" style="font-size:28px">menu</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
</script>
