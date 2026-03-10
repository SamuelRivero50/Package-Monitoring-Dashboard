<script setup lang="ts">
/**
 * @author David Hernandez
 * @description Root component. Renders the router view and a global alert banner when active.
*/

// framework
import { ref, watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'

// services
import { SettingsService } from '@/services/settingsService'

// types
import type { SystemAlert } from '@/types'

const route = useRoute()
const alert = ref<SystemAlert | null>(null)
const dismissed = ref(false)

async function loadAlert(): Promise<void> {
  const settings = await SettingsService.getAll()
  alert.value = settings.alert
  dismissed.value = false
}

// Reload alert state on every route change so it stays fresh
watch(() => route.fullPath, loadAlert, { immediate: true })
</script>

<template>
  <!-- Global alert banner -->
  <Transition name="slide">
    <div
      v-if="alert && alert.active && !dismissed"
      class="fixed top-0 left-0 right-0 z-[9999] flex items-center gap-3 px-5 py-3 text-sm font-semibold"
      :class="{
        'bg-[#0c4a6e] text-[#7dd3fc]': alert.type === 'info',
        'bg-[#713f12] text-[#fde68a]': alert.type === 'warning',
        'bg-[#7f1d1d] text-[#fca5a5]': alert.type === 'error',
      }"
    >
      <span class="material-symbols-outlined text-lg shrink-0">
        {{ alert.type === 'error' ? 'error' : alert.type === 'warning' ? 'warning' : 'info' }}
      </span>
      <span class="flex-1 min-w-0 break-words">{{ alert.message }}</span>
      <button
        class="shrink-0 p-1 rounded hover:bg-white/10 transition-colors"
        title="Dismiss"
        @click="dismissed = true"
      >
        <span class="material-symbols-outlined text-lg">close</span>
      </button>
    </div>
  </Transition>

  <div :class="{ 'pt-11': alert && alert.active && !dismissed }">
    <RouterView />
  </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>
