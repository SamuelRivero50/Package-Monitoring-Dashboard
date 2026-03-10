<script setup lang="ts">
/**
 * @author Samuel Rivero , Juan Andrés Young Hoyos
 * @description Package Tracking view - table with warehouse assignment and log history.
 */

// framework
import { ref, computed } from 'vue'

// stores
import { usePackagesStore } from '@/stores/packages'
import { useUsersStore } from '@/stores/users'

// components
import AppSidebar from '@/components/AppSidebar.vue'
import AppModal from '@/components/AppModal.vue'
import DashboardHeader from '@/components/DashboardHeader.vue'
import BarChart from '@/components/BarChart.vue'

// utils
import { statusBadgeClass } from '@/utils/packageStatus'

// types
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

const warehouseOptions = computed(() => store.warehouses.map((w) => ({ id: w.id, name: w.name })))

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

const statusBreakdown = computed(() => {
  const statuses = ['Pending', 'In Transit', 'Delivered', 'Exception']
  return {
    labels: statuses,
    values: statuses.map((s) => store.packages.filter((p) => p.status === s).length),
    colors: ['#8b949e', '#f59e0b', '#2dd4bf', '#ef4444'],
  }
})

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
  logForm.value = { fromWarehouseId: '', toWarehouseId: '', newStatus: '', description: '' }
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
  <div class="flex min-h-screen bg-canvas">
    <AppSidebar activePage="/packages" />

    <main class="flex-1 flex flex-col min-w-0 overflow-hidden">
      <DashboardHeader title="Package Tracking" />

      <div class="flex-1 overflow-y-auto p-8 flex flex-col gap-6">
        <!-- Filters -->
        <div class="flex flex-col gap-4 md:flex-row">
          <div class="relative flex-1">
            <span
              class="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-faded"
              style="font-size: 18px"
              >search</span
            >
            <input
              v-model="searchQuery"
              class="w-full py-2.5 pl-[42px] pr-4 bg-panel border border-wire rounded-xl text-body text-sm outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-faded focus:border-primary focus:shadow-[0_0_0_3px_rgba(45,212,191,0.12)]"
              placeholder="Search by tracking #..."
              type="text"
            />
          </div>
          <select
            v-model="statusFilter"
            class="py-2.5 px-3 bg-panel border border-wire rounded-xl text-body text-sm outline-none cursor-pointer transition-[border-color] duration-200 hover:border-primary focus:border-primary"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
            <option value="Exception">Exception</option>
          </select>
          <select
            v-model="warehouseFilter"
            class="py-2.5 px-3 bg-panel border border-wire rounded-xl text-body text-sm outline-none cursor-pointer transition-[border-color] duration-200 hover:border-primary focus:border-primary"
          >
            <option value="">All Warehouses</option>
            <option v-for="wh in warehouseOptions" :key="wh.id" :value="wh.id">
              {{ wh.name }}
            </option>
          </select>
          <button
            class="px-5 py-2.5 rounded-xl bg-primary text-canvas font-bold text-sm whitespace-nowrap transition-[filter] duration-200 hover:brightness-110"
            @click="showCreateModal = true"
          >
            New Package
          </button>
        </div>

        <!-- Status Bar Chart -->
        <div class="bg-panel border border-wire rounded-2xl p-6">
          <p class="text-sm font-bold text-soft mb-4 uppercase tracking-[0.06em]">
            Packages by Status
          </p>
          <div class="h-[200px]">
            <BarChart
              :labels="statusBreakdown.labels"
              :values="statusBreakdown.values"
              :colors="statusBreakdown.colors"
            />
          </div>
        </div>

        <!-- Table -->
        <div class="bg-panel border border-wire rounded-2xl overflow-hidden">
          <table class="w-full text-left border-collapse">
            <thead class="bg-sheet border-b border-wire">
              <tr>
                <th class="px-6 py-4 text-xs font-bold uppercase tracking-[0.06em] text-faded">
                  Tracking #
                </th>
                <th class="px-6 py-4 text-xs font-bold uppercase tracking-[0.06em] text-faded">
                  Description
                </th>
                <th class="px-6 py-4 text-xs font-bold uppercase tracking-[0.06em] text-faded">
                  User
                </th>
                <th class="px-6 py-4 text-xs font-bold uppercase tracking-[0.06em] text-faded">
                  Status
                </th>
                <th class="px-6 py-4 text-xs font-bold uppercase tracking-[0.06em] text-faded">
                  Warehouse
                </th>
                <th class="px-6 py-4 text-xs font-bold uppercase tracking-[0.06em] text-faded">
                  Updated
                </th>
                <th class="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody>
              <template v-for="pkg in filteredPackages" :key="pkg.id">
                <tr
                  class="border-b border-wire-subtle transition-colors duration-150 hover:bg-primary/4"
                >
                  <td class="px-6 py-4 text-sm font-mono text-primary font-semibold">
                    {{ pkg.id }}
                  </td>
                  <td class="px-6 py-4 text-sm font-medium">{{ pkg.description }}</td>
                  <td class="px-6 py-4 text-sm">{{ pkg.userId }}</td>
                  <td class="px-6 py-4 text-sm">
                    <span
                      :class="[
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-[0.04em]',
                        statusBadgeClass(pkg.status),
                      ]"
                    >
                      {{ pkg.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-sm">
                    <select
                      class="wh-select py-1.5 pl-2.5 pr-7 bg-sheet border border-wire rounded-lg text-body text-[12px] font-medium outline-none cursor-pointer appearance-none transition-[border-color] duration-200 min-w-[120px] hover:border-primary focus:border-primary"
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
                  <td class="px-6 py-4 text-sm text-soft">1 hour ago</td>
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-2">
                      <button
                        class="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-[12px] font-semibold whitespace-nowrap text-primary bg-primary/8 border border-primary/18 cursor-pointer transition-[background,border-color] duration-200 hover:bg-primary/16 hover:border-primary"
                        @click="toggleLog(pkg.id)"
                      >
                        <span class="material-symbols-outlined" style="font-size: 18px">{{
                          expandedRow === pkg.id ? 'expand_less' : 'expand_more'
                        }}</span>
                        <span>{{ expandedRow === pkg.id ? 'Hide' : 'Details' }}</span>
                      </button>
                      <button
                        class="p-1.5 rounded-lg text-faded border border-transparent transition-[color,background] duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:not-disabled:text-red-500 hover:not-disabled:bg-red-500/10"
                        :disabled="deletingId === pkg.id"
                        title="Delete"
                        @click="confirmDelete(pkg.id)"
                      >
                        <span class="material-symbols-outlined" style="font-size: 16px"
                          >delete</span
                        >
                      </button>
                    </div>
                  </td>
                </tr>
                <!-- Tracking log expandable row -->
                <tr v-if="expandedRow === pkg.id" class="bg-sheet">
                  <td colspan="7" class="px-6 pt-4 pb-6">
                    <div class="flex items-center justify-between mb-4">
                      <span class="text-sm font-bold text-body">Tracking Log</span>
                      <button
                        class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[12px] font-semibold text-primary bg-primary/10 border border-primary/25 cursor-pointer transition-colors duration-200 hover:bg-primary/20"
                        @click="openAddLog(pkg.id)"
                      >
                        <span class="material-symbols-outlined" style="font-size: 16px">add</span>
                        Add Log
                      </button>
                    </div>
                    <div class="flex flex-col pl-4">
                      <div
                        v-for="(entry, i) in pkg.logHistory"
                        :key="entry.id"
                        class="flex gap-4 min-h-[48px]"
                      >
                        <div class="flex flex-col items-center w-4 shrink-0">
                          <span
                            :class="[
                              'w-2.5 h-2.5 rounded-full shrink-0 mt-1.5',
                              i === 0
                                ? 'bg-primary shadow-[0_0_0_3px_rgba(45,212,191,0.2)]'
                                : 'bg-wire',
                            ]"
                          ></span>
                          <span
                            v-if="i < pkg.logHistory.length - 1"
                            class="flex-1 w-0.5 bg-wire min-h-6"
                          ></span>
                        </div>
                        <div class="pb-4 flex-1">
                          <p class="text-sm font-semibold text-body">{{ entry.description }}</p>
                          <div class="mt-1">
                            <p class="flex items-center flex-wrap gap-2 text-[12px] text-soft">
                              <span class="ml-2 text-faded">{{
                                formatLogTimestamp(entry.timestamp)
                              }}</span>
                              <span
                                v-if="entry.previousStatus || entry.newStatus"
                                class="text-primary font-semibold"
                              >
                                {{ entry.previousStatus || '—' }} → {{ entry.newStatus || '—' }}
                              </span>
                            </p>
                            <p
                              v-if="entry.fromWarehouseId || entry.toWarehouseId"
                              class="text-[11px] text-faded mt-1"
                            >
                              <span v-if="entry.fromWarehouseId">
                                <span class="font-semibold text-soft">Desde:</span>
                                {{ warehouseName(entry.fromWarehouseId) }}
                              </span>
                              <span
                                v-if="entry.fromWarehouseId && entry.toWarehouseId"
                                class="mx-1.5 text-wire"
                                >·</span
                              >
                              <span v-if="entry.toWarehouseId">
                                <span class="font-semibold text-soft">Hacia:</span>
                                {{ warehouseName(entry.toWarehouseId) }}
                              </span>
                            </p>
                          </div>
                          <div class="flex gap-1 mt-1.5">
                            <button
                              class="p-1 rounded-md text-faded transition-[color,background] duration-200 hover:text-primary hover:bg-primary/10"
                              title="Edit"
                              @click="openEditLog(entry, pkg.id)"
                            >
                              <span class="material-symbols-outlined" style="font-size: 14px"
                                >edit</span
                              >
                            </button>
                            <button
                              class="p-1 rounded-md text-faded transition-[color,background] duration-200 hover:text-red-500 hover:bg-red-500/10"
                              title="Delete"
                              @click="confirmDeleteLog(entry.id, pkg.id)"
                            >
                              <span class="material-symbols-outlined" style="font-size: 14px"
                                >delete</span
                              >
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
      <form class="flex flex-col gap-4" @submit.prevent="submitCreate">
        <div class="flex flex-col gap-1">
          <label class="text-xs font-semibold text-soft" for="pkg-userId">User</label>
          <select
            id="pkg-userId"
            v-model="form.userId"
            required
            class="py-2.5 px-3 bg-sheet border border-wire rounded-lg text-body text-sm outline-none focus:border-primary"
          >
            <option value="">— Select —</option>
            <option v-for="u in usersStore.users" :key="u.id" :value="u.id">
              {{ u.name }} ({{ u.email }})
            </option>
          </select>
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-xs font-semibold text-soft" for="pkg-warehouse">Warehouse</label>
          <select
            id="pkg-warehouse"
            v-model="form.warehouseId"
            class="py-2.5 px-3 bg-sheet border border-wire rounded-lg text-body text-sm outline-none focus:border-primary"
          >
            <option value="">— None —</option>
            <option v-for="wh in warehouseOptions" :key="wh.id" :value="wh.id">
              {{ wh.name }}
            </option>
          </select>
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-xs font-semibold text-soft" for="pkg-status">Status</label>
          <select
            id="pkg-status"
            v-model="form.status"
            class="py-2.5 px-3 bg-sheet border border-wire rounded-lg text-body text-sm outline-none focus:border-primary"
          >
            <option value="Pending">Pending</option>
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
            <option value="Exception">Exception</option>
          </select>
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-xs font-semibold text-soft" for="pkg-desc">Description</label>
          <input
            id="pkg-desc"
            v-model="form.description"
            required
            type="text"
            placeholder="e.g. Electronics Kit"
            class="py-2.5 px-3 bg-sheet border border-wire rounded-lg text-body text-sm outline-none focus:border-primary"
          />
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-xs font-semibold text-soft" for="pkg-price">Price</label>
          <input
            id="pkg-price"
            v-model.number="form.price"
            required
            type="number"
            step="0.01"
            min="0"
            class="py-2.5 px-3 bg-sheet border border-wire rounded-lg text-body text-sm outline-none focus:border-primary"
          />
        </div>
        <div class="flex justify-end gap-2 mt-4">
          <button
            type="button"
            class="px-4.5 py-2.5 rounded-xl bg-sheet text-soft font-semibold text-sm border border-wire transition-[border-color,color] duration-200 hover:border-primary hover:text-primary"
            @click="showCreateModal = false"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-5 py-2.5 rounded-xl bg-primary text-canvas font-bold text-sm transition-[filter] duration-200 hover:brightness-110"
          >
            Create
          </button>
        </div>
      </form>
    </AppModal>

    <!-- Create Log Modal -->
    <AppModal :show="showLogCreateModal" title="Add Log Entry" @close="showLogCreateModal = false">
      <form class="flex flex-col gap-4" @submit.prevent="submitLogCreate">
        <div class="flex flex-col gap-1">
          <label class="text-xs font-semibold text-soft" for="log-from">From Warehouse</label>
          <select
            id="log-from"
            v-model="logForm.fromWarehouseId"
            class="py-2.5 px-3 bg-sheet border border-wire rounded-lg text-body text-sm outline-none focus:border-primary"
          >
            <option value="">— None —</option>
            <option v-for="wh in warehouseOptions" :key="wh.id" :value="wh.id">
              {{ wh.name }}
            </option>
          </select>
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-xs font-semibold text-soft" for="log-to">To Warehouse</label>
          <select
            id="log-to"
            v-model="logForm.toWarehouseId"
            class="py-2.5 px-3 bg-sheet border border-wire rounded-lg text-body text-sm outline-none focus:border-primary"
          >
            <option value="">— None —</option>
            <option v-for="wh in warehouseOptions" :key="wh.id" :value="wh.id">
              {{ wh.name }}
            </option>
          </select>
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-xs font-semibold text-soft" for="log-new">New Status</label>
          <select
            id="log-new"
            v-model="logForm.newStatus"
            class="py-2.5 px-3 bg-sheet border border-wire rounded-lg text-body text-sm outline-none focus:border-primary"
          >
            <option value="Pending">Pending</option>
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
            <option value="Exception">Exception</option>
          </select>
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-xs font-semibold text-soft" for="log-desc">Description</label>
          <input
            id="log-desc"
            v-model="logForm.description"
            required
            type="text"
            placeholder="e.g. Picked up from warehouse"
            class="py-2.5 px-3 bg-sheet border border-wire rounded-lg text-body text-sm outline-none focus:border-primary"
          />
        </div>
        <div class="flex justify-end gap-2 mt-4">
          <button
            type="button"
            class="px-4.5 py-2.5 rounded-xl bg-sheet text-soft font-semibold text-sm border border-wire transition-[border-color,color] duration-200 hover:border-primary hover:text-primary"
            @click="showLogCreateModal = false"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-5 py-2.5 rounded-xl bg-primary text-canvas font-bold text-sm transition-[filter] duration-200 hover:brightness-110"
          >
            Add
          </button>
        </div>
      </form>
    </AppModal>

    <!-- Edit Log Modal -->
    <AppModal :show="!!editingLog" title="Edit Log Entry" @close="closeEditLog">
      <form v-if="editingLog" class="flex flex-col gap-4" @submit.prevent="submitLogEdit">
        <div class="flex flex-col gap-1">
          <label class="text-xs font-semibold text-soft" for="log-edit-from">From Warehouse</label>
          <select
            id="log-edit-from"
            v-model="logForm.fromWarehouseId"
            class="py-2.5 px-3 bg-sheet border border-wire rounded-lg text-body text-sm outline-none focus:border-primary"
          >
            <option value="">— None —</option>
            <option v-for="wh in warehouseOptions" :key="wh.id" :value="wh.id">
              {{ wh.name }}
            </option>
          </select>
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-xs font-semibold text-soft" for="log-edit-to">To Warehouse</label>
          <select
            id="log-edit-to"
            v-model="logForm.toWarehouseId"
            class="py-2.5 px-3 bg-sheet border border-wire rounded-lg text-body text-sm outline-none focus:border-primary"
          >
            <option value="">— None —</option>
            <option v-for="wh in warehouseOptions" :key="wh.id" :value="wh.id">
              {{ wh.name }}
            </option>
          </select>
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-xs font-semibold text-soft" for="log-edit-new">New Status</label>
          <select
            id="log-edit-new"
            v-model="logForm.newStatus"
            class="py-2.5 px-3 bg-sheet border border-wire rounded-lg text-body text-sm outline-none focus:border-primary"
          >
            <option value="Pending">Pending</option>
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
            <option value="Exception">Exception</option>
          </select>
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-xs font-semibold text-soft" for="log-edit-desc">Description</label>
          <input
            id="log-edit-desc"
            v-model="logForm.description"
            required
            type="text"
            class="py-2.5 px-3 bg-sheet border border-wire rounded-lg text-body text-sm outline-none focus:border-primary"
          />
        </div>
        <div class="flex justify-end gap-2 mt-4">
          <button
            type="button"
            class="px-4.5 py-2.5 rounded-xl bg-sheet text-soft font-semibold text-sm border border-wire transition-[border-color,color] duration-200 hover:border-primary hover:text-primary"
            @click="closeEditLog"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-5 py-2.5 rounded-xl bg-primary text-canvas font-bold text-sm transition-[filter] duration-200 hover:brightness-110"
          >
            Save
          </button>
        </div>
      </form>
    </AppModal>
  </div>
</template>

<style scoped>
.wh-select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238b949e' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 8px center;
}
</style>
