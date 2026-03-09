<script setup lang="ts">
/**
 * @author Samuel Rivero , Juan Andrés Young Hoyos
 * @description Package Tracking view - table with warehouse assignment and log history.
*/
import { ref, computed } from 'vue'
import AppSidebar from '@/components/AppSidebar.vue'
import AppModal from '@/components/AppModal.vue'
import DashboardHeader from '@/components/DashboardHeader.vue'
import { usePackagesStore } from '@/stores/packages'
import { useUsersStore } from '@/stores/users'
import type { PackageLogInterface } from '@/interfaces'

const store = usePackagesStore()
const usersStore = useUsersStore()
const searchQuery = ref('')
const statusFilter = ref('All')
const warehouseFilter = ref('')

const expandedRow = ref<string | null>(null)
const showCreateModal = ref(false)
const showLogCreateModal = ref(false)
const editingLog = ref<{ log: PackageLogInterface; packageId: string } | null>(null)
const deletingId = ref<string | null>(null)
const logPackageId = ref<string>('')

const logForm = ref({
  fromWarehouseId: '',
  toWarehouseId: '',
  newStatus: '',
  description: '',
})

const warehouseOptions = computed(() =>
  store.warehouses.map((w) => ({ id: w.id, name: w.name })),
)

function warehouseName(id: string): string {
  if (!id) return '—'
  return store.warehouses.find((w) => w.id === id)?.name ?? id
}

function formatLogTimestamp(ts: string): string {
  try {
    const d = new Date(ts)
    return d.toLocaleString(undefined, {
      dateStyle: 'short',
      timeStyle: 'short',
    })
  } catch {
    return ts
  }
}

const filteredPackages = computed(() => {
  return store.packages
    .filter((p) => statusFilter.value === 'All' || p.status === statusFilter.value)
    .filter((p) => warehouseFilter.value === '' || p.warehouseId === warehouseFilter.value)
    .filter(
      (p) =>
        !searchQuery.value ||
        p.id.includes(searchQuery.value) ||
        p.description.toLowerCase().includes(searchQuery.value.toLowerCase()),
    )
})

const form = ref({
  userId: '',
  warehouseId: '' as string | null,
  status: 'Pending',
  description: '',
  price: 0,
})

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


async function submitCreate() {
  if (!form.value.description.trim()) return
  await store.createPackage({
    userId: form.value.userId,
    warehouseId: form.value.warehouseId || null,
    status: form.value.status,
    description: form.value.description.trim(),
    price: Number(form.value.price) || 0,
  })
  form.value = { userId: '', warehouseId: '', status: 'Pending', description: '', price: 0 }
  showCreateModal.value = false
}

async function confirmDelete(id: string) {
  if (!confirm('Delete this package?')) return
  deletingId.value = id
  await store.removePackage(id)
  deletingId.value = null
  if (expandedRow.value === id) expandedRow.value = null
}

function openAddLog(packageId: string) {
  logPackageId.value = packageId
  logForm.value = {
    fromWarehouseId: '',
    toWarehouseId: '',
    newStatus: '',
    description: '',
  }
  showLogCreateModal.value = true
}

function openEditLog(log: PackageLogInterface, packageId: string) {
  editingLog.value = { log, packageId }
  logForm.value = {
    fromWarehouseId: log.fromWarehouseId,
    toWarehouseId: log.toWarehouseId,
    newStatus: log.newStatus,
    description: log.description,
  }
}

function closeEditLog() {
  editingLog.value = null
}

async function submitLogCreate() {
  if (!logForm.value.description.trim()) return
  await store.addPackageLog({
    packageId: logPackageId.value,
    fromWarehouseId: logForm.value.fromWarehouseId,
    toWarehouseId: logForm.value.toWarehouseId,
    newStatus: logForm.value.newStatus,
    description: logForm.value.description.trim(),
  })
  showLogCreateModal.value = false
}

