<template>
  <aside
    class="w-64 min-w-[256px] border-r border-wire flex flex-col h-screen sticky top-0 bg-canvas"
  >
    <!-- Brand -->
    <div class="p-6">
      <RouterLink to="/" class="flex items-center gap-2">
        <div class="bg-primary/15 p-2 rounded-lg text-primary flex items-center justify-center">
          <span class="material-symbols-outlined" style="font-size: 24px">package_2</span>
        </div>
        <div>
          <h1 class="font-bold text-base leading-[1.2] tracking-[-0.3px]">Admin Console</h1>
          <p class="text-xs text-soft mt-0.5">System v4.2.0</p>
        </div>
      </RouterLink>
    </div>

    <!-- Nav -->
    <nav class="flex-1 px-4 flex flex-col gap-0.5 mt-4">
      <RouterLink
        v-for="item in navItems.filter((i) => !i.adminOnly || auth.isAdmin)"
        :key="item.path"
        :to="item.path"
        :class="[
          'flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-[background,color] duration-150',
          activePage === item.path
            ? 'bg-primary/15 text-primary font-bold'
            : 'text-soft hover:bg-primary/8 hover:text-primary',
        ]"
      >
        <span class="material-symbols-outlined" style="font-size: 20px">{{ item.icon }}</span>
        <span>{{ item.label }}</span>
      </RouterLink>
    </nav>

    <!-- Footer user card -->
    <div class="p-4 border-t border-wire">
      <div class="flex items-center gap-2 p-2 bg-primary/5 rounded-xl">
        <div
          class="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0"
        >
          <span class="material-symbols-outlined" style="font-size: 16px">person</span>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-xs font-bold truncate">{{ auth.user?.name ?? 'Guest' }}</p>
          <p class="text-[10px] text-soft truncate">{{ auth.user?.email ?? '' }}</p>
        </div>
        <button
          type="button"
          class="p-1 text-soft transition-colors duration-150 hover:text-red-400"
          title="Logout"
          @click="handleLogout"
        >
          <span class="material-symbols-outlined" style="font-size: 16px">logout</span>
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
/**
 * @author Samuel Enrique Rivero Urribarrí, David Hernández Herrera, Juan Andrés Young Hoyos
 * @description Dashboard sidebar with role-based nav items and user session card.
 */

// framework
import { RouterLink, useRouter } from 'vue-router'

// stores
import { useAuthStore } from '@/stores/auth'

defineProps<{
  activePage?: string
}>()

const router = useRouter()
const auth = useAuthStore()

async function handleLogout() {
  await auth.logout()
  router.push('/')
}

const navItems: { path: string; label: string; icon: string; adminOnly?: boolean }[] = [
  { path: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
  { path: '/packages', label: 'Packages', icon: 'inventory_2' },
  { path: '/warehouses', label: 'Warehouses', icon: 'warehouse' },
  { path: '/users', label: 'Users', icon: 'group', adminOnly: true },
  { path: '/settings', label: 'Settings', icon: 'settings', adminOnly: true },
]
</script>
