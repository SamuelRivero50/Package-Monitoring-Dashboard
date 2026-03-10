<script setup lang="ts">
import { RouterLink } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen overflow-x-hidden">
    <AppHeader />

    <main class="flex-1">
      <!-- Hero Section -->
      <section
        class="py-20 pb-24 relative overflow-hidden"
        style="background: linear-gradient(135deg, #0d1f3c 0%, #0a2744 50%, #0d2d5a 100%)"
      >
        <div class="max-w-[1280px] mx-auto px-6">
          <div class="grid grid-cols-1 gap-12 items-center lg:grid-cols-2">
            <div class="flex flex-col gap-8 max-w-[600px]">
              <!-- Badge -->
              <div
                class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-[0.05em] w-fit"
              >
                <span class="relative flex w-2 h-2">
                  <span
                    class="absolute inline-flex w-full h-full rounded-full bg-primary opacity-75 animate-ping-custom"
                  ></span>
                  <span class="relative inline-flex w-2 h-2 rounded-full bg-primary"></span>
                </span>
                Next-Gen Logistics Platform
              </div>

              <h2
                class="font-black leading-[1.1] tracking-[-1px] text-body"
                style="font-size: clamp(40px, 5vw, 72px)"
              >
                Track Your Packages <span class="text-primary">Anywhere</span>, Anytime
              </h2>

              <p class="text-lg text-soft leading-[1.7]">
                A comprehensive logistics and warehouse management system designed for modern
                businesses. Streamline your supply chain with real-time insights and AI-powered
                automation.
              </p>

              <div class="flex flex-wrap gap-4">
                <RouterLink
                  to="/signup"
                  class="px-8 py-4 rounded-xl bg-cta text-white text-lg font-bold shadow-[0_8px_24px_rgba(224,123,57,0.25)] transition-[background,transform] duration-200 hover:bg-cta-hover hover:-translate-y-0.5"
                  >Get Started Free</RouterLink
                >
                <RouterLink
                  to="/login"
                  class="px-8 py-4 rounded-xl bg-panel text-body text-lg font-bold border border-wire transition-[background,border-color] duration-200 hover:bg-sheet hover:border-primary hover:text-primary"
                  >Sign in</RouterLink
                >
              </div>
            </div>

            <div class="hidden lg:block">
              <div
                class="aspect-square rounded-2xl overflow-hidden border border-wire bg-panel relative shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
              >
                <div
                  class="absolute inset-0 bg-gradient-to-br from-primary/15 to-transparent z-10"
                ></div>
                <img
                  alt="Logistics Warehouse"
                  class="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuARpb78izFGAo72ZtI8BC-B6g5wjhtjSSJ1YTdNZf3UN42GBPmDf-8urYObtpI1nDZWlauhK0lgN7xo44Eai0esD5IEBmmblOtEV5S7w9zYqZnQ7Izqq6QjK-SvjpPVPamF1Ku-c0xa18rk7dh6p9iB4YbRuEl9pmYW9-RgxVsLgORS95XRjGjpH-xWvW0eWLvTTdNB5PTVRW9-6POTZkxjP39VipVUNMuJNz93BQgF7k-2WtzNi02b8bgfZmLAt0-gSVrntbNPTQ8v"
                />
                <div
                  class="absolute bottom-6 left-6 right-6 px-5 py-5 rounded-xl bg-white/8 backdrop-blur-lg border border-white/15 z-20"
                >
                  <div class="flex items-center justify-between mb-3">
                    <span class="text-white font-bold text-sm">Real-time Fleet Status</span>
                    <span
                      class="text-xs font-bold text-primary bg-primary/20 px-2.5 py-0.5 rounded-md"
                      >Active</span
                    >
                  </div>
                  <div class="h-2 w-full bg-white/15 rounded-full overflow-hidden">
                    <div class="h-full bg-primary rounded-full" style="width: 75%"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Stats Section -->
      <section class="py-12 border-t border-wire border-b border-wire bg-panel">
        <div class="max-w-[1280px] mx-auto px-6">
          <div class="grid grid-cols-2 gap-8 lg:grid-cols-4">
            <div class="flex flex-col items-center text-center gap-1">
              <span class="text-[36px] font-black text-body">10K+</span>
              <span class="text-soft font-medium">Packages Tracked</span>
            </div>
            <div class="flex flex-col items-center text-center gap-1">
              <span class="text-[36px] font-black text-body">50+</span>
              <span class="text-soft font-medium">Warehouses</span>
            </div>
            <div class="flex flex-col items-center text-center gap-1">
              <span class="text-[36px] font-black text-body">200+</span>
              <span class="text-soft font-medium">Global Partners</span>
            </div>
            <div class="flex flex-col items-center text-center gap-1">
              <span class="text-[36px] font-black text-body">99.9%</span>
              <span class="text-soft font-medium">Uptime Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="py-24 px-6 max-w-[1280px] mx-auto">
        <div class="text-center max-w-[700px] mx-auto mb-16">
          <span class="text-primary font-bold uppercase tracking-[0.1em] text-sm block mb-4"
            >Core Features</span
          >
          <h2 class="font-black text-body mb-6" style="font-size: clamp(28px, 4vw, 48px)">
            Why Choose PackTrack?
          </h2>
          <p class="text-lg text-soft">
            Our system offers unparalleled control over your inventory and shipments with features
            designed for scale.
          </p>
        </div>
        <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div
            class="p-8 rounded-xl bg-panel border border-wire transition-[border-color] duration-[250ms] hover:border-primary/35 group"
          >
            <div
              class="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 transition-transform duration-200 group-hover:scale-110"
            >
              <span class="material-symbols-outlined" style="font-size: 28px">location_on</span>
            </div>
            <h4 class="text-[20px] font-bold text-body mb-4">Real-time Tracking</h4>
            <p class="text-soft leading-[1.7]">
              Monitor every movement from dispatch to delivery with granular GPS data and status
              updates.
            </p>
          </div>
          <div
            class="p-8 rounded-xl bg-panel border border-wire transition-[border-color] duration-[250ms] hover:border-primary/35 group"
          >
            <div
              class="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 transition-transform duration-200 group-hover:scale-110"
            >
              <span class="material-symbols-outlined" style="font-size: 28px">inventory_2</span>
            </div>
            <h4 class="text-[20px] font-bold text-body mb-4">Inventory Management</h4>
            <p class="text-soft leading-[1.7]">
              Optimize stock levels with AI-driven analytics and automated replenishment workflows.
            </p>
          </div>
          <div
            class="p-8 rounded-xl bg-panel border border-wire transition-[border-color] duration-[250ms] hover:border-primary/35 group"
          >
            <div
              class="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 transition-transform duration-200 group-hover:scale-110"
            >
              <span class="material-symbols-outlined" style="font-size: 28px">cloud_sync</span>
            </div>
            <h4 class="text-[20px] font-bold text-body mb-4">Cloud Integration</h4>
            <p class="text-soft leading-[1.7]">
              Access your data securely from any device. Seamlessly integrate with your existing ERP
              tools.
            </p>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-24 bg-panel/40">
        <div class="max-w-[1280px] mx-auto px-6">
          <div
            class="rounded-2xl bg-panel border border-wire p-16 relative overflow-hidden lg:p-20"
          >
            <!-- Glow -->
            <div
              class="absolute -top-30 -right-30 w-96 h-96 bg-primary/15 blur-[100px] rounded-full pointer-events-none"
            ></div>
            <div
              class="relative z-10 flex flex-col items-center text-center gap-8 max-w-[800px] mx-auto"
            >
              <h2
                class="font-black text-body leading-[1.15]"
                style="font-size: clamp(28px, 4vw, 56px)"
              >
                Ready to Transform Your Supply Chain?
              </h2>
              <p class="text-[20px] text-soft">
                Join 500+ companies already optimizing their logistics with PackTrack. Scale faster
                and smarter today.
              </p>
              <div class="flex flex-wrap justify-center gap-6 mt-4">
                <RouterLink
                  to="/signup"
                  class="px-10 py-5 rounded-xl bg-primary text-canvas text-[20px] font-black transition-transform duration-150 shadow-[0_8px_24px_rgba(45,212,191,0.2)] hover:scale-105"
                  >Start Free Trial</RouterLink
                >
                <button
                  class="px-10 py-5 rounded-xl bg-transparent border-2 border-body text-body text-[20px] font-black transition-colors duration-200 hover:bg-white/8"
                >
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>
