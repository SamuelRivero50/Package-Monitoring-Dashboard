<!-- @author David Hdez, Juan Andrés Young  -->
<script setup lang="ts">
// external imports
import { ref } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";

// internal imports
import { AuthService } from "@/services/AuthService";

const route = useRoute();
const router = useRouter();

const email = ref<string>("");
const password = ref<string>("");
const error = ref<string>("");
const submitting = ref<boolean>(false);

function handleSubmit(): void {
  submitting.value = true;
  error.value = "";

  try {
    AuthService.login(email.value, password.value);
    const redirect = (route.query.redirect as string) || "/dashboard";
    router.push(redirect);
  } catch (err) {
    error.value =
      err instanceof Error ? err.message : "Invalid email or password.";
  } finally {
    submitting.value = false;
  }
}
</script>

<template>
  <div class="min-h-screen bg-canvas text-body">
    <header class="border-b border-wire bg-canvas/80 backdrop-blur-md">
      <div
        class="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between"
      >
        <RouterLink to="/" class="flex items-center gap-2">
          <div
            class="size-10 rounded-lg bg-primary/15 border border-primary/30 text-primary flex items-center justify-center"
          >
            <span class="material-symbols-outlined text-2xl">package_2</span>
          </div>
          <div>
            <h1 class="text-xl font-black tracking-tight">PackTrack</h1>
            <p class="text-[11px] text-faded">Logistics Platform</p>
          </div>
        </RouterLink>

        <RouterLink
          to="/signup"
          class="px-5 py-2 rounded-lg border border-primary/40 text-primary text-sm font-bold hover:bg-primary/10 transition-colors"
        >
          Create Account
        </RouterLink>
      </div>
    </header>

    <main class="min-h-[calc(100vh-82px)] grid lg:grid-cols-2">
      <section
        class="hidden lg:flex flex-col justify-center px-14 py-12 bg-canvas border-r border-wire"
      >
        <div class="max-w-xl space-y-8">
          <span
            class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wide"
          >
            Welcome back
          </span>

          <h2 class="text-5xl font-black tracking-tight leading-tight">
            Sign in and operate your logistics dashboard in real time
          </h2>

          <p class="text-lg text-soft leading-relaxed">
            Track package flow, monitor warehouse capacity, and coordinate your
            team from a single secure workspace.
          </p>

          <div class="space-y-4">
            <div class="flex items-start gap-3">
              <span class="material-symbols-outlined text-primary mt-0.5"
                >check_circle</span
              >
              <p class="text-sm text-soft">
                Operational dashboard with live status indicators.
              </p>
            </div>
            <div class="flex items-start gap-3">
              <span class="material-symbols-outlined text-primary mt-0.5"
                >check_circle</span
              >
              <p class="text-sm text-soft">
                Role-based access and shared activity timeline.
              </p>
            </div>
            <div class="flex items-start gap-3">
              <span class="material-symbols-outlined text-primary mt-0.5"
                >check_circle</span
              >
              <p class="text-sm text-soft">
                Global notifications and maintenance controls.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="flex items-center justify-center px-6 py-10">
        <div
          class="w-full max-w-md bg-panel border border-wire rounded-2xl p-8 space-y-6"
        >
          <div>
            <h2 class="text-2xl font-black tracking-tight">Sign In</h2>
            <p class="text-sm text-faded mt-1">
              Access your PackTrack dashboard.
            </p>
          </div>

          <form class="space-y-4" @submit.prevent="handleSubmit">
            <div class="space-y-2">
              <label
                for="email"
                class="text-sm font-semibold text-soft"
                >Email</label
              >
              <input
                v-model="email"
                type="email"
                id="email"
                required
                placeholder="user@packtrack.io"
                class="w-full bg-sheet border border-wire rounded-xl py-3 px-4 text-sm text-body placeholder:text-faded focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div class="space-y-2">
              <label
                for="password"
                class="text-sm font-semibold text-soft"
                >Password</label
              >
              <input
                v-model="password"
                type="password"
                id="password"
                required
                placeholder="Enter your password"
                class="w-full bg-sheet border border-wire rounded-xl py-3 px-4 text-sm text-body placeholder:text-faded focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div
              v-if="error"
              class="flex items-center gap-2 p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl"
            >
              <span class="material-symbols-outlined text-rose-400 text-lg"
                >error</span
              >
              <p class="text-sm text-rose-300">{{ error }}</p>
            </div>

            <button
              type="submit"
              :disabled="submitting"
              class="w-full bg-primary text-base font-black py-3 rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-50"
            >
              {{ submitting ? "Signing in..." : "Sign In" }}
            </button>
          </form>

          <div class="border-t border-wire-subtle pt-4 space-y-3">
            <p class="text-xs text-faded text-center">Demo credentials</p>
            <p class="text-xs text-soft text-center">
              <span class="text-primary font-mono">alex@packtrack.io</span> /
              <span class="font-mono">admin123</span>
              <span class="text-faded ml-1">(Admin)</span>
            </p>
            <p class="text-xs text-soft text-center">
              <span class="text-primary font-mono">maria@packtrack.io</span> /
              <span class="font-mono">maria123</span>
              <span class="text-faded ml-1">(User)</span>
            </p>
          </div>

          <p class="text-sm text-faded text-center">
            Need an account?
            <RouterLink
              to="/signup"
              class="text-link font-semibold hover:underline"
              >Sign up</RouterLink
            >
          </p>
        </div>
      </section>
    </main>
  </div>
</template>
