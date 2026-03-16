<!-- @author David Hdez, Juan Andrés Young  -->
<script setup lang="ts">
// external imports
import { computed } from "vue";
import { RouterLink, RouterView, useRoute, useRouter } from "vue-router";

// internal imports
import { AuthService } from "@/services/AuthService";
import { SettingsService } from "@/services/SettingsService";

const route = useRoute();
const router = useRouter();

const isAuthenticated = computed(() => AuthService.isAuthenticated());
const showAuthenticatedLayout = computed(
  () => Boolean(route.meta.requiresAuth) && isAuthenticated.value,
);
const currentUser = computed(() => AuthService.getCurrentUser());
const userNotificationMessage = computed(() =>
  SettingsService.getUserNotificationMessage(),
);
const showUserNotification = computed(
  () =>
    currentUser.value?.role === "User" &&
    SettingsService.isUserNotificationEnabled() &&
    userNotificationMessage.value.length > 0,
);

function isRouteGroupActive(groupName: string): boolean {
  const currentRouteName = route.name;

  if (typeof currentRouteName !== "string") {
    return false;
  }

  return (
    currentRouteName === groupName ||
    currentRouteName.startsWith(`${groupName}.`)
  );
}

function handleLogout(): void {
  AuthService.logout();
  router.push({ name: "login" });
}
</script>

<template>
  <div class="bg-canvas text-body min-h-screen font-[Inter]">
    <!-- Authenticated layout -->
    <div v-if="showAuthenticatedLayout" class="flex h-screen overflow-hidden">
      <!-- sidebar -->
      <aside
        class="w-64 shrink-0 border-r border-wire bg-panel hidden md:flex flex-col h-screen sticky top-0"
      >
        <div class="p-6 flex items-center">
          <RouterLink to="/dashboard" class="flex items-center gap-2">
            <div
              class="bg-primary/15 border border-primary/25 size-10 rounded-lg text-primary flex items-center justify-center"
            >
              <span class="material-symbols-outlined text-2xl leading-6 block"
                >package_2</span
              >
            </div>
            <div class="flex flex-col leading-none">
              <h1 class="text-lg font-black tracking-tight text-body">
                PackTrack
              </h1>
              <p class="text-faded text-[11px] font-medium mt-1">
                Logistics v1.0.0
              </p>
            </div>
          </RouterLink>
        </div>

        <nav class="flex-1 px-4 space-y-1 mt-4">
          <RouterLink
            to="/dashboard"
            class="flex items-center gap-3 px-3 py-2 rounded-lg border transition-colors"
            :class="
              isRouteGroupActive('dashboard')
                ? 'bg-primary/15 text-primary border-primary/30'
                : 'text-soft border-transparent hover:bg-primary/10 hover:text-primary'
            "
          >
            <span class="material-symbols-outlined">dashboard</span>
            <span class="text-sm font-medium">Overview</span>
          </RouterLink>

          <RouterLink
            to="/packages"
            class="flex items-center gap-3 px-3 py-2 rounded-lg border transition-colors"
            :class="
              isRouteGroupActive('packages')
                ? 'bg-packages/15 text-packages border-packages/30'
                : 'text-soft border-transparent hover:bg-packages/10 hover:text-packages'
            "
          >
            <span class="material-symbols-outlined">inventory_2</span>
            <span class="text-sm font-medium">Packages</span>
          </RouterLink>

          <RouterLink
            to="/warehouses"
            class="flex items-center gap-3 px-3 py-2 rounded-lg border transition-colors"
            :class="
              isRouteGroupActive('warehouses')
                ? 'bg-warehouses/15 text-warehouses border-warehouses/30'
                : 'text-soft border-transparent hover:bg-warehouses/10 hover:text-warehouses'
            "
          >
            <span class="material-symbols-outlined">warehouse</span>
            <span class="text-sm font-medium">Warehouses</span>
          </RouterLink>

          <RouterLink
            v-if="AuthService.isAdmin()"
            to="/users"
            class="flex items-center gap-3 px-3 py-2 rounded-lg border transition-colors"
            :class="
              isRouteGroupActive('users')
                ? 'bg-users-icon/15 text-users-icon border-users-icon/30'
                : 'text-soft border-transparent hover:bg-users-icon/10 hover:text-users-icon'
            "
          >
            <span class="material-symbols-outlined">group</span>
            <span class="text-sm font-medium">Users</span>
          </RouterLink>

          <RouterLink
            v-if="AuthService.isAdmin()"
            to="/settings"
            class="flex items-center gap-3 px-3 py-2 rounded-lg border transition-colors"
            :class="
              isRouteGroupActive('settings')
                ? 'bg-primary/15 text-primary border-primary/30'
                : 'text-soft border-transparent hover:bg-primary/10 hover:text-primary'
            "
          >
            <span class="material-symbols-outlined">settings</span>
            <span class="text-sm font-medium">Settings</span>
          </RouterLink>
        </nav>

        <div class="p-4 border-t border-wire">
          <div class="flex items-center gap-3 p-2 bg-sheet rounded-xl">
            <div
              class="size-8 rounded-full bg-primary/30 flex items-center justify-center text-primary"
            >
              <span class="material-symbols-outlined text-sm">person</span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-xs font-bold truncate text-body">
                {{ AuthService.getCurrentUser()?.name }}
              </p>
              <p class="text-[10px] text-faded truncate">
                {{ AuthService.getCurrentUser()?.email }}
              </p>
            </div>
          </div>
        </div>
      </aside>

      <!-- main content area -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <!-- top header -->
        <header
          class="h-16 flex items-center justify-between px-8 border-b border-wire sticky top-0 bg-canvas/80 backdrop-blur-md z-10"
        >
          <div class="flex items-center gap-4 flex-1">
            <h2 class="text-lg font-bold tracking-tight text-body">
              {{ $route.meta.title }}
            </h2>
          </div>
          <div class="flex items-center gap-3">
            <button
              class="size-10 flex items-center justify-center rounded-lg bg-sheet text-soft hover:text-rose-400 transition-colors"
              @click="handleLogout"
            >
              <span class="material-symbols-outlined">logout</span>
            </button>
          </div>
        </header>

        <div
          v-if="showUserNotification"
          class="mx-8 mt-4 px-4 py-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-start gap-2"
        >
          <span class="material-symbols-outlined text-sm mt-0.5">campaign</span>
          <div>
            <p class="text-xs font-bold uppercase tracking-wide">Notice</p>
            <p class="text-sm leading-relaxed">{{ userNotificationMessage }}</p>
          </div>
        </div>

        <!-- main content -->
        <main class="flex-1 overflow-y-auto p-8">
          <RouterView />
        </main>
      </div>
    </div>

    <!-- Guest layout (Login) -->
    <div v-else>
      <RouterView />
    </div>
  </div>
</template>
