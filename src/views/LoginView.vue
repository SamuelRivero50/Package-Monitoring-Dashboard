<script setup lang="ts">
/**
 * @author Samuel Rivero
 * @description Login page - email/password authentication. Redirects to dashboard on success.
 */

// framework
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

// stores
import { useAuthStore } from '@/stores/auth'

// components
import AppFooter from '@/components/AppFooter.vue'

const router = useRouter()
const auth = useAuthStore()

const email = ref('')
const password = ref('')
const error = ref('')
const isLoading = ref(false)

async function submitLogin() {
  error.value = ''
  if (!email.value.trim() || !password.value) {
    error.value = 'Email and password are required.'
    return
  }
  isLoading.value = true
  try {
    await auth.login({ email: email.value.trim(), password: password.value })
    const redirect = (router.currentRoute.value.query.redirect as string) || '/dashboard'
    router.push(redirect)
  } catch (e: unknown) {
    const err = e as { status?: number; message?: string }
    error.value = err?.message ?? 'Invalid credentials. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-canvas">
    <!-- Header -->
    <header class="flex items-center justify-between px-6 py-6 border-b border-wire lg:px-20">
      <RouterLink to="/" class="flex items-center gap-2">
        <div class="p-2 bg-primary/15 rounded-lg text-primary flex items-center justify-center">
          <span class="material-symbols-outlined" style="font-size: 24px">package_2</span>
        </div>
        <h1 class="text-[20px] font-bold tracking-[-0.3px]">PackTrack</h1>
      </RouterLink>
      <div class="hidden md:flex items-center gap-4">
        <span class="text-sm text-soft">Don't have an account?</span>
        <RouterLink
          to="/signup"
          class="px-5 py-2 rounded-lg border border-primary text-primary font-semibold text-sm transition-colors duration-200 hover:bg-primary/10"
          >Sign up</RouterLink
        >
      </div>
    </header>

    <!-- Main -->
    <main class="flex-1 flex flex-col lg:flex-row">
      <!-- Left panel -->
      <div
        class="flex flex-col justify-center p-8 lg:w-1/2 lg:px-24 lg:py-16"
        style="
          background: linear-gradient(135deg, #0d1f3c 0%, #0a1628 100%);
          border-right: 1px solid #21262d;
        "
      >
        <div class="max-w-[480px]">
          <h2
            class="font-black text-body leading-[1.1] mb-6"
            style="font-size: clamp(32px, 4vw, 60px)"
          >
            Welcome <span class="text-primary">Back</span>
          </h2>
          <p class="text-soft text-lg mb-10 leading-[1.6]">
            Sign in to access your logistics dashboard. Track packages, manage warehouses, and
            streamline your supply chain.
          </p>
          <div class="flex flex-col gap-6">
            <div class="flex items-start gap-4">
              <span class="material-symbols-outlined text-primary shrink-0 mt-0.5"
                >check_circle</span
              >
              <div>
                <h4 class="font-bold text-body mb-0.5">Real-time tracking</h4>
                <p class="text-sm text-soft">Monitor every movement of your packages.</p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <span class="material-symbols-outlined text-primary shrink-0 mt-0.5"
                >check_circle</span
              >
              <div>
                <h4 class="font-bold text-body mb-0.5">Multi-warehouse support</h4>
                <p class="text-sm text-soft">Manage inventory across locations.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right panel -->
      <div class="flex flex-col justify-center p-8 bg-canvas lg:w-1/2 lg:px-24 lg:py-16">
        <div class="max-w-[400px] mx-auto w-full">
          <div class="mb-8">
            <h2 class="text-[28px] font-bold text-body mb-2">Sign in</h2>
            <p class="text-soft">Enter your credentials to access your account.</p>
          </div>

          <form class="flex flex-col gap-5" @submit.prevent="submitLogin">
            <p
              v-if="error"
              class="px-3 py-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-sm"
            >
              {{ error }}
            </p>

            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium text-soft" for="login-email">Email</label>
              <div class="relative">
                <span
                  class="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-faded"
                  style="font-size: 20px"
                  >mail</span
                >
                <input
                  id="login-email"
                  v-model="email"
                  type="email"
                  placeholder="alex@packtrack.dev"
                  class="w-full py-3.5 pl-12 pr-4 bg-panel border border-wire rounded-xl text-body text-base outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-faded focus:border-primary focus:shadow-[0_0_0_3px_rgba(45,212,191,0.12)]"
                  autocomplete="email"
                />
              </div>
            </div>

            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium text-soft" for="login-password">Password</label>
              <div class="relative">
                <span
                  class="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-faded"
                  style="font-size: 20px"
                  >lock</span
                >
                <input
                  id="login-password"
                  v-model="password"
                  type="password"
                  placeholder="••••••••"
                  class="w-full py-3.5 pl-12 pr-4 bg-panel border border-wire rounded-xl text-body text-base outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-faded focus:border-primary focus:shadow-[0_0_0_3px_rgba(45,212,191,0.12)]"
                  autocomplete="current-password"
                />
              </div>
            </div>

            <button
              type="submit"
              class="w-full bg-primary text-canvas font-semibold py-4 px-6 rounded-xl border-none flex items-center justify-center gap-2 text-base cursor-pointer transition-[filter] duration-200 disabled:opacity-70 disabled:cursor-not-allowed hover:not-disabled:brightness-110"
              :disabled="isLoading"
            >
              <span v-if="isLoading">Signing in...</span>
              <span v-else>Sign in</span>
              <span v-if="!isLoading" class="material-symbols-outlined">arrow_forward</span>
            </button>
          </form>

          <div class="mt-8 pt-8 border-t border-wire flex gap-1 text-sm text-soft">
            <span>Don't have an account?</span>
            <RouterLink to="/signup" class="font-bold text-primary">Sign up</RouterLink>
          </div>
        </div>
      </div>
    </main>

    <AppFooter />
  </div>
</template>
