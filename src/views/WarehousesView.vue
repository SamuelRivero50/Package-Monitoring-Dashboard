<script setup lang="ts">
/**
 * @author Samuel Rivero, Dav, Juan Andrés Young Hoyos
 * @description Warehouse management view - capacity cards and packages per warehouse.
 */
import { ref } from 'vue'
import AppSidebar from '@/components/AppSidebar.vue'
import DashboardHeader from '@/components/DashboardHeader.vue'
import { usePackagesStore } from '@/stores/packages'

const store = usePackagesStore()

const expandedWh = ref<string | null>(null)

function statusClass(status: string): string {
  const map: Record<string, string> = {
    'In Transit': 'badgeTransit',
    Delivered: 'badgeDelivered',
    Pending: 'badgePending',
    Exception: 'badgeException',
  }
  return map[status] ?? 'badgePending'
}

function toggleWh(id: string) {
  expandedWh.value = expandedWh.value === id ? null : id
}
</script>

<template>
  <div class="pageLayout">
    <AppSidebar activePage="/warehouses" />

    <main class="pageMain">
      <DashboardHeader title="Facility Management" />

      <div class="pageContent">
        <!-- Title row -->
        <div class="titleRow">
          <div>
            <h1 class="pageTitle">Warehouse Hubs</h1>
            <p class="pageSubtitle">Real-time capacity and performance monitoring.</p>
          </div>
          <button class="btnPrimary">Add New Hub</button>
        </div>

        <!-- Cards grid -->
        <div class="whGrid">
          <div v-for="wh in store.warehouses" :key="wh.id" class="whCardWrapper">
            <div
              class="whCard"
              :class="{ whCardActive: expandedWh === wh.id }"
              @click="toggleWh(wh.id)"
            >
              <div class="whImageWrap">
                <img :src="wh.imageUrl" :alt="wh.name" class="whImage" />
                <div class="whActiveBadge">Active</div>
                <div class="whPkgCount">
                  <span class="material-symbols-outlined" style="font-size: 14px">package_2</span>
                  {{ store.packagesForWarehouse(wh.name).length }}
                </div>
              </div>
              <div class="whBody">
                <div class="whNameRow">
                  <h3 class="whName">{{ wh.name }}</h3>
                  <span class="material-symbols-outlined whChevron">{{
                    expandedWh === wh.name ? 'expand_less' : 'expand_more'
                  }}</span>
                </div>
                <p class="whLocation">
                  <span class="material-symbols-outlined locationIcon">location_on</span>
                  {{ wh.location }}
                </p>
                <div class="whCapacity">
                  <div class="capHeader">
                    <span>Capacity</span>
                    <span :class="['capPercent', { capDanger: wh.capacity >= 90 }]"
                      >{{ wh.capacity }}%</span
                    >
                  </div>
                  <div class="capTrack">
                    <div
                      class="capFill"
                      :class="{ capFillDanger: wh.capacity >= 90 }"
                      :style="{ width: wh.capacity + '%' }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Packages panel -->
            <div v-if="expandedWh === wh.id" class="pkgPanel">
              <p class="pkgPanelTitle">
                <span
                  class="material-symbols-outlined"
                  style="font-size: 16px; vertical-align: middle"
                  >package_2</span
                >
                Packages assigned to {{ wh.name }}
              </p>
              <div v-if="store.packagesForWarehouse(wh.id).length === 0" class="pkgEmpty">
                No packages assigned yet.
              </div>
              <table v-else class="pkgTable">
                <thead>
                  <tr>
                    <th>Tracking #</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>User</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="pkg in store.packagesForWarehouse(wh.id)"
                    :key="pkg.id"
                    class="pkgRow"
                  >
                    <td class="pkgId">{{ pkg.id }}</td>
                    <td>{{ pkg.description }}</td>
                    <td>
                      <span :class="['pkgBadge', statusClass(pkg.status)]">{{ pkg.status }}</span>
                    </td>
                    <td class="pkgMuted">{{ pkg.userId }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
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
  overflow: hidden;
}

.pageContent {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-xl);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

