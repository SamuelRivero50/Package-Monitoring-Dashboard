<script setup lang="ts">
/**
 * @author Samuel Rivero, Law
 * @description Warehouse management view - capacity cards, Leaflet map, and packages per warehouse.
 */
import { ref, computed } from 'vue'
import AppSidebar from '@/components/AppSidebar.vue'
import AppModal from '@/components/AppModal.vue'
import DashboardHeader from '@/components/DashboardHeader.vue'
import LeafletMap from '@/components/LeafletMap.vue'
import { usePackagesStore } from '@/stores/packages'
import type { WarehouseInterface } from '@/interfaces'

const store = usePackagesStore()

const expandedWh = ref<string | null>(null)
const showCreateModal = ref(false)
const editingWh = ref<WarehouseInterface | null>(null)
const deletingId = ref<string | null>(null)

const form = ref({
  name: '',
  location: '',
  capacity: 0,
  managerName: '',
  imageUrl: '',
})

/** Known city → lat/lng lookup for warehouse locations on the map. */
const CITY_COORDS: Record<string, [number, number]> = {
  'chicago, il': [41.8781, -87.6298],
  'los angeles, ca': [34.0522, -118.2437],
  'newark, nj': [40.7357, -74.1724],
  'atlanta, ga': [33.749, -84.388],
  'new york, ny': [40.7128, -74.006],
  'houston, tx': [29.7604, -95.3698],
  'phoenix, az': [33.4484, -112.074],
  'dallas, tx': [32.7767, -96.797],
  'miami, fl': [25.7617, -80.1918],
  'seattle, wa': [47.6062, -122.3321],
  'denver, co': [39.7392, -104.9903],
  'boston, ma': [42.3601, -71.0589],
}

const warehouseMarkers = computed(() =>
  store.warehouses
    .map((wh) => {
      const coords = CITY_COORDS[wh.location.toLowerCase()]
      if (!coords) return null
      return {
        id: wh.id,
        label: wh.name,
        lat: coords[0],
        lng: coords[1],
        popupHtml: `<b>${wh.name}</b><br>${wh.location} — ${wh.capacity}% capacity`,
      }
    })
    .filter((m): m is NonNullable<typeof m> => m !== null),
)

