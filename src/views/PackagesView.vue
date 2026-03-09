<script setup lang="ts">
/**
 * @author Samuel Rivero, Dav, Juan Andrés Young Hoyos
 * @description Package Tracking view - table with warehouse assignment and log history.
 */
import { ref, computed } from 'vue'
import AppSidebar from '@/components/AppSidebar.vue'
import DashboardHeader from '@/components/DashboardHeader.vue'
import { usePackagesStore } from '@/stores/packages'

const store = usePackagesStore()
const filterButtons = ['All', 'In Transit', 'Delivered', 'Pending', 'Exception']

const expandedRow = ref<string | null>(null)

const warehouseOptions = computed(() =>
  store.warehouses.map((w) => ({ id: w.id, name: w.name })),
)

function statusClass(status: string): string {
  const map: Record<string, string> = {
    'In Transit': 'badgeTransit',
    Delivered: 'badgeDelivered',
    Pending: 'badgePending',
    Exception: 'badgeException',
  }
  return map[status] ?? 'badgePending'
}

function toggleLog(id: string) {
  expandedRow.value = expandedRow.value === id ? null : id
}
</script>

<template>
  <div class="pageLayout">
    <AppSidebar activePage="/packages" />

    <main class="pageMain">
      <DashboardHeader title="Package Tracking" />

      <div class="pageContent">
        <!-- Search & Filters -->
        <div class="filtersBar">
          <div class="searchWrapper">
            <span class="material-symbols-outlined searchIcon">search</span>
            <input class="filterSearch" placeholder="Search by tracking #..." type="text" />
          </div>
          <div class="filterBtns">
            <button
              v-for="(btn, i) in filterButtons"
              :key="btn"
              :class="['filterBtn', { filterBtnActive: i === 0 }]"
            >
              {{ btn }}
            </button>
          </div>
        </div>

        <!-- Table -->
        <div class="tableCard">
          <table class="dataTable">
            <thead>
              <tr>
                <th>Tracking #</th>
                <th>Description</th>
                <th>User</th>
                <th>Status</th>
                <th>Warehouse</th>
                <th>Updated</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <template v-for="pkg in store.packages" :key="pkg.id">
                <tr class="tableRow">
                  <td class="trackingId">{{ pkg.id }}</td>
                  <td class="cellBold">{{ pkg.description }}</td>
                  <td>{{ pkg.userId }}</td>
                  <td>
                    <span :class="['badge', statusClass(pkg.status)]">{{ pkg.status }}</span>
                  </td>
                  <td>
                    <select
                      class="whSelect"
                      :value="pkg.warehouseId ?? ''"
                      @change="
                        store.assignWarehouse(
                          pkg.id,
                          ($event.target as HTMLSelectElement).value || null,
                        )
                      "
                    >
                      <option value="">— None —</option>
                      <option v-for="wh in warehouseOptions" :key="wh.id" :value="wh.id">
                        {{ wh.name }}
                      </option>
                    </select>
                  </td>
                  <td class="cellMuted">1 hour ago</td>
                  <td>
                    <button class="btnDetails" @click="toggleLog(pkg.id)">
                      <span class="material-symbols-outlined btnDetailsIcon">{{
                        expandedRow === pkg.id ? 'expand_less' : 'expand_more'
                      }}</span>
                      <span>{{ expandedRow === pkg.id ? 'Hide' : 'Details' }}</span>
                    </button>
                  </td>
                </tr>
                <!-- Tracking log expandable row -->
                <tr v-if="expandedRow === pkg.id" class="logRow">
                  <td colspan="7" class="logCell">
                    <div class="logTimeline">
                      <div v-for="(entry, i) in pkg.logHistory" :key="entry.id" class="logEntry">
                        <div class="logDotCol">
                          <span class="logDot" :class="{ logDotActive: i === 0 }"></span>
                          <span v-if="i < pkg.logHistory.length - 1" class="logLine"></span>
                        </div>
                        <div class="logContent">
                          <p class="logEvent">{{ entry.description }}</p>
                          <p class="logMeta">
                            <span class="logDate">{{ entry.timestamp }}</span>
                            <span v-if="entry.newStatus"> → {{ entry.newStatus }}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </template>
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
  overflow: hidden;
}

.pageContent {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-xl);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

/* ---- Filters ---- */
.filtersBar {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

@media (min-width: 768px) {
  .filtersBar {
    flex-direction: row;
  }
}

.searchWrapper {
  position: relative;
  flex: 1;
}

.searchIcon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  color: var(--text-muted);
}