/* ---- Title Row ---- */
.titleRow {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

@media (min-width: 768px) {
  .titleRow {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
}

.pageTitle {
  font-size: var(--text-2xl);
  font-weight: 900;
  letter-spacing: -0.5px;
}

.pageSubtitle {
  color: var(--text-secondary);
  font-size: var(--text-sm);
  margin-top: 4px;
}

.btnPrimary {
  padding: 10px 20px;
  border-radius: var(--radius-lg);
  background: var(--color-primary);
  color: var(--bg-base);
  font-weight: 700;
  font-size: var(--text-sm);
  transition: filter 0.2s;
  white-space: nowrap;
  align-self: flex-start;
}

.btnPrimary:hover {
  filter: brightness(1.1);
}

/* ---- Warehouse Grid ---- */
.whGrid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-lg);
}

@media (min-width: 640px) {
  .whGrid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1200px) {
  .whGrid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.whCardWrapper {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.whCard {
  background: var(--bg-surface);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: border-color 0.2s;
  cursor: pointer;
  user-select: none;
}

.whCard:hover {
  border-color: rgba(45, 212, 191, 0.25);
}

.whCardActive {
  border-color: var(--color-primary) !important;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.whImageWrap {
  height: 160px;
  position: relative;
  overflow: hidden;
}

.whImage {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.whCard:hover .whImage {
  transform: scale(1.08);
}

.whActiveBadge {
  position: absolute;
  bottom: 12px;
  left: 16px;
  background: rgba(45, 212, 191, 0.2);
  backdrop-filter: blur(8px);
  padding: 2px 10px;
  border-radius: var(--radius-sm);
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--color-primary);
  letter-spacing: 0.04em;
}

.whBody {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.whNameRow {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.whChevron {
  font-size: 20px;
  color: var(--text-muted);
}

.whName {
  font-size: var(--text-lg);
  font-weight: 700;
}

.whLocation {
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--text-secondary);
  font-size: var(--text-xs);
  margin-top: 4px;
}

.locationIcon {
  font-size: 14px;
}

.whCapacity {
  margin-top: auto;
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--border-subtle);
}

.capHeader {
  display: flex;
  justify-content: space-between;
  font-size: var(--text-xs);
  margin-bottom: 8px;
}

.capPercent {
  font-weight: 700;
  color: var(--color-primary);
}

.capDanger {
  color: #ef4444;
}

.capTrack {
  height: 8px;
  width: 100%;
  background: var(--bg-elevated);
  border-radius: 9999px;
  overflow: hidden;
}

.capFill {
  height: 100%;
  background: var(--color-primary);
  border-radius: 9999px;
  transition: width 0.6s ease;
}

.capFillDanger {
  background: #ef4444;
}

/* ---- Package count badge on image ---- */
.whPkgCount {
  position: absolute;
  bottom: 12px;
  right: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
  background: rgba(13, 17, 23, 0.72);
  backdrop-filter: blur(8px);
  padding: 3px 10px;
  border-radius: var(--radius-sm);
  font-size: 11px;
  font-weight: 700;
  color: var(--text-primary);
}

/* ---- Packages panel (expanded) ---- */
.pkgPanel {
  background: var(--bg-elevated);
  border: 1px solid var(--color-primary);
  border-top: none;
  border-bottom-left-radius: var(--radius-lg);
  border-bottom-right-radius: var(--radius-lg);
  padding: var(--spacing-md) var(--spacing-lg) var(--spacing-lg);
  overflow-x: auto;
}

.pkgPanelTitle {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: var(--spacing-md);
  display: flex;
  align-items: center;
  gap: 6px;
}

.pkgEmpty {
  font-size: var(--text-sm);
  color: var(--text-muted);
  text-align: center;
  padding: var(--spacing-md) 0;
}

.pkgTable {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--text-sm);
}

.pkgTable th {
  padding: 8px 12px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-muted);
  text-align: left;
  border-bottom: 1px solid var(--border-default);
}

.pkgRow {
  border-bottom: 1px solid var(--border-subtle);
  transition: background 0.15s;
}

.pkgRow:hover {
  background: rgba(45, 212, 191, 0.04);
}

.pkgRow td {
  padding: 10px 12px;
}

.pkgId {
  font-family: 'SF Mono', 'Fira Code', monospace;
  color: var(--color-primary);
  font-weight: 600;
}

.pkgMuted {
  color: var(--text-secondary);
}

.pkgBadge {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 9999px;
  font-size: 10px;
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
</style>
