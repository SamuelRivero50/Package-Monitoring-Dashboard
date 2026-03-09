<script setup lang="ts">
/**
 * @author Samuel Rivero, Law
 * @description System overview dashboard with Chart.js donut and Leaflet live map.
 */
import { computed } from 'vue'
import AppSidebar from '@/components/AppSidebar.vue'
import DashboardHeader from '@/components/DashboardHeader.vue'
import DonutChart from '@/components/DonutChart.vue'
import LeafletMap from '@/components/LeafletMap.vue'
import { useDashboardViewModel } from '@/viewmodels'

const { summary, statCards, trendLabel, trendClass } = useDashboardViewModel()

const chartLabels = computed(() => ['Delivered', 'In Transit', 'Warehouse'])
const chartValues = computed(() => {
  const s = summary.value?.statusBreakdown
  return s ? [s.delivered, s.inTransit, s.atWarehouse] : [65, 25, 10]
})
const chartColors = ['#2dd4bf', '#f59e0b', '#8b949e']

const totalLabel = computed(() => {
  if (!summary.value) return '12.8k'
  const t = summary.value.totalPackages
  return t >= 1000 ? `${(t / 1000).toFixed(1)}k` : String(t)
})

const recentPackages = computed(() => summary.value?.recentPackages ?? [])

const warehouseMarkers = [
  { id: 'wh-1', label: 'Central Hub', lat: 41.8781, lng: -87.6298, popupHtml: '<b>Central Hub</b><br>Chicago, IL — 85% capacity' },
  { id: 'wh-2', label: 'West Coast', lat: 34.0522, lng: -118.2437, popupHtml: '<b>West Coast</b><br>Los Angeles, CA — 62% capacity' },
  { id: 'wh-3', label: 'East Distro', lat: 40.7357, lng: -74.1724, popupHtml: '<b>East Distro</b><br>Newark, NJ — 94% capacity' },
  { id: 'wh-4', label: 'South Regional', lat: 33.749, lng: -84.388, popupHtml: '<b>South Regional</b><br>Atlanta, GA — 42% capacity' },
]

// Simulated logistics routes between hubs
const warehouseRoutes = [
  { fromId: 'wh-2', toId: 'wh-1' }, // LA → Chicago
  { fromId: 'wh-1', toId: 'wh-3' }, // Chicago → Newark
  { fromId: 'wh-1', toId: 'wh-4' }, // Chicago → Atlanta
  { fromId: 'wh-4', toId: 'wh-3' }, // Atlanta → Newark
]
</script>

