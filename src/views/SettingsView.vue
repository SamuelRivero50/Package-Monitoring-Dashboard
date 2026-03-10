<script setup lang="ts">
/**
 * @author David Hernandez
 * @description Admin settings view — global alert banner & maintenance mode.
 */

// components
import AppSidebar from '@/components/AppSidebar.vue'
import DashboardHeader from '@/components/DashboardHeader.vue'

// viewmodel
import { useSettingsViewModel } from '@/viewmodels/useSettingsViewModel'

const {
  isLoading,
  maintenanceMode,
  alertMessage,
  alertType,
  currentAlert,
  saveSuccess,
  toggleMaintenance,
  publishAlert,
  removeAlert,
} = useSettingsViewModel()
</script>

<template>
  <div class="flex min-h-screen bg-canvas">
    <AppSidebar activePage="/settings" />

    <main class="flex-1 flex flex-col min-w-0">
      <DashboardHeader title="System Settings" />

      <!-- Loading skeleton -->
      <div v-if="isLoading" class="p-8">
        <div class="max-w-[640px] bg-panel border border-wire rounded-xl p-8 animate-pulse">
          <div class="h-7 w-48 bg-sheet rounded mb-8"></div>
          <div class="flex flex-col gap-6">
            <div class="h-32 bg-sheet rounded-lg"></div>
            <div class="h-20 bg-sheet rounded-lg"></div>
          </div>
        </div>
      </div>

      <div v-else class="p-8 flex flex-col gap-8 max-w-[640px]">
        <!-- ============ Success toast ============ -->
        <Transition name="fade">
          <div
            v-if="saveSuccess"
            class="flex items-center gap-2 px-4 py-3 rounded-lg bg-[#16a34a]/15 border border-[#16a34a]/30 text-[#4ade80] text-sm font-semibold"
          >
            <span class="material-symbols-outlined text-lg">check_circle</span>
            Changes saved successfully
          </div>
        </Transition>

        <!-- ============ Section: Global Alert ============ -->
        <section class="bg-panel border border-wire rounded-xl p-8">
          <h3 class="text-2xl font-bold mb-2">Global Alert</h3>
          <p class="text-soft text-sm mb-6">Create a banner visible to every logged-in user.</p>

          <!-- Active alert preview -->
          <div
            v-if="currentAlert"
            class="flex items-start gap-3 p-4 rounded-lg border mb-6"
            :class="{
              'bg-[#38bdf8]/10 border-[#38bdf8]/30': currentAlert.type === 'info',
              'bg-[#facc15]/10 border-[#facc15]/30': currentAlert.type === 'warning',
              'bg-[#f87171]/10 border-[#f87171]/30': currentAlert.type === 'error',
            }"
          >
            <span
              class="material-symbols-outlined text-xl mt-0.5 shrink-0"
              :class="{
                'text-[#38bdf8]': currentAlert.type === 'info',
                'text-[#facc15]': currentAlert.type === 'warning',
                'text-[#f87171]': currentAlert.type === 'error',
              }"
            >
              {{
                currentAlert.type === 'error'
                  ? 'error'
                  : currentAlert.type === 'warning'
                    ? 'warning'
                    : 'info'
              }}
            </span>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-body break-words">{{ currentAlert.message }}</p>
              <p class="text-xs text-soft mt-1">
                Active since {{ new Date(currentAlert.createdAt).toLocaleString() }}
              </p>
            </div>
            <button
              class="shrink-0 p-1.5 rounded-lg hover:bg-white/5 transition-colors"
              title="Dismiss alert"
              @click="removeAlert"
            >
              <span class="material-symbols-outlined text-lg text-soft">close</span>
            </button>
          </div>

          <!-- Create new alert -->
          <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-2">
              <label class="text-sm font-semibold" for="alertMsg">Alert Message</label>
              <textarea
                id="alertMsg"
                v-model="alertMessage"
                rows="3"
                maxlength="300"
                placeholder="e.g. Scheduled downtime tonight at 11 PM EST"
                class="bg-sheet border border-wire rounded-lg py-3 px-4 text-body text-sm outline-none resize-none transition-[border-color,box-shadow] duration-200 focus:border-primary focus:shadow-[0_0_0_3px_rgba(45,212,191,0.12)]"
              ></textarea>
              <span class="text-xs text-faded text-right">{{ alertMessage.length }}/300</span>
            </div>

            <div class="flex flex-col gap-2">
              <label class="text-sm font-semibold" for="alertType">Alert Type</label>
              <select
                id="alertType"
                v-model="alertType"
                class="bg-sheet border border-wire rounded-lg py-3 px-4 text-body text-sm outline-none transition-[border-color,box-shadow] duration-200 focus:border-primary focus:shadow-[0_0_0_3px_rgba(45,212,191,0.12)]"
              >
                <option value="info">Info</option>
                <option value="warning">Warning</option>
                <option value="error">Error / Critical</option>
              </select>
            </div>

            <button
              :disabled="!alertMessage.trim()"
              class="w-full py-3.5 rounded-xl bg-primary text-canvas font-black text-base transition-[filter,opacity] duration-200 hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed"
              @click="publishAlert"
            >
              Publish Alert
            </button>
          </div>
        </section>

        <!-- ============ Section: Maintenance Mode ============ -->
        <section class="bg-panel border border-wire rounded-xl p-8">
          <h3 class="text-2xl font-bold mb-2">Maintenance Mode</h3>
          <p class="text-soft text-sm mb-6">
            When enabled, non-admin users are redirected to a maintenance screen and cannot interact
            with the system.
          </p>

          <div class="flex items-center justify-between p-4 bg-sheet rounded-lg">
            <div>
              <p class="font-bold text-sm">
                {{ maintenanceMode ? 'Maintenance is ON' : 'Maintenance is OFF' }}
              </p>
              <p class="text-xs text-soft mt-0.5">
                {{
                  maintenanceMode
                    ? 'Only administrators can access the dashboard.'
                    : 'All authenticated users have normal access.'
                }}
              </p>
            </div>
            <!-- Toggle switch -->
            <button
              class="toggle-track"
              :class="{ active: maintenanceMode }"
              role="switch"
              :aria-checked="maintenanceMode"
              @click="toggleMaintenance"
            >
              <span class="toggle-knob"></span>
            </button>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Toggle switch */
.toggle-track {
  position: relative;
  width: 48px;
  height: 24px;
  border-radius: 9999px;
  background: var(--color-soft);
  flex-shrink: 0;
  transition: background-color 0.2s ease;
}
.toggle-track.active {
  background: var(--color-primary);
}
.toggle-knob {
  position: absolute;
  top: 4px;
  left: 4px;
  width: 16px;
  height: 16px;
  border-radius: 9999px;
  background: #fff;
  transition: transform 0.2s ease;
}
.toggle-track.active .toggle-knob {
  transform: translateX(24px);
}
</style>
