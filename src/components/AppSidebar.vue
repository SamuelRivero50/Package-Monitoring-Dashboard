<template>
  <aside class="sidebar">
    <div class="sidebar-brand">
      <RouterLink to="/" class="brand-link">
        <div class="brand-icon">
          <span class="material-symbols-outlined">package_2</span>
        </div>
        <div>
          <h1 class="brand-name">Admin Console</h1>
          <p class="brand-version">System v4.2.0</p>
        </div>
      </RouterLink>
    </div>

    <nav class="sidebar-nav">
      <RouterLink
        v-for="item in navItems.filter((i) => !i.adminOnly || auth.isAdmin)"
        :key="item.path"
        :to="item.path"
        :class="['nav-item', { active: activePage === item.path }]"
      >
        <span class="material-symbols-outlined">{{ item.icon }}</span>
        <span>{{ item.label }}</span>
      </RouterLink>
    </nav>

    <div class="sidebar-footer">
      <div class="user-card">
        <div class="user-avatar-sm">
          <span class="material-symbols-outlined">person</span>
        </div>
        <div class="user-card-info">
          <p class="user-card-name">{{ auth.user?.name ?? 'Guest' }}</p>
          <p class="user-card-email">{{ auth.user?.email ?? '' }}</p>
        </div>
        <button type="button" class="logout-icon" title="Logout" @click="handleLogout">
          <span class="material-symbols-outlined">logout</span>
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
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
  { path: '/carriers', label: 'Companies', icon: 'domain' },
  { path: '/users', label: 'Users', icon: 'group', adminOnly: true },
  { path: '/settings', label: 'Settings', icon: 'settings', adminOnly: true },
]
</script>

<style scoped>
.sidebar {
  width: 256px;
  min-width: 256px;
  border-right: 1px solid var(--border-default);
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: sticky;
  top: 0;
  background: var(--bg-base);
}

.sidebar-brand {
  padding: var(--spacing-lg);
}

.brand-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.brand-icon {
  background: rgba(45, 212, 191, 0.15);
  padding: 8px;
  border-radius: var(--radius-md);
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
}

.brand-icon .material-symbols-outlined {
  font-size: 24px;
}

.brand-name {
  font-weight: 700;
  font-size: var(--text-base);
  line-height: 1.2;
  letter-spacing: -0.3px;
}

.brand-version {
  font-size: var(--text-xs);
  color: var(--text-secondary);
  margin-top: 2px;
}

.sidebar-nav {
  flex: 1;
  padding: 0 var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: var(--spacing-md);
}

.nav-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: 10px 14px;
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  font-size: var(--text-sm);
  font-weight: 500;
  transition:
    background 0.15s,
    color 0.15s;
}

.nav-item .material-symbols-outlined {
  font-size: 20px;
}

.nav-item:hover {
  background: rgba(45, 212, 191, 0.08);
  color: var(--color-primary);
}

.nav-item.active {
  background: rgba(45, 212, 191, 0.15);
  color: var(--color-primary);
  font-weight: 700;
}

.sidebar-footer {
  padding: var(--spacing-md);
  border-top: 1px solid var(--border-default);
}

.user-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: 8px;
  background: rgba(45, 212, 191, 0.05);
  border-radius: var(--radius-lg);
}

.user-avatar-sm {
  width: 32px;
  height: 32px;
  border-radius: 9999px;
  background: rgba(45, 212, 191, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  flex-shrink: 0;
}

.user-avatar-sm .material-symbols-outlined {
  font-size: 16px;
}

.user-card-info {
  flex: 1;
  min-width: 0;
}

.user-card-name {
  font-size: var(--text-xs);
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-card-email {
  font-size: 10px;
  color: var(--text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.logout-icon {
  padding: 4px;
  background: transparent;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  transition: color 0.15s;
}

.logout-icon .material-symbols-outlined {
  font-size: 16px;
}

.logout-icon:hover {
  color: #f87171;
}
</style>
