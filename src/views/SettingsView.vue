<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue'
import DashboardHeader from '@/components/DashboardHeader.vue'
</script>

<template>
  <div class="flex min-h-screen bg-canvas">
    <AppSidebar activePage="/settings" />

    <main class="flex-1 flex flex-col min-w-0">
      <DashboardHeader title="System Settings" />

      <div class="p-8">
        <div class="max-w-[640px] bg-panel border border-wire rounded-xl p-8">
          <h3 class="text-2xl font-bold mb-8">General Configuration</h3>

          <div class="flex flex-col gap-6">
            <!-- System Name -->
            <div class="flex flex-col gap-2">
              <label class="text-sm font-semibold" for="systemName">System Name</label>
              <input
                id="systemName"
                class="bg-sheet border border-wire rounded-lg py-3 px-4 text-body text-sm outline-none transition-[border-color,box-shadow] duration-200 focus:border-primary focus:shadow-[0_0_0_3px_rgba(45,212,191,0.12)]"
                type="text"
                value="PackTrack Logistics v4"
              />
            </div>

            <!-- Maintenance Mode -->
            <div class="flex items-center justify-between p-4 bg-sheet rounded-lg">
              <div>
                <p class="font-bold text-sm">Maintenance Mode</p>
                <p class="text-xs text-soft mt-0.5">Restricts user access while updating</p>
              </div>
              <div class="w-12 h-6 bg-soft rounded-full relative cursor-pointer transition-colors duration-200 shrink-0">
                <div class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200"></div>
              </div>
            </div>

            <!-- Save -->
            <button class="w-full py-3.5 rounded-xl bg-primary text-canvas font-black text-base transition-[filter] duration-200 mt-2 hover:brightness-110">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
