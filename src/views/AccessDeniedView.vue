<script setup lang="ts">
/**
 * @author Law
 * @description Access denied page shown when a non-admin user tries to reach an admin-only route.
 */

// framework
import { useRouter } from 'vue-router'

// components
import AppSidebar from '@/components/AppSidebar.vue'
import DashboardHeader from '@/components/DashboardHeader.vue'

const router = useRouter()

function goBack(): void {
  router.push({ name: 'dashboard' })
}
</script>

<template>
  <div class="flex min-h-screen bg-canvas">
    <AppSidebar />

    <main class="flex-1 flex flex-col min-w-0">
      <DashboardHeader title="Access Denied" />

      <div class="p-8 flex items-center justify-center flex-1">
        <div
          class="text-center max-w-[440px] bg-panel border border-wire rounded-xl px-8 pt-8 pb-6 flex flex-col items-center gap-4"
        >
          <div class="w-16 h-16 rounded-full bg-red-500/12 flex items-center justify-center">
            <span class="material-symbols-outlined text-red-500" style="font-size: 32px"
              >shield_lock</span
            >
          </div>

          <h2 class="text-2xl font-bold text-body">Access Denied</h2>

          <p class="text-sm text-soft leading-[1.6]">
            You do not have permission to view this page. This area is restricted to administrators
            only.
          </p>

          <button
            class="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-canvas font-semibold text-sm border-none cursor-pointer transition-colors duration-150 hover:bg-primary-dark"
            type="button"
            @click="goBack"
          >
            <span class="material-symbols-outlined" style="font-size: 18px">arrow_back</span>
            Back to Dashboard
          </button>
        </div>
      </div>
    </main>
  </div>
</template>
