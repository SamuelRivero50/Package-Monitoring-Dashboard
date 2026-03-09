<template>
  <header class="app-header">
    <div class="header-container">
      <RouterLink to="/" class="header-logo">
        <div class="logo-icon">
          <span class="material-symbols-outlined">package_2</span>
        </div>
        <h1 class="logo-text">PackTrack</h1>
      </RouterLink>

      <nav class="header-nav">
        <RouterLink class="nav-link" to="/">Home</RouterLink>
        <RouterLink v-if="auth.isAuthenticated" class="nav-link" to="/dashboard">Dashboard</RouterLink>
        <RouterLink v-else class="nav-link" to="/login">Sign In</RouterLink>
      </nav>

      <div class="header-actions">
        <RouterLink v-if="!auth.isAuthenticated" to="/login" class="btn-get-started">Get Started</RouterLink>
        <RouterLink v-else to="/dashboard" class="btn-get-started">Dashboard</RouterLink>
        <button class="mobile-menu-btn">
          <span class="material-symbols-outlined">menu</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
</script>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
  border-bottom: 1px solid var(--border-default);
  background: rgba(13, 17, 23, 0.85);
  backdrop-filter: blur(12px);
}

.header-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  background: rgba(45, 212, 191, 0.15);
  color: var(--color-primary);
}

.logo-icon .material-symbols-outlined {
  font-size: 28px;
}

.logo-text {
  font-size: 22px;
  font-weight: 900;
  letter-spacing: -0.5px;
  color: var(--text-primary);
}

.header-nav {
  display: none;
  align-items: center;
  gap: 40px;
}

@media (min-width: 768px) {
  .header-nav {
    display: flex;
  }
}

.nav-link {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--text-secondary);
  transition: color 0.2s;
}

.nav-link:hover,
.nav-link.router-link-exact-active {
  color: var(--color-primary);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.btn-get-started {
  display: none;
  align-items: center;
  justify-content: center;
  padding: 10px 24px;
  border-radius: var(--radius-md);
  background: var(--color-primary);
  color: var(--bg-base);
  font-size: var(--text-sm);
  font-weight: 700;
  transition:
    transform 0.15s,
    opacity 0.15s;
}

.btn-get-started:hover {
  transform: scale(1.05);
}

.btn-get-started:active {
  transform: scale(0.95);
}

@media (min-width: 640px) {
  .btn-get-started {
    display: flex;
  }
}

.mobile-menu-btn {
  color: var(--text-primary);
}

.mobile-menu-btn .material-symbols-outlined {
  font-size: 28px;
}

@media (min-width: 768px) {
  .mobile-menu-btn {
    display: none;
  }
}
</style>