<template>
  <div class="dashboard-layout">
    <AppSidebar activePage="/dashboard" />

    <main class="dashboard-main">
      <DashboardHeader title="System Overview" />

      <!-- Content -->
      <div class="dashboard-content">
        <!-- Stat Cards -->
        <div class="stat-cards">
          <div v-for="card in statCards" :key="card.label" class="stat-card">
            <div class="stat-card-top">
              <div :class="['stat-icon', card.iconColorClass]">
                <span class="material-symbols-outlined">{{ card.icon }}</span>
              </div>
              <span :class="['stat-trend', trendClass(card.trend)]">
                <span
                  v-if="card.trend !== 0"
                  class="material-symbols-outlined"
                >{{ card.trend > 0 ? 'trending_up' : 'trending_down' }}</span>
                {{ trendLabel(card.trend) }}
              </span>
            </div>
            <p class="stat-label">{{ card.label }}</p>
            <h3 class="stat-value">{{ card.value }}</h3>
          </div>
        </div>

        <!-- Middle row: Table + Status summary -->
        <div class="middle-row">
          <!-- Recent Packages Table -->
          <div class="packages-panel">
            <div class="panel-header">
              <h2 class="panel-title">Recent Packages</h2>
              <button class="panel-action">View all</button>
            </div>
            <div class="table-wrapper">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Tracking #</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Updated</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in recentPackages" :key="row.trackingId">
                    <td class="tracking-id">{{ row.trackingId }}</td>
                    <td>{{ row.description }}</td>
                    <td><span :class="['badge', row.statusClass]">{{ row.status }}</span></td>
                    <td class="time-cell">{{ row.updatedAgo }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Status Summary -->
          <div class="status-panel">
            <h2 class="panel-title">Status Summary</h2>
            <div class="status-chart-area">
              <DonutChart
                :labels="chartLabels"
                :values="chartValues"
                :colors="chartColors"
                :center-value="totalLabel"
                center-label="Total"
              />
              <div class="status-legend">
                <div class="legend-item">
                  <div class="legend-left">
                    <span class="legend-dot legend-dot--primary"></span>
                    <span>Delivered</span>
                  </div>
                  <span class="legend-pct">65%</span>
                </div>
                <div class="legend-item">
                  <div class="legend-left">
                    <span class="legend-dot legend-dot--amber"></span>
                    <span>In Transit</span>
                  </div>
                  <span class="legend-pct">25%</span>
                </div>
                <div class="legend-item">
                  <div class="legend-left">
                    <span class="legend-dot legend-dot--muted"></span>
                    <span>Warehouse</span>
                  </div>
                  <span class="legend-pct">10%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Warehouses Section -->
        <div class="card warehouses-section">
          <div class="warehouses-header">
            <div>
              <h2 class="panel-title">Warehouses</h2>
              <p class="panel-subtitle">Real-time capacity and utilization across locations</p>
            </div>
            <button class="btn-primary-sm">Add Warehouse</button>
          </div>
          <div class="warehouses-grid">
            <div class="warehouse-card">
              <div class="wh-top">
                <div class="wh-icon">
                  <span class="material-symbols-outlined">location_on</span>
                </div>
                <div>
                  <h4 class="wh-name">North Region Hub</h4>
                  <p class="wh-city">Chicago, IL</p>
                </div>
              </div>
              <div class="wh-bar-area">
                <div class="wh-bar-header">
                  <span class="wh-bar-label">Capacity</span>
                  <span>88%</span>
                </div>
                <div class="wh-bar-track">
                  <div class="wh-bar-fill wh-bar-fill--primary" style="width: 88%"></div>
                </div>
                <p class="wh-bar-desc">8,800 / 10,000 pallets</p>
              </div>
            </div>

            <div class="warehouse-card">
              <div class="wh-top">
                <div class="wh-icon">
                  <span class="material-symbols-outlined">location_on</span>
                </div>
                <div>
                  <h4 class="wh-name">West Coast Center</h4>
                  <p class="wh-city">Long Beach, CA</p>
                </div>
              </div>
              <div class="wh-bar-area">
                <div class="wh-bar-header">
                  <span class="wh-bar-label">Capacity</span>
                  <span>42%</span>
                </div>
                <div class="wh-bar-track">
                  <div class="wh-bar-fill wh-bar-fill--primary" style="width: 42%"></div>
                </div>
                <p class="wh-bar-desc">6,300 / 15,000 pallets</p>
              </div>
            </div>

            <div class="warehouse-card">
              <div class="wh-top">
                <div class="wh-icon">
                  <span class="material-symbols-outlined">location_on</span>
                </div>
                <div>
                  <h4 class="wh-name">East Distribution</h4>
                  <p class="wh-city">Newark, NJ</p>
                </div>
              </div>
              <div class="wh-bar-area">
                <div class="wh-bar-header">
                  <span class="wh-bar-label">Capacity</span>
                  <span class="wh-bar-danger">94%</span>
                </div>
                <div class="wh-bar-track">
                  <div class="wh-bar-fill wh-bar-fill--danger" style="width: 94%"></div>
                </div>
                <p class="wh-bar-desc">11,280 / 12,000 pallets</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Live Map -->
        <div class="live-map">
          <LeafletMap :markers="warehouseMarkers" :routes="warehouseRoutes" />
          <div class="map-badge-corner">
            <span>Status: Operational</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.dashboard-layout {
  display: flex;
  min-height: 100vh;
  background: var(--bg-base);
}

/* ---- Main ---- */
.dashboard-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

/* ---- Content ---- */
.dashboard-content {
  padding: var(--spacing-xl);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
  overflow-y: auto;
}

/* ---- Stat Cards ---- */
.stat-cards {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: var(--spacing-lg);
}

@media (min-width: 768px) {
  .stat-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1200px) {
  .stat-cards {
    grid-template-columns: repeat(4, 1fr);
  }
}

.stat-card {
  background: var(--bg-surface);
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-default);
}

.stat-card:hover {
  border-color: rgba(45, 212, 191, 0.25);
}

.stat-card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-md);
}

.stat-icon {
  padding: 8px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-icon .material-symbols-outlined {
  font-size: 22px;
  color: #fff;
}

.stat-icon--packages {
  background: var(--color-packages);
}
.stat-icon--warehouses {
  background: var(--color-warehouses);
}
.stat-icon--companies {
  background: var(--color-companies);
}
.stat-icon--users {
  background: var(--color-users);
}

.stat-trend {
  font-size: var(--text-xs);
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 2px;
}

.stat-trend .material-symbols-outlined {
  font-size: 14px;
}

.stat-trend--up {
  color: #4ade80;
}
.stat-trend--down {
  color: #f87171;
}
.stat-trend--neutral {
  color: var(--text-secondary);
}

.stat-label {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--text-secondary);
}

.stat-value {
  font-size: var(--text-xl);
  font-weight: 700;
  margin-top: 4px;
  line-height: 1;
}

/* ---- Middle Row ---- */
.middle-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-lg);
}

@media (min-width: 1024px) {
  .middle-row {
    grid-template-columns: 2fr 1fr;
  }
}