.filterSearch {
  width: 100%;
  padding: 10px 16px 10px 42px;
  background: var(--bg-surface);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  color: var(--text-primary);
  font-size: var(--text-sm);
  outline: none;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}

.filterSearch::placeholder {
  color: var(--text-muted);
}

.filterSearch:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(45, 212, 191, 0.12);
}

.filterBtns {
  display: flex;
  gap: 8px;
  overflow-x: auto;
}

.filterBtn {
  padding: 10px 18px;
  border-radius: var(--radius-lg);
  font-size: var(--text-sm);
  font-weight: 500;
  white-space: nowrap;
  background: var(--bg-surface);
  border: 1px solid var(--border-default);
  color: var(--text-secondary);
  transition:
    background 0.2s,
    color 0.2s,
    border-color 0.2s;
}

.filterBtn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.filterBtnActive {
  background: var(--color-primary);
  color: var(--bg-base);
  border-color: var(--color-primary);
  font-weight: 700;
}

/* ---- Table ---- */
.tableCard {
  background: var(--bg-surface);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-xl);
  overflow: hidden;
}

.dataTable {
  width: 100%;
  text-align: left;
  border-collapse: collapse;
}

.dataTable thead {
  background: var(--bg-elevated);
  border-bottom: 1px solid var(--border-default);
}

.dataTable th {
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: var(--text-xs);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-muted);
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

.trackingId {
  font-family: 'SF Mono', 'Fira Code', monospace;
  color: var(--color-primary);
  font-weight: 600;
}

.cellBold {
  font-weight: 500;
}

.cellMuted {
  color: var(--text-secondary);
}

/* ---- Badges ---- */
.badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 9999px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.badgeTransit {
  background: rgba(245, 158, 11, 0.12);
  color: #f59e0b;
  border: 1px solid rgba(245, 158, 11, 0.2);
}

.badgeDelivered {
  background: rgba(34, 197, 94, 0.12);
  color: #22c55e;
  border: 1px solid rgba(34, 197, 94, 0.2);
}

.badgePending {
  background: rgba(139, 148, 158, 0.12);
  color: var(--text-secondary);
  border: 1px solid rgba(139, 148, 158, 0.2);
}

.badgeException {
  background: rgba(239, 68, 68, 0.12);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.2);
}

/* ---- Warehouse select ---- */
.whSelect {
  padding: 5px 28px 5px 10px;
  background: var(--bg-elevated);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: 12px;
  font-weight: 500;
  outline: none;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238b949e' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 8px center;
  transition: border-color 0.2s;
  min-width: 120px;
}

.whSelect:focus,
.whSelect:hover {
  border-color: var(--color-primary);
}

/* ---- Details button ---- */
.btnDetails {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 14px;
  border-radius: var(--radius-lg);
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  color: var(--color-primary);
  background: rgba(45, 212, 191, 0.08);
  border: 1px solid rgba(45, 212, 191, 0.18);
  transition:
    background 0.2s,
    border-color 0.2s;
  cursor: pointer;
}

.btnDetails:hover {
  background: rgba(45, 212, 191, 0.16);
  border-color: var(--color-primary);
}

.btnDetailsIcon {
  font-size: 18px;
}

/* ---- Tracking log row ---- */
.logRow {
  background: var(--bg-elevated);
}

.logCell {
  padding: var(--spacing-md) var(--spacing-lg) var(--spacing-lg) var(--spacing-lg) !important;
}

.logTimeline {
  display: flex;
  flex-direction: column;
  gap: 0;
  padding-left: var(--spacing-md);
}

.logEntry {
  display: flex;
  gap: var(--spacing-md);
  min-height: 48px;
}

.logDotCol {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 16px;
  flex-shrink: 0;
}

.logDot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--border-default);
  flex-shrink: 0;
  margin-top: 5px;
}

.logDotActive {
  background: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(45, 212, 191, 0.2);
}

.logLine {
  flex: 1;
  width: 2px;
  background: var(--border-default);
  min-height: 24px;
}

.logContent {
  padding-bottom: var(--spacing-md);
}

.logEvent {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--text-primary);
}

.logMeta {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--text-secondary);
  margin-top: 2px;
}

.logMetaIcon {
  font-size: 14px;
  color: var(--text-muted);
}

.logDate {
  margin-left: 8px;
  color: var(--text-muted);
}
</style>