async function submitLogEdit() {
  if (!editingLog.value) return
  await store.updatePackageLog({
    id: editingLog.value.log.id,
    packageId: editingLog.value.packageId,
    fromWarehouseId: logForm.value.fromWarehouseId,
    toWarehouseId: logForm.value.toWarehouseId,
    newStatus: logForm.value.newStatus,
    description: logForm.value.description.trim(),
  })
  closeEditLog()
}

async function confirmDeleteLog(logId: string, packageId: string) {
  if (!confirm('Delete this log entry?')) return
  await store.removePackageLog(logId, packageId)
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
            <input v-model="searchQuery" class="filterSearch" placeholder="Search by tracking #..." type="text" />
          </div>
          <select v-model="statusFilter" class="filterSelect">
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
            <option value="Exception">Exception</option>
          </select>
          <select v-model="warehouseFilter" class="filterSelect">
            <option value="">All Warehouses</option>
            <option v-for="wh in warehouseOptions" :key="wh.id" :value="wh.id">{{ wh.name }}</option>
          </select>
          <button class="btnPrimary" @click="showCreateModal = true">New Package</button>
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
              <template v-for="pkg in filteredPackages" :key="pkg.id">
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
                    <div class="cellActions">
                      <button class="btnDetails" @click="toggleLog(pkg.id)">
                        <span class="material-symbols-outlined btnDetailsIcon">{{
                          expandedRow === pkg.id ? 'expand_less' : 'expand_more'
                        }}</span>
                        <span>{{ expandedRow === pkg.id ? 'Hide' : 'Details' }}</span>
                      </button>
                      <button
                        class="btnDelete"
                        :disabled="deletingId === pkg.id"
                        title="Delete"
                        @click="confirmDelete(pkg.id)"
                      >
                        <span class="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
                <!-- Tracking log expandable row -->
                <tr v-if="expandedRow === pkg.id" class="logRow">
                  <td colspan="7" class="logCell">
                    <div class="logHeader">
                      <span class="logHeaderTitle">Tracking Log</span>
                      <button class="btnLogAdd" @click="openAddLog(pkg.id)">
                        <span class="material-symbols-outlined">add</span> Add Log
                      </button>
                    </div>
                    <div class="logTimeline">
                      <div v-for="(entry, i) in pkg.logHistory" :key="entry.id" class="logEntry">
                        <div class="logDotCol">
                          <span class="logDot" :class="{ logDotActive: i === 0 }"></span>
                          <span v-if="i < pkg.logHistory.length - 1" class="logLine"></span>
                        </div>
                        <div class="logContent">
                          <p class="logEvent">{{ entry.description }}</p>
                          <div class="logDetails">
                            <p class="logMeta">
                              <span class="logDate">{{ formatLogTimestamp(entry.timestamp) }}</span>
                              <span v-if="entry.previousStatus || entry.newStatus" class="logStatusChange">
                                {{ entry.previousStatus || '—' }} → {{ entry.newStatus || '—' }}
                              </span>
                            </p>
                            <p v-if="entry.fromWarehouseId || entry.toWarehouseId" class="logWarehouses">
                              <span v-if="entry.fromWarehouseId">
                                <span class="logLabel">Desde:</span> {{ warehouseName(entry.fromWarehouseId) }}
                              </span>
                              <span v-if="entry.fromWarehouseId && entry.toWarehouseId" class="logSeparator">·</span>
                              <span v-if="entry.toWarehouseId">
                                <span class="logLabel">Hacia:</span> {{ warehouseName(entry.toWarehouseId) }}
                              </span>
                            </p>
                          </div>
                          <div class="logActions">
                            <button class="logActionBtn" title="Edit" @click="openEditLog(entry, pkg.id)">
                              <span class="material-symbols-outlined">edit</span>
                            </button>
                            <button class="logActionBtn logActionBtnDanger" title="Delete" @click="confirmDeleteLog(entry.id, pkg.id)">
                              <span class="material-symbols-outlined">delete</span>
                            </button>
                          </div>
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

    <!-- Create Package Modal -->
    <AppModal :show="showCreateModal" title="New Package" @close="showCreateModal = false">
      <form class="formModal" @submit.prevent="submitCreate">
        <div class="formGroup">
          <label for="pkg-userId">User</label>
          <select id="pkg-userId" v-model="form.userId" required>
            <option value="">— Select —</option>
            <option v-for="u in usersStore.users" :key="u.id" :value="u.id">
              {{ u.name }} ({{ u.email }})
            </option>
          </select>
        </div>
        <div class="formGroup">
          <label for="pkg-warehouse">Warehouse</label>
          <select id="pkg-warehouse" v-model="form.warehouseId">
            <option value="">— None —</option>
            <option v-for="wh in warehouseOptions" :key="wh.id" :value="wh.id">
              {{ wh.name }}
            </option>
          </select>
        </div>
        <div class="formGroup">
          <label for="pkg-status">Status</label>
          <select id="pkg-status" v-model="form.status">
            <option value="Pending">Pending</option>
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
            <option value="Exception">Exception</option>
          </select>
        </div>
        <div class="formGroup">
          <label for="pkg-desc">Description</label>
          <input id="pkg-desc" v-model="form.description" required type="text" placeholder="e.g. Electronics Kit" />
        </div>
        <div class="formGroup">
          <label for="pkg-price">Price</label>
          <input id="pkg-price" v-model.number="form.price" required type="number" step="0.01" min="0" />
        </div>
        <div class="formActions">
          <button type="button" class="btnSecondary" @click="showCreateModal = false">Cancel</button>
          <button type="submit" class="btnPrimary">Create</button>
        </div>
      </form>
    </AppModal>

    <!-- Create Log Modal -->
    <AppModal :show="showLogCreateModal" title="Add Log Entry" @close="showLogCreateModal = false">
      <form class="formModal" @submit.prevent="submitLogCreate">
        <div class="formGroup">
          <label for="log-from">From Warehouse</label>
          <select id="log-from" v-model="logForm.fromWarehouseId">
            <option value="">— None —</option>
            <option v-for="wh in warehouseOptions" :key="wh.id" :value="wh.id">{{ wh.name }}</option>
          </select>
        </div>
        <div class="formGroup">
          <label for="log-to">To Warehouse</label>
          <select id="log-to" v-model="logForm.toWarehouseId">
            <option value="">— None —</option>
            <option v-for="wh in warehouseOptions" :key="wh.id" :value="wh.id">{{ wh.name }}</option>
          </select>
        </div>
        <div class="formGroup">
          <label for="log-new">New Status</label>
          <select id="log-new" v-model="logForm.newStatus">
            <option value="Pending">Pending</option>
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
            <option value="Exception">Exception</option>
          </select>
        </div>
        <div class="formGroup">
          <label for="log-desc">Description</label>
          <input id="log-desc" v-model="logForm.description" required type="text" placeholder="e.g. Picked up from warehouse" />
        </div>
        <div class="formActions">
          <button type="button" class="btnSecondary" @click="showLogCreateModal = false">Cancel</button>
          <button type="submit" class="btnPrimary">Add</button>
        </div>
      </form>
    </AppModal>

    <!-- Edit Log Modal -->
    <AppModal :show="!!editingLog" title="Edit Log Entry" @close="closeEditLog">
      <form v-if="editingLog" class="formModal" @submit.prevent="submitLogEdit">
        <div class="formGroup">
          <label for="log-edit-from">From Warehouse</label>
          <select id="log-edit-from" v-model="logForm.fromWarehouseId">
            <option value="">— None —</option>
            <option v-for="wh in warehouseOptions" :key="wh.id" :value="wh.id">{{ wh.name }}</option>
          </select>
        </div>
        <div class="formGroup">
          <label for="log-edit-to">To Warehouse</label>
          <select id="log-edit-to" v-model="logForm.toWarehouseId">
            <option value="">— None —</option>
            <option v-for="wh in warehouseOptions" :key="wh.id" :value="wh.id">{{ wh.name }}</option>
          </select>
        </div>
        <div class="formGroup">
          <label for="log-edit-new">New Status</label>
          <select id="log-edit-new" v-model="logForm.newStatus">
            <option value="Pending">Pending</option>
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
            <option value="Exception">Exception</option>
          </select>
        </div>
        <div class="formGroup">
          <label for="log-edit-desc">Description</label>
          <input id="log-edit-desc" v-model="logForm.description" required type="text" />
        </div>
        <div class="formActions">
          <button type="button" class="btnSecondary" @click="closeEditLog">Cancel</button>
          <button type="submit" class="btnPrimary">Save</button>
        </div>
      </form>
    </AppModal>
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

.filterSelect {
  padding: 10px 12px;
  background: var(--bg-surface);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  color: var(--text-primary);
  font-size: var(--text-sm);
  outline: none;
  cursor: pointer;
  transition: border-color 0.2s;
}

.filterSelect:focus,
.filterSelect:hover {
  border-color: var(--color-primary);
}

.btnPrimary {
  padding: 10px 20px;
  border-radius: var(--radius-lg);
  background: var(--color-primary);
  color: var(--bg-base);
  font-weight: 700;
  font-size: var(--text-sm);
  border: none;
  white-space: nowrap;
  transition: filter 0.2s;
}

.btnPrimary:hover {
  filter: brightness(1.1);
}

/* ---- Cell actions ---- */
.cellActions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.btnDelete {
  padding: 6px;
  border-radius: var(--radius-md);
  color: var(--text-muted);
  background: transparent;
  border: 1px solid transparent;
  transition: color 0.2s, background 0.2s;
}

.btnDelete:hover:not(:disabled) {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
}

.btnDelete:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ---- Form modal ---- */
.formModal {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.formGroup {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.formGroup label {
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--text-secondary);
}

.formGroup input,
.formGroup select {
  padding: 10px 12px;
  background: var(--bg-elevated);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: var(--text-sm);
}

.formGroup input:focus,
.formGroup select:focus {
  outline: none;
  border-color: var(--color-primary);
}

.formActions {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);
}

.btnSecondary {
  padding: 10px 18px;
  border-radius: var(--radius-lg);
  background: var(--bg-elevated);
  color: var(--text-secondary);
  font-weight: 600;
  font-size: var(--text-sm);
  border: 1px solid var(--border-default);
  transition: border-color 0.2s, color 0.2s;
}

.btnSecondary:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
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

.logHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-md);
}