/* ---- Panel shared ---- */
.card {
  background: var(--bg-surface);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
}

.card:hover {
  border-color: rgba(45, 212, 191, 0.25);
}

.panel-header {
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--border-default);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.panel-title {
  font-size: var(--text-lg);
  font-weight: 700;
}

.panel-subtitle {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  margin-top: 2px;
}

.panel-action {
  color: var(--color-primary);
  font-size: var(--text-sm);
  font-weight: 500;
}

.panel-action:hover {
  text-decoration: underline;
}

/* ---- Packages Table ---- */
.packages-panel {
  background: var(--bg-surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-default);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.table-wrapper {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  text-align: left;
  font-size: var(--text-sm);
  border-collapse: collapse;
}

.data-table thead tr {
  background: var(--bg-elevated);
  color: var(--text-secondary);
}

.data-table th {
  padding: 14px var(--spacing-lg);
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.data-table tbody tr {
  border-top: 1px solid var(--border-default);
  transition: background 0.15s;
}

.data-table tbody tr:hover {
  background: var(--bg-elevated);
}

.data-table td {
  padding: 14px var(--spacing-lg);
  font-weight: 500;
}

.tracking-id {
  font-family: 'SF Mono', 'Fira Code', monospace;
  color: var(--color-link);
}

.time-cell {
  color: var(--text-muted);
}

/* ---- Badges ---- */
.badge {
  border-radius: 4px;
  padding: 2px 10px;
  font-size: var(--text-xs);
  font-weight: 500;
  display: inline-block;
}

.badge-transit {
  background: rgba(217, 119, 6, 0.2);
  color: #f59e0b;
  border: 1px solid #d97706;
}

.badge-warehouse {
  background: rgba(37, 99, 235, 0.2);
  color: #60a5fa;
  border: 1px solid #2563eb;
}

.badge-delivered {
  background: rgba(22, 163, 74, 0.2);
  color: #4ade80;
  border: 1px solid #16a34a;
}

/* ---- Status Summary ---- */
.status-panel {
  background: var(--bg-surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-default);
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
}

.status-chart-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-lg);
}

.status-legend {
  width: 100%;
  margin-top: var(--spacing-xl);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.legend-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: var(--text-sm);
  font-weight: 500;
}

.legend-left {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.legend-dot {
  width: 8px;
  height: 8px;
  border-radius: 9999px;
}

.legend-dot--primary {
  background: var(--color-primary);
}
.legend-dot--amber {
  background: #f59e0b;
}
.legend-dot--muted {
  background: var(--text-secondary);
}

.legend-pct {
  font-weight: 700;
  font-size: var(--text-sm);
}

/* ---- Warehouses ---- */
.warehouses-section {
  padding: var(--spacing-lg);
}

.warehouses-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-lg);
}

.btn-primary-sm {
  background: var(--color-primary);
  color: var(--bg-base);
  font-weight: 700;
  padding: 10px 16px;
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  transition: opacity 0.15s;
}

.btn-primary-sm:hover {
  opacity: 0.9;
}

.warehouses-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-lg);
}

@media (min-width: 768px) {
  .warehouses-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.warehouse-card {
  padding: var(--spacing-md);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-default);
  background: var(--bg-base);
}

.wh-top {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}

.wh-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  background: rgba(45, 212, 191, 0.15);
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
}

.wh-name {
  font-size: var(--text-sm);
  font-weight: 700;
}

.wh-city {
  font-size: 11px;
  color: var(--text-secondary);
  text-transform: uppercase;
  font-weight: 700;
}

.wh-bar-area {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.wh-bar-header {
  display: flex;
  justify-content: space-between;
  font-size: var(--text-xs);
  font-weight: 600;
}

.wh-bar-label {
  color: var(--text-secondary);
}

.wh-bar-danger {
  color: #f87171;
  font-weight: 700;
}

.wh-bar-track {
  height: 8px;
  width: 100%;
  background: var(--border-subtle);
  border-radius: 9999px;
  overflow: hidden;
}

.wh-bar-fill {
  height: 100%;
  border-radius: 9999px;
}

.wh-bar-fill--primary {
  background: var(--color-primary);
}

.wh-bar-fill--danger {
  background: #f87171;
}

.wh-bar-desc {
  font-size: 10px;
  color: var(--text-muted);
  text-align: right;
}

/* ---- Live Map ---- */
.live-map {
  position: relative;
  height: 360px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--border-default);
}

.map-badge-corner {
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
  background: rgba(13, 17, 23, 0.8);
  backdrop-filter: blur(8px);
  padding: 6px 12px;
  border-radius: var(--radius-md);
  border: 1px solid rgba(45, 212, 191, 0.2);
  z-index: 1000;
}

.map-badge-corner span {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-primary);
}
</style>
