<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue'
import DashboardHeader from '@/components/DashboardHeader.vue'
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
          <div class="stat-card">
            <div class="stat-card-top">
              <div class="stat-icon stat-icon--packages">
                <span class="material-symbols-outlined">package</span>
              </div>
              <span class="stat-trend stat-trend--up">
                <span class="material-symbols-outlined">trending_up</span> +12%
              </span>
            </div>
            <p class="stat-label">Total Packages</p>
            <h3 class="stat-value">12,840</h3>
          </div>

          <div class="stat-card">
            <div class="stat-card-top">
              <div class="stat-icon stat-icon--warehouses">
                <span class="material-symbols-outlined">warehouse</span>
              </div>
              <span class="stat-trend stat-trend--neutral">0%</span>
            </div>
            <p class="stat-label">Active Warehouses</p>
            <h3 class="stat-value">24</h3>
          </div>

          <div class="stat-card">
            <div class="stat-card-top">
              <div class="stat-icon stat-icon--companies">
                <span class="material-symbols-outlined">business</span>
              </div>
              <span class="stat-trend stat-trend--down">
                <span class="material-symbols-outlined">trending_down</span> -2%
              </span>
            </div>
            <p class="stat-label">Affiliated Companies</p>
            <h3 class="stat-value">156</h3>
          </div>

          <div class="stat-card">
            <div class="stat-card-top">
              <div class="stat-icon stat-icon--users">
                <span class="material-symbols-outlined">group</span>
              </div>
              <span class="stat-trend stat-trend--up">
                <span class="material-symbols-outlined">trending_up</span> +5%
              </span>
            </div>
            <p class="stat-label">System Users</p>
            <h3 class="stat-value">892</h3>
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
                  <tr>
                    <td class="tracking-id">#TRK-9902</td>
                    <td>Industrial Pump Spare Parts</td>
                    <td><span class="badge badge-transit">In Transit</span></td>
                    <td class="time-cell">2 mins ago</td>
                  </tr>
                  <tr>
                    <td class="tracking-id">#TRK-8812</td>
                    <td>Solar Panel Modules (x20)</td>
                    <td><span class="badge badge-warehouse">At Warehouse</span></td>
                    <td class="time-cell">1 hour ago</td>
                  </tr>
                  <tr>
                    <td class="tracking-id">#TRK-7721</td>
                    <td>Server Rack Components</td>
                    <td><span class="badge badge-delivered">Delivered</span></td>
                    <td class="time-cell">3 hours ago</td>
                  </tr>
                  <tr>
                    <td class="tracking-id">#TRK-6610</td>
                    <td>Lithium Battery Pack</td>
                    <td><span class="badge badge-transit">In Transit</span></td>
                    <td class="time-cell">5 hours ago</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Status Summary -->
          <div class="status-panel">
            <h2 class="panel-title">Status Summary</h2>
            <div class="status-chart-area">
              <div class="donut-container">
                <svg class="donut" viewBox="0 0 100 100">
                  <circle
                    class="donut-bg"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke-width="8"
                  />
                  <circle
                    class="donut-primary"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke-width="8"
                    stroke-dasharray="251.2"
                    stroke-dashoffset="60"
                  />
                  <circle
                    class="donut-amber"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke-width="8"
                    stroke-dasharray="251.2"
                    stroke-dashoffset="200"
                  />
                </svg>
                <div class="donut-label">
                  <span class="donut-value">12.8k</span>
                  <span class="donut-sub">Total</span>
                </div>
              </div>
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
          <img
            alt="Logistics Network Map"
            class="map-image"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDC_9BuPhjQu7bBw9XEjarhMkC_WCoBm1jeI0Fn98XCkXbMVl_e_DoJFdJSw7U3XJ-mQC8UNcSbZwGzo9FGJYKdrgPozo6RtreT6MNMGTmITOzRWNh9eCDglraYnoQEa1iHiBVQYfcbdCLvn1wRlvQuPOpyiv8JlHe5v0f3D3pApY2mbiiDHl--FyuqABn5c-2qy2s-5zABl_6ibSeNDF5_1XTk6xElTSKbkVs5XIGJvBLbSlGxvhf5SQKt1dc24I2EijE18YzdELuF"
          />
          <div class="map-overlay">
            <div class="map-status-dot">
              <span class="dot-ping-lg"></span>
              <span class="dot-solid-lg"></span>
            </div>
            <h4 class="map-title">Live Operations Map</h4>
            <p class="map-desc">
              Currently tracking 42 active shipments across 8 international routes.
            </p>
          </div>
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
}

.donut-container {
  position: relative;
  width: 160px;
  height: 160px;
}

.donut {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.donut-bg {
  stroke: var(--border-subtle);
}
.donut-primary {
  stroke: var(--color-primary);
}
.donut-amber {
  stroke: #f59e0b;
}

.donut-label {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.donut-value {
  font-size: var(--text-xl);
  font-weight: 700;
}

.donut-sub {
  font-size: 10px;
  color: var(--text-secondary);
  text-transform: uppercase;
  font-weight: 700;
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
  height: 256px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--border-default);
}

.map-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(1);
  opacity: 0.2;
}

.map-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(13, 17, 23, 0.85), transparent);
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.map-status-dot {
  position: relative;
  width: 12px;
  height: 12px;
  display: inline-flex;
  margin-bottom: var(--spacing-sm);
}

.dot-ping-lg {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 9999px;
  background: var(--color-primary);
  opacity: 0.75;
  animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.dot-solid-lg {
  position: relative;
  width: 12px;
  height: 12px;
  border-radius: 9999px;
  background: var(--color-primary);
}

@keyframes ping {
  75%,
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

.map-title {
  font-size: var(--text-lg);
  font-weight: 700;
  color: #fff;
}

.map-desc {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  max-width: 440px;
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
}

.map-badge-corner span {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-primary);
}
</style>