.logHeaderTitle {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--text-primary);
}

.btnLogAdd {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border-radius: var(--radius-md);
  font-size: 12px;
  font-weight: 600;
  color: var(--color-primary);
  background: rgba(45, 212, 191, 0.1);
  border: 1px solid rgba(45, 212, 191, 0.25);
  cursor: pointer;
  transition: background 0.2s;
}

.btnLogAdd:hover {
  background: rgba(45, 212, 191, 0.2);
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
  flex: 1;
  position: relative;
}

.logActions {
  display: flex;
  gap: 4px;
  margin-top: 6px;
}

.logActionBtn {
  padding: 4px;
  border-radius: var(--radius-sm);
  color: var(--text-muted);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.2s, background 0.2s;
}

.logActionBtn:hover {
  color: var(--color-primary);
  background: rgba(45, 212, 191, 0.1);
}

.logActionBtnDanger:hover {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
}

.logEvent {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--text-primary);
}

.logDetails {
  margin-top: 4px;
}

.logMeta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 12px;
  color: var(--text-secondary);
}

.logStatusChange {
  color: var(--color-primary);
  font-weight: 600;
}

.logWarehouses {
  font-size: 11px;
  color: var(--text-muted);
  margin-top: 4px;
}

.logLabel {
  font-weight: 600;
  color: var(--text-secondary);
}

.logSeparator {
  margin: 0 6px;
  color: var(--border-default);
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
