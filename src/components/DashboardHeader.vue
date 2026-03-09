<template>
  <header class="dashHeader">
    <div class="dashHeaderLeft">
      <h2 class="dashHeaderTitle">{{ title }}</h2>
      <div class="dashHeaderSearch">
        <span class="material-symbols-outlined searchIcon">search</span>
        <input class="searchInput" placeholder="Search..." type="text" />
      </div>
    </div>
    <div class="dashHeaderActions">
      <button class="notificationBtn">
        <span class="material-symbols-outlined">notifications</span>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<style scoped>
.dashHeader {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--spacing-xl);
  border-bottom: 1px solid var(--border-default);
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgba(13, 17, 23, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.dashHeaderLeft {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  flex: 1;
}

.dashHeaderTitle {
  font-size: var(--text-lg);
  font-weight: 700;
  letter-spacing: -0.3px;
  white-space: nowrap;
}

.dashHeaderSearch {
  position: relative;
  max-width: 280px;
  width: 100%;
}

.searchIcon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  color: var(--text-muted);
}

.searchInput {
  width: 100%;
  background: rgba(45, 212, 191, 0.05);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  padding: 8px 14px 8px 38px;
  color: var(--text-primary);
  font-size: var(--text-sm);
  outline: none;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}

.searchInput::placeholder {
  color: var(--text-muted);
}

.searchInput:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(45, 212, 191, 0.12);
}

.dashHeaderActions {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.notificationBtn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  background: rgba(45, 212, 191, 0.05);
  color: var(--text-secondary);
  transition:
    color 0.2s,
    background 0.2s;
}

.notificationBtn .material-symbols-outlined {
  font-size: 20px;
}

.notificationBtn:hover {
  color: var(--color-primary);
  background: rgba(45, 212, 191, 0.1);
}


@media (max-width: 640px) {
  .dashHeaderSearch {
    display: none;
  }
}
</style>