// Connect mapped warehouses in a sequential loop to simulate cargo routes
const warehouseRoutes = computed(() => {
  const ids = warehouseMarkers.value.map((m) => m.id)
  return ids.map((id, i) => ({ fromId: id, toId: ids[(i + 1) % ids.length] }))
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

function toggleWh(id: string) {
  expandedWh.value = expandedWh.value === id ? null : id
}

function openCreate() {
  form.value = { name: '', location: '', capacity: 0, managerName: '', imageUrl: '' }
  showCreateModal.value = true
}

function openEdit(wh: WarehouseInterface) {
  form.value = {
    name: wh.name,
    location: wh.location,
    capacity: wh.capacity,
    managerName: wh.managerName,
    imageUrl: wh.imageUrl ?? '',
  }
  editingWh.value = wh
}

function closeEdit() {
  editingWh.value = null
}

async function submitCreate() {
  if (!form.value.name.trim()) return
  await store.createWarehouse({
    name: form.value.name.trim(),
    location: form.value.location.trim(),
    capacity: Number(form.value.capacity) || 0,
    managerName: form.value.managerName.trim(),
    imageUrl: form.value.imageUrl.trim() || undefined,
  })
  showCreateModal.value = false
}

async function submitEdit() {
  if (!editingWh.value || !form.value.name.trim()) return
  await store.updateWarehouse({
    id: editingWh.value.id,
    name: form.value.name.trim(),
    location: form.value.location.trim(),
    capacity: Number(form.value.capacity) || 0,
    managerName: form.value.managerName.trim(),
    imageUrl: form.value.imageUrl.trim() || undefined,
  })
  closeEdit()
}

async function confirmDelete(id: string, e: Event) {
  e.stopPropagation()
  if (!confirm('Delete this warehouse? Packages assigned to it will be unassigned.')) return
  deletingId.value = id
  await store.removeWarehouse(id)
  deletingId.value = null
  if (expandedWh.value === id) expandedWh.value = null
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
          <button class="btnPrimary" @click="openCreate">Add New Hub</button>
        </div>

        <!-- Cards grid -->
        <div class="whGrid">
          <div v-for="wh in store.warehouses" :key="wh.id" class="whCardWrapper">
            <div
              class="whCard"
              :class="{ whCardActive: expandedWh === wh.id }"
              @click="toggleWh(wh.id)"
            >
              <div class="whCardActions">
                <button
                  class="whActionBtn"
                  title="Edit"
                  @click.stop="openEdit(wh)"
                >
                  <span class="material-symbols-outlined">edit</span>
                </button>
                <button
                  class="whActionBtn whActionBtnDanger"
                  :disabled="deletingId === wh.id"
                  title="Delete"
                  @click="confirmDelete(wh.id, $event)"
                >
                  <span class="material-symbols-outlined">delete</span>
                </button>
              </div>
              <div class="whImageWrap">
                <img :src="wh.imageUrl" :alt="wh.name" class="whImage" />
                <div class="whActiveBadge">Active</div>
                <div class="whPkgCount">
                  <span class="material-symbols-outlined" style="font-size: 14px">package_2</span>
                  {{ store.packagesForWarehouse(wh.id).length }}
                </div>
              </div>
              <div class="whBody">
                <div class="whNameRow">
                  <h3 class="whName">{{ wh.name }}</h3>
                  <span class="material-symbols-outlined whChevron">{{
                    expandedWh === wh.id ? 'expand_less' : 'expand_more'
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

        <!-- Warehouse Location Map -->
        <div class="mapSection">
          <div class="mapHeader">
            <h2 class="mapTitle">
              <span class="material-symbols-outlined" style="font-size: 20px; vertical-align: middle">map</span>
              Hub Locations
            </h2>
            <span class="mapCount">{{ warehouseMarkers.length }} mapped</span>
          </div>
          <div class="mapContainer">
            <LeafletMap :markers="warehouseMarkers" :routes="warehouseRoutes" />
          </div>
        </div>
      </div>
    </main>

    <!-- Create Warehouse Modal -->
    <AppModal :show="showCreateModal" title="Add New Hub" @close="showCreateModal = false">
      <form class="formModal" @submit.prevent="submitCreate">
        <div class="formGroup">
          <label for="wh-name">Name</label>
          <input id="wh-name" v-model="form.name" required type="text" placeholder="e.g. Central Hub" />
        </div>
        <div class="formGroup">
          <label for="wh-location">Location</label>
          <input id="wh-location" v-model="form.location" required type="text" placeholder="e.g. Chicago, IL" />
        </div>
        <div class="formGroup">
          <label for="wh-capacity">Capacity (%)</label>
          <input id="wh-capacity" v-model.number="form.capacity" required type="number" min="0" max="100" />
        </div>
        <div class="formGroup">
          <label for="wh-manager">Manager Name</label>
          <input id="wh-manager" v-model="form.managerName" type="text" placeholder="e.g. John Smith" />
        </div>
        <div class="formGroup">
          <label for="wh-image">Image URL</label>
          <input id="wh-image" v-model="form.imageUrl" type="url" placeholder="https://..." />
        </div>
        <div class="formActions">
          <button type="button" class="btnSecondary" @click="showCreateModal = false">Cancel</button>
          <button type="submit" class="btnPrimary">Create</button>
        </div>
      </form>
    </AppModal>

    <!-- Edit Warehouse Modal -->
    <AppModal :show="!!editingWh" title="Edit Warehouse" @close="closeEdit">
      <form v-if="editingWh" class="formModal" @submit.prevent="submitEdit">
        <div class="formGroup">
          <label for="wh-edit-name">Name</label>
          <input id="wh-edit-name" v-model="form.name" required type="text" />
        </div>
        <div class="formGroup">
          <label for="wh-edit-location">Location</label>
          <input id="wh-edit-location" v-model="form.location" required type="text" />
        </div>
        <div class="formGroup">
          <label for="wh-edit-capacity">Capacity (%)</label>
          <input id="wh-edit-capacity" v-model.number="form.capacity" required type="number" min="0" max="100" />
        </div>
        <div class="formGroup">
          <label for="wh-edit-manager">Manager Name</label>
          <input id="wh-edit-manager" v-model="form.managerName" type="text" />
        </div>
        <div class="formGroup">
          <label for="wh-edit-image">Image URL</label>
          <input id="wh-edit-image" v-model="form.imageUrl" type="url" />
        </div>
        <div class="formActions">
          <button type="button" class="btnSecondary" @click="closeEdit">Cancel</button>
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

/* ---- Map Section ---- */
.mapSection {
  background: var(--bg-surface);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.mapHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md) var(--spacing-lg);
  border-bottom: 1px solid var(--border-default);
}

.mapTitle {
  font-size: var(--text-base);
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.mapCount {
  font-size: var(--text-xs);
  color: var(--text-secondary);
  font-weight: 600;
}

.mapContainer {
  height: 300px;
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
  position: relative;
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

.whCardActions {
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  gap: 6px;
  z-index: 2;
}

.whActionBtn {
  padding: 6px;
  border-radius: var(--radius-md);
  background: rgba(13, 17, 23, 0.72);
  backdrop-filter: blur(8px);
  color: var(--text-primary);
  border: 1px solid var(--border-default);
  transition: background 0.2s, color 0.2s;
}

.whActionBtn:hover {
  background: var(--bg-elevated);
  color: var(--color-primary);
}

.whActionBtnDanger:hover {
  color: #ef4444;
}

.whActionBtn:disabled {
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

.formGroup input {
  padding: 10px 12px;
  background: var(--bg-elevated);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: var(--text-sm);
}

.formGroup input:focus {
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
