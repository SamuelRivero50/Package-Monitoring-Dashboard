<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue'
import DashboardHeader from '@/components/DashboardHeader.vue'

const statCards = [
  { label: 'Total Users', value: '1,284', icon: 'groups' },
  { label: 'Admins', value: '42', icon: 'shield_person' },
]

const users = [
  {
    name: 'Alex Johnson',
    email: 'alex@quantum-tech.io',
    role: 'Admin',
    efficiency: 85,
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBQ0jbd7M1shlf4BjKGrH0gsgCwxpLKJBtqnQWbNld6eXFykstsRJHUpRFggUV1ACpSY3ahOvEfoRswG1v99TF5FnRVsIRh621s0nhbrDZtR7B_RlQtd4Cw3X_Tofx17lzApi1wmC5FUr_roBO4-1a6Zw2EYtdTA3le8Ux8HLXTvijVGRGdcclNjbRL8Y4Sd2KS85wy9GRlXIcCQkr_Dhxw92zN21ORRAawzEUNwRUaEx7s630udmyDnVNFsPXObaNSO7gdU7hlfh1S',
  },
  {
    name: 'Maria Garcia',
    email: 'maria.g@global.net',
    role: 'Manager',
    efficiency: 12,
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC3vpmkxarpB0SV14Zfz2Awz17xzM2i1PmP41oBTau5jzTecGJKl8C90bzRlS7SYiRT-yxW6R5QUdl0SJ46G9chewMrSepfTYj61WiSKgL-PGj9sB-7yr5NYAi30sD8l2GunGeYT-X7WPiXTL4qZpO35o7asIyxvEYreIhvJWJnL70MFIcsZeOtoW5jS-SPnpTgetncxKB1lmwkxwLY_Q5KNWYoV5v89Bpn8X_-ALusTBUrnQmjDpZGcoAQServcjMJ0uOPqwwduHxU',
  },
]
</script>

<template>
  <div class="pageLayout">
    <AppSidebar activePage="/users" />

    <main class="pageMain">
      <DashboardHeader title="User Management" />

      <div class="pageContent">
        <!-- Stat cards -->
        <div class="statsRow">
          <div v-for="stat in statCards" :key="stat.label" class="userStatCard">
            <div class="userStatLeft">
              <p class="userStatLabel">{{ stat.label }}</p>
              <h3 class="userStatValue">{{ stat.value }}</h3>
            </div>
            <div class="userStatIcon">
              <span class="material-symbols-outlined">{{ stat.icon }}</span>
            </div>
          </div>
        </div>

        <!-- Users table -->
        <div class="tableCard">
          <table class="dataTable">
            <thead>
              <tr>
                <th>User</th>
                <th>Status</th>
                <th>Role</th>
                <th>Efficiency</th>
                <th class="thRight">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.email" class="tableRow">
                <td>
                  <div class="userCell">
                    <div
                      class="userCellAvatar"
                      :style="{ backgroundImage: `url(${user.avatar})` }"
                    ></div>
                    <div>
                      <p class="userCellName">{{ user.name }}</p>
                      <p class="userCellEmail">{{ user.email }}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <span class="badgeActive">Active</span>
                </td>
                <td class="roleCell">{{ user.role }}</td>
                <td>
                  <div class="effBar">
                    <div class="effFill" :style="{ width: user.efficiency + '%' }"></div>
                  </div>
                </td>
                <td class="actionsCell">
                  <div class="actionBtns">
                    <button class="actionEdit">
                      <span class="material-symbols-outlined">edit</span>
                    </button>
                    <button class="actionDelete">
                      <span class="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
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
  overflow-y: auto;
}

.pageContent {
  padding: var(--spacing-xl);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

/* ---- Stat Cards ---- */
.statsRow {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-lg);
}

@media (min-width: 768px) {
  .statsRow {
    grid-template-columns: repeat(3, 1fr);
  }
}

.userStatCard {
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-default);
  background: var(--bg-base);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  transition: border-color 0.2s;
}

.userStatCard:hover {
  border-color: rgba(45, 212, 191, 0.25);
}

.userStatLabel {
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.userStatValue {
  font-size: var(--text-2xl);
  font-weight: 700;
  margin-top: 4px;
}

.userStatIcon {
  padding: 8px;
  background: rgba(45, 212, 191, 0.15);
  border-radius: var(--radius-md);
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
}

.userStatIcon .material-symbols-outlined {
  font-size: 22px;
}

/* ---- Table ---- */
.tableCard {
  background: var(--bg-base);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.dataTable {
  width: 100%;
  text-align: left;
  border-collapse: collapse;
}

.dataTable thead {
  background: var(--bg-elevated);
}

.dataTable th {
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: var(--text-xs);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-muted);
}

.thRight {
  text-align: right;
}

.dataTable td {
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: var(--text-sm);
}

.tableRow {
  border-bottom: 1px solid var(--border-subtle);
  transition: background 0.15s;
}

.tableRow:hover {
  background: rgba(45, 212, 191, 0.04);
}

/* ---- User cell ---- */
.userCell {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.userCellAvatar {
  width: 40px;
  height: 40px;
  border-radius: 9999px;
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
}

.userCellName {
  font-size: var(--text-sm);
  font-weight: 700;
}

.userCellEmail {
  font-size: var(--text-xs);
  color: var(--text-secondary);
}

/* ---- Badge ---- */
.badgeActive {
  display: inline-flex;
  padding: 2px 10px;
  border-radius: 9999px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  background: rgba(34, 197, 94, 0.12);
  color: #22c55e;
  border: 1px solid rgba(34, 197, 94, 0.2);
}

/* ---- Role ---- */
.roleCell {
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--color-primary);
}

/* ---- Efficiency bar ---- */
.effBar {
  height: 6px;
  width: 96px;
  background: rgba(45, 212, 191, 0.1);
  border-radius: 9999px;
  overflow: hidden;
}

.effFill {
  height: 100%;
  background: var(--color-primary);
  border-radius: 9999px;
  transition: width 0.6s ease;
}

/* ---- Actions ---- */
.actionsCell {
  text-align: right;
}

.actionBtns {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.15s;
}

.tableRow:hover .actionBtns {
  opacity: 1;
}

.actionEdit,
.actionDelete {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  transition:
    background 0.15s,
    color 0.15s;
  color: var(--text-secondary);
}

.actionEdit .material-symbols-outlined,
.actionDelete .material-symbols-outlined {
  font-size: 18px;
}

.actionEdit:hover {
  background: rgba(45, 212, 191, 0.15);
  color: var(--color-primary);
}

.actionDelete:hover {
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
}
</style>
