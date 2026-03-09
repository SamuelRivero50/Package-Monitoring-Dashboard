<script setup lang="ts">
/**
 * @author Law
 * @description Access denied page shown when a non-admin user tries to reach an admin-only route.
 */
import { useRouter } from 'vue-router'
import AppSidebar from '@/components/AppSidebar.vue'
import DashboardHeader from '@/components/DashboardHeader.vue'

const router = useRouter()

function goBack(): void {
  router.push({ name: 'dashboard' })
}
</script>

<template>
  <div class="pageLayout">
    <AppSidebar />

    <main class="pageMain">
      <DashboardHeader title="Access Denied" />

      <div class="pageContent">
        <div class="denied-card">
          <div class="denied-icon">
            <span class="material-symbols-outlined">shield_lock</span>
          </div>

          <h2 class="denied-title">Access Denied</h2>

          <p class="denied-message">
            You do not have permission to view this page. This area is restricted to
            administrators only.
          </p>

          <button class="denied-btn" type="button" @click="goBack">
            <span class="material-symbols-outlined">arrow_back</span>
            Back to Dashboard
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.pageLayout {
  display: flex;
  min-height: 100vh;
  background: var(--bg-base);
}

.pageMain {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.pageContent {
  padding: var(--spacing-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}

.denied-card {
  text-align: center;
  max-width: 440px;
  background: var(--bg-surface);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl) var(--spacing-xl) var(--spacing-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
}

.denied-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(239, 68, 68, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
}

.denied-icon .material-symbols-outlined {
  font-size: 32px;
  color: #ef4444;
}

.denied-title {
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--text-primary);
}

.denied-message {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: 1.6;
}

.denied-btn {
  margin-top: var(--spacing-sm);
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: 10px 20px;
  border-radius: var(--radius-md);
  background: var(--color-primary);
  color: #0d1117;
  font-weight: 600;
  font-size: var(--text-sm);
  border: none;
  cursor: pointer;
  transition: background 0.15s;
}

.denied-btn:hover {
  background: var(--color-primary-dark);
}

.denied-btn .material-symbols-outlined {
  font-size: 18px;
}
</style>
