<script setup lang="ts">
import { RouterLink } from 'vue-router'
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-canvas">
    <!-- Header -->
    <header class="flex items-center justify-between px-6 py-6 border-b border-wire lg:px-20">
      <RouterLink to="/" class="flex items-center gap-2">
        <div class="p-2 bg-primary/15 rounded-lg text-primary flex items-center justify-center">
          <span class="material-symbols-outlined" style="font-size:24px">package_2</span>
        </div>
        <h1 class="text-[20px] font-bold tracking-[-0.3px]">PackTrack</h1>
      </RouterLink>
      <div class="hidden md:flex items-center gap-4">
        <span class="text-sm text-soft">Already have an account?</span>
        <RouterLink
          to="/login"
          class="px-5 py-2 rounded-lg border border-primary text-primary font-semibold text-sm transition-colors duration-200 hover:bg-primary/10"
        >Sign in</RouterLink>
      </div>
    </header>

    <!-- Main -->
    <main class="flex-1 flex flex-col lg:flex-row">
      <!-- Left panel -->
      <div
        class="flex flex-col justify-center p-8 lg:w-1/2 lg:px-24 lg:py-16"
        style="background: linear-gradient(135deg, #0d1f3c 0%, #0a1628 100%); border-right: 1px solid #21262d;"
      >
        <div class="max-w-[480px]">
          <h2 class="font-black text-body leading-[1.1] mb-6" style="font-size: clamp(32px, 4vw, 60px)">
            Start Your <span class="text-primary">Journey</span>
          </h2>
          <p class="text-soft text-lg mb-10 leading-[1.6]">
            The next generation of logistics management. Join thousands of companies streamlining
            their supply chain today.
          </p>

          <div class="flex flex-col gap-6">
            <div class="flex items-start gap-4">
              <span class="material-symbols-outlined text-primary shrink-0 mt-0.5">check_circle</span>
              <div>
                <h4 class="font-bold text-body mb-0.5">Real-time tracking updates</h4>
                <p class="text-sm text-soft">Monitor every movement of your fleet in real-time with GPS integration.</p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <span class="material-symbols-outlined text-primary shrink-0 mt-0.5">check_circle</span>
              <div>
                <h4 class="font-bold text-body mb-0.5">Multiple carrier support</h4>
                <p class="text-sm text-soft">Connect with DHL, FedEx, UPS and 50+ regional carriers seamlessly.</p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <span class="material-symbols-outlined text-primary shrink-0 mt-0.5">check_circle</span>
              <div>
                <h4 class="font-bold text-body mb-0.5">Warehouse management</h4>
                <p class="text-sm text-soft">Advanced inventory control and space optimization tools.</p>
              </div>
            </div>
          </div>

          <!-- Promo card -->
          <div class="mt-16 relative rounded-2xl overflow-hidden aspect-video border border-primary/20">
            <div class="absolute inset-0 bg-gradient-to-t from-canvas/85 to-transparent z-10"></div>
            <div class="absolute bottom-4 left-4 z-20">
              <p class="font-semibold text-white">Global Distribution Dashboard</p>
              <p class="text-xs text-primary">Live Data View</p>
            </div>
            <img
              class="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRRU9lT5CC1ffZB-dmlHA7Epo11N92ey4eINyLW2jaW_Tp2FBsKlX0ZVBEAycGa7CBKB3MUY_PAz9OUvX8-_Lak7EgTrYfmn-aKjXEPc2ODyNKF4JxrPfRtm4yGnANV1eWfRD8xBtrJc5IIvHIR_rYLjGU9rxhCAQ_5oDCmBevizaPDTMprURHSnwl7CIGq-e4qL63ec0PtGbHs6RiOS8SnwkQCjzhkusaBSRwbHO0Qtis1rI3zIeufOybOeHwF98m_Bt9ZsvIFhTg"
              alt="Dashboard preview"
            />
          </div>
        </div>
      </div>

      <!-- Right panel -->
      <div class="flex flex-col justify-center p-8 bg-canvas lg:w-1/2 lg:px-24 lg:py-16">
        <div class="max-w-[480px] mx-auto w-full">
          <div class="mb-8">
            <h2 class="text-[28px] font-bold text-body mb-2">Create an account</h2>
            <p class="text-soft">Join the PackTrack network and start optimizing.</p>
          </div>

          <form class="flex flex-col gap-5">
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium text-soft">Full Name</label>
              <div class="relative">
                <span class="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-faded" style="font-size:20px">person</span>
                <input
                  type="text"
                  placeholder="John Doe"
                  class="w-full py-3.5 pl-12 pr-4 bg-canvas border border-wire rounded-xl text-body text-base outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-faded focus:border-primary focus:shadow-[0_0_0_3px_rgba(45,212,191,0.12)]"
                />
              </div>
            </div>

            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium text-soft">Email Address</label>
              <div class="relative">
                <span class="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-faded" style="font-size:20px">mail</span>
                <input
                  type="email"
                  placeholder="john@company.com"
                  class="w-full py-3.5 pl-12 pr-4 bg-canvas border border-wire rounded-xl text-body text-base outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-faded focus:border-primary focus:shadow-[0_0_0_3px_rgba(45,212,191,0.12)]"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div class="flex flex-col gap-2">
                <label class="text-sm font-medium text-soft">Password</label>
                <div class="relative">
                  <span class="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-faded" style="font-size:20px">lock</span>
                  <input
                    type="password"
                    placeholder="••••••••"
                    class="w-full py-3.5 pl-12 pr-4 bg-canvas border border-wire rounded-xl text-body text-base outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-faded focus:border-primary focus:shadow-[0_0_0_3px_rgba(45,212,191,0.12)]"
                  />
                </div>
              </div>
              <div class="flex flex-col gap-2">
                <label class="text-sm font-medium text-soft">Confirm Password</label>
                <div class="relative">
                  <span class="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-faded" style="font-size:20px">verified_user</span>
                  <input
                    type="password"
                    placeholder="••••••••"
                    class="w-full py-3.5 pl-12 pr-4 bg-canvas border border-wire rounded-xl text-body text-base outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-faded focus:border-primary focus:shadow-[0_0_0_3px_rgba(45,212,191,0.12)]"
                  />
                </div>
              </div>
            </div>

            <div class="flex items-center gap-2 py-2">
              <input
                type="checkbox"
                id="terms"
                class="w-5 h-5 rounded-md border border-wire bg-transparent accent-primary cursor-pointer"
              />
              <label for="terms" class="text-sm text-soft">
                I agree to the
                <a href="#" class="text-primary hover:underline">Terms of Service</a> and
                <a href="#" class="text-primary hover:underline">Privacy Policy</a>
              </label>
            </div>

            <button
              type="submit"
              class="w-full bg-[#21262d] text-body font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-2 text-base transition-[transform,background] duration-200 active:scale-[0.98] hover:bg-[#2d333b]"
            >
              <span>Create Account</span>
              <span class="material-symbols-outlined">arrow_forward</span>
            </button>
          </form>

          <div class="flex gap-1 text-sm text-soft mt-4 lg:hidden">
            <span>Already have an account?</span>
            <RouterLink to="/login" class="font-bold text-primary">Sign in</RouterLink>
          </div>
        </div>
      </div>
    </main>

    <AppFooter />
  </div>
</template>
