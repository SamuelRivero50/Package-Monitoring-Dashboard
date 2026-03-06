<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue'
import DashboardHeader from '@/components/DashboardHeader.vue'
</script>

<template>
  <div class="pageLayout">
    <AppSidebar activePage="/settings" />

    <main class="pageMain">
      <DashboardHeader title="System Settings" />

      <div class="pageContent">
        <div class="settingsCard">
          <h3 class="settingsTitle">General Configuration</h3>

          <div class="settingsForm">
            <!-- System Name -->
            <div class="formGroup">
              <label class="formLabel" for="systemName">System Name</label>
              <input id="systemName" class="formInput" type="text" value="PackTrack Logistics v4" />
            </div>

            <!-- Maintenance Mode -->
            <div class="toggleRow">
              <div>
                <p class="toggleTitle">Maintenance Mode</p>
                <p class="toggleDesc">Restricts user access while updating</p>
              </div>
              <div class="toggleSwitch">
                <div class="toggleThumb"></div>
              </div>
            </div>

            <!-- Save -->
            <button class="saveBtn">Save Changes</button>
          </div>
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
}

/* ---- Settings Card ---- */
.settingsCard {
  max-width: 640px;
  background: var(--bg-surface);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
}

.settingsTitle {
  font-size: var(--text-xl);
  font-weight: 700;
  margin-bottom: var(--spacing-xl);
}

.settingsForm {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

/* ---- Form group ---- */
.formGroup {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.formLabel {
  font-size: var(--text-sm);
  font-weight: 600;
}

.formInput {
  background: var(--bg-elevated);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  padding: 12px var(--spacing-md);
  color: var(--text-primary);
  font-size: var(--text-sm);
  outline: none;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}

.formInput:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(45, 212, 191, 0.12);
}

/* ---- Toggle row ---- */
.toggleRow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md);
  background: var(--bg-elevated);
  border-radius: var(--radius-md);
}

.toggleTitle {
  font-weight: 700;
  font-size: var(--text-sm);
}

.toggleDesc {
  font-size: var(--text-xs);
  color: var(--text-secondary);
  margin-top: 2px;
}

.toggleSwitch {
  width: 48px;
  height: 24px;
  background: var(--text-secondary);
  border-radius: 9999px;
  position: relative;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.2s;
}

.toggleThumb {
  position: absolute;
  left: 4px;
  top: 4px;
  width: 16px;
  height: 16px;
  background: #fff;
  border-radius: 9999px;
  transition: transform 0.2s;
}

/* ---- Save button ---- */
.saveBtn {
  width: 100%;
  padding: 14px;
  border-radius: var(--radius-lg);
  background: var(--color-primary);
  color: var(--bg-base);
  font-weight: 900;
  font-size: var(--text-base);
  transition: filter 0.2s;
  margin-top: var(--spacing-sm);
}

.saveBtn:hover {
  filter: brightness(1.1);
}
</style>
