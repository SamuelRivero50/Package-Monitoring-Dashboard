<!-- @author David Hdez -->
<script setup lang="ts">
// external imports
import { computed } from "vue";
import { RouterLink } from "vue-router";

// internal imports
import { AuthService } from "@/services/AuthService";

const isAuthenticated = computed(() => AuthService.isAuthenticated());

const primaryActionLabel = computed(() =>
  isAuthenticated.value ? "Open Dashboard" : "Get Started",
);
const primaryActionPath = computed(() =>
  isAuthenticated.value ? "/dashboard" : "/signup",
);
const secondaryActionPath = computed(() =>
  isAuthenticated.value ? "/packages" : "/login",
);
const secondaryActionLabel = computed(() =>
  isAuthenticated.value ? "Track Packages" : "Sign In",
);
</script>

<template>
  <div class="min-h-screen bg-base text-text-primary">
    <header
      class="sticky top-0 z-40 border-b border-border-default bg-base/80 backdrop-blur-md"
    >
      <div
        class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between"
      >
        <RouterLink to="/" class="flex items-center gap-3">
          <div
            class="size-10 rounded-lg bg-primary/15 border border-primary/30 text-primary flex items-center justify-center"
          >
            <span class="material-symbols-outlined text-2xl">package_2</span>
          </div>
          <h1 class="text-2xl font-black tracking-tight">PackTrack</h1>
        </RouterLink>

        <nav class="hidden md:flex items-center gap-8">
          <RouterLink
            to="/"
            class="text-sm font-semibold text-text-secondary hover:text-primary transition-colors"
            >Home</RouterLink
          >
          <RouterLink
            to="/dashboard"
            class="text-sm font-semibold text-text-secondary hover:text-primary transition-colors"
            >Dashboard</RouterLink
          >
          <RouterLink
            to="/login"
            class="text-sm font-semibold text-text-secondary hover:text-primary transition-colors"
            >Sign In</RouterLink
          >
        </nav>

        <RouterLink
          :to="primaryActionPath"
          class="px-6 py-2.5 rounded-xl bg-primary text-base font-black text-sm hover:bg-primary-dark transition-colors"
        >
          {{ primaryActionLabel }}
        </RouterLink>
      </div>
    </header>

    <main>
      <section
        class="relative py-20 lg:py-28 overflow-hidden border-b border-border-default"
      >
        <div
          class="absolute -top-36 -right-20 w-96 h-96 rounded-full bg-primary/10 blur-[80px]"
        ></div>
        <div
          class="absolute -bottom-44 -left-20 w-96 h-96 rounded-full bg-cta/10 blur-[100px]"
        ></div>

        <div
          class="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center relative"
        >
          <div class="space-y-8">
            <span
              class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wide"
            >
              Next logistics platform
            </span>

            <h2
              class="text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight max-w-xl"
            >
              Track every shipment with live warehouse intelligence
            </h2>

            <p class="text-lg text-text-secondary max-w-xl leading-relaxed">
              Keep your operations in sync with package monitoring, warehouse
              utilization insights, and role-based workflows in one command
              center.
            </p>

            <div class="flex flex-wrap gap-4">
              <RouterLink
                :to="primaryActionPath"
                class="px-8 py-4 rounded-xl bg-cta text-base font-black hover:bg-cta-hover transition-colors"
              >
                {{ primaryActionLabel }}
              </RouterLink>
              <RouterLink
                :to="secondaryActionPath"
                class="px-8 py-4 rounded-xl border border-border-default bg-surface text-text-primary font-black hover:border-primary/50 hover:text-primary transition-colors"
              >
                {{ secondaryActionLabel }}
              </RouterLink>
            </div>
          </div>

          <div class="relative">
            <div
              class="rounded-3xl overflow-hidden border border-border-default bg-surface shadow-[0_20px_70px_rgba(0,0,0,0.35)]"
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuARpb78izFGAo72ZtI8BC-B6g5wjhtjSSJ1YTdNZf3UN42GBPmDf-8urYObtpI1nDZWlauhK0lgN7xo44Eai0esD5IEBmmblOtEV5S7w9zYqZnQ7Izqq6QjK-SvjpPVPamF1Ku-c0xa18rk7dh6p9iB4YbRuEl9pmYW9-RgxVsLgORS95XRjGjpH-xWvW0eWLvTTdNB5PTVRW9-6POTZkxjP39VipVUNMuJNz93BQgF7k-2WtzNi02b8bgfZmLAt0-gSVrntbNPTQ8v"
                alt="PackTrack logistics operations"
                class="w-full h-105 object-cover"
              />
              <div
                class="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-base/75 backdrop-blur-sm border border-border-default"
              >
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-bold">Live Network</p>
                  <span class="text-[11px] text-primary font-black uppercase"
                    >Operational</span
                  >
                </div>
                <div class="h-2 rounded-full bg-elevated overflow-hidden">
                  <div class="h-full w-[78%] bg-primary"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="py-12 border-b border-border-default bg-surface/35">
        <div
          class="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <div class="text-center">
            <p class="text-4xl font-black text-primary">10K+</p>
            <p class="text-sm text-text-secondary mt-2">Packages tracked</p>
          </div>
          <div class="text-center">
            <p class="text-4xl font-black text-primary">50+</p>
            <p class="text-sm text-text-secondary mt-2">Warehouse hubs</p>
          </div>
          <div class="text-center">
            <p class="text-4xl font-black text-primary">200+</p>
            <p class="text-sm text-text-secondary mt-2">Connected partners</p>
          </div>
          <div class="text-center">
            <p class="text-4xl font-black text-primary">99.9%</p>
            <p class="text-sm text-text-secondary mt-2">Platform uptime</p>
          </div>
        </div>
      </section>

      <section class="py-20">
        <div class="max-w-7xl mx-auto px-6">
          <div class="max-w-2xl mb-12">
            <p
              class="text-primary text-xs font-black uppercase tracking-[0.2em] mb-3"
            >
              Core Features
            </p>
            <h3 class="text-4xl font-black tracking-tight">
              Built for modern logistics teams
            </h3>
          </div>

          <div class="grid md:grid-cols-3 gap-6">
            <article
              class="bg-surface border border-border-default rounded-2xl p-7 hover:border-primary/40 transition-colors"
            >
              <div
                class="size-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center mb-5"
              >
                <span class="material-symbols-outlined">location_on</span>
              </div>
              <h4 class="text-xl font-black mb-3">Real-time tracking</h4>
              <p class="text-sm text-text-secondary leading-relaxed">
                Monitor route updates from dispatch to delivery with detailed
                timeline logs.
              </p>
            </article>

            <article
              class="bg-surface border border-border-default rounded-2xl p-7 hover:border-primary/40 transition-colors"
            >
              <div
                class="size-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center mb-5"
              >
                <span class="material-symbols-outlined">inventory_2</span>
              </div>
              <h4 class="text-xl font-black mb-3">Package command center</h4>
              <p class="text-sm text-text-secondary leading-relaxed">
                Filter, prioritize, and resolve shipment exceptions with
                contextual activity history.
              </p>
            </article>

            <article
              class="bg-surface border border-border-default rounded-2xl p-7 hover:border-primary/40 transition-colors"
            >
              <div
                class="size-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center mb-5"
              >
                <span class="material-symbols-outlined">warehouse</span>
              </div>
              <h4 class="text-xl font-black mb-3">Warehouse visibility</h4>
              <p class="text-sm text-text-secondary leading-relaxed">
                Track capacity utilization and maintenance status across all
                regional hubs.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section class="py-20 bg-surface border-y border-border-default">
        <div class="max-w-5xl mx-auto px-6">
          <div
            class="rounded-3xl border border-primary/25 bg-hero p-10 lg:p-14 text-center space-y-6"
          >
            <h3 class="text-4xl lg:text-5xl font-black tracking-tight">
              Ready to optimize your logistics flow?
            </h3>
            <p class="text-text-secondary text-lg max-w-3xl mx-auto">
              Join teams already using PackTrack to coordinate packages and
              warehouses with one operational view.
            </p>
            <div class="flex flex-wrap justify-center gap-4">
              <RouterLink
                :to="primaryActionPath"
                class="px-8 py-3 rounded-xl bg-primary text-base font-black hover:bg-primary-dark transition-colors"
              >
                {{ primaryActionLabel }}
              </RouterLink>
              <RouterLink
                to="/login"
                class="px-8 py-3 rounded-xl border border-border-default text-text-primary font-black hover:border-primary/50 hover:text-primary transition-colors"
              >
                Sign In
              </RouterLink>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="py-10 border-t border-border-default">
      <div
        class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-4 md:gap-6 items-center justify-between"
      >
        <p class="text-sm text-text-muted">
          © 2026 PackTrack Systems. All rights reserved.
        </p>
        <div class="flex gap-5 text-sm text-text-secondary">
          <span>Privacy</span>
          <span>Terms</span>
          <span>Support</span>
        </div>
      </div>
    </footer>
  </div>
</template>
