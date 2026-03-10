<script setup lang="ts">
/**
 * @author Samuel Rivero, Law
 * @description Warehouse management view - capacity cards, Leaflet map, and packages per warehouse.
 */

// framework
import { ref, computed } from 'vue'

// stores
import { usePackagesStore } from '@/stores/packages'

// components
import AppSidebar from '@/components/AppSidebar.vue'
import AppModal from '@/components/AppModal.vue'
import DashboardHeader from '@/components/DashboardHeader.vue'
import LeafletMap from '@/components/LeafletMap.vue'

// utils
import { statusBadgeClass } from '@/utils/packageStatus'

// types
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

const warehouseRoutes = computed(() => {
  const ids = warehouseMarkers.value.map((m) => m.id)
  return ids.map((id, i) => ({ fromId: id, toId: ids[(i + 1) % ids.length]! }))
})

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
  <div class="flex min-h-screen bg-canvas">
    <AppSidebar activePage="/warehouses" />

    <main class="flex-1 flex flex-col min-w-0 overflow-hidden">
      <DashboardHeader title="Facility Management" />

      <div class="flex-1 overflow-y-auto p-8 flex flex-col gap-8">
        <!-- Title row -->
        <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 class="text-[32px] font-black tracking-[-0.5px]">Warehouse Hubs</h1>
            <p class="text-soft text-sm mt-1">Real-time capacity and performance monitoring.</p>
          </div>
          <button
            class="self-start px-5 py-2.5 rounded-xl bg-primary text-canvas font-bold text-sm whitespace-nowrap transition-[filter] duration-200 hover:brightness-110"
            @click="openCreate"
          >
            Add New Hub
          </button>
        </div>

        <!-- Cards grid -->
        <div
          class="grid grid-cols-1 gap-6 sm:grid-cols-2 [grid-template-columns:repeat(auto-fill,minmax(260px,1fr))]"
        >
          <div v-for="wh in store.warehouses" :key="wh.id" class="flex flex-col">
            <div
              :class="[
                'relative bg-panel border rounded-xl overflow-hidden flex flex-col transition-[border-color] duration-200 cursor-pointer select-none hover:border-primary/25',
                expandedWh === wh.id ? '!border-primary rounded-b-none' : 'border-wire',
              ]"
              @click="toggleWh(wh.id)"
            >
              <!-- Action buttons -->
              <div class="absolute top-3 right-3 flex gap-1.5 z-[2]">
                <button
                  class="p-1.5 rounded-lg bg-canvas/72 backdrop-blur text-body border border-wire transition-[background,color] duration-200 hover:bg-sheet hover:text-primary"
                  title="Edit"
                  @click.stop="openEdit(wh)"
                >
                  <span class="material-symbols-outlined" style="font-size: 16px">edit</span>
                </button>
                <button
                  :class="[
                    'p-1.5 rounded-lg bg-canvas/72 backdrop-blur text-body border border-wire transition-[background,color] duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:not-disabled:bg-sheet hover:not-disabled:text-red-500',
                  ]"
                  :disabled="deletingId === wh.id"
                  title="Delete"
                  @click="confirmDelete(wh.id, $event)"
                >
                  <span class="material-symbols-outlined" style="font-size: 16px">delete</span>
                </button>
              </div>

              <!-- Image -->
              <div class="h-40 relative overflow-hidden">
                <img
                  :src="wh.imageUrl"
                  :alt="wh.name"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.08]"
                  :class="{ 'scale-[1.08]': expandedWh === wh.id }"
                />
                <div
                  class="absolute bottom-3 left-4 bg-primary/20 backdrop-blur px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase text-primary tracking-[0.04em]"
                >
                  Active
                </div>
                <div
                  class="absolute bottom-3 right-3 flex items-center gap-1 bg-canvas/72 backdrop-blur px-2.5 py-0.5 rounded-md text-[11px] font-bold text-body"
                >
                  <span class="material-symbols-outlined" style="font-size: 14px">package_2</span>
                  {{ store.packagesForWarehouse(wh.id).length }}
                </div>
              </div>

              <!-- Body -->
              <div class="p-5 flex-1 flex flex-col">
                <div class="flex items-center justify-between">
                  <h3 class="text-lg font-bold">{{ wh.name }}</h3>
                  <span class="material-symbols-outlined text-faded" style="font-size: 20px">
                    {{ expandedWh === wh.id ? 'expand_less' : 'expand_more' }}
                  </span>
                </div>
                <p class="flex items-center gap-1 text-soft text-xs mt-1">
                  <span class="material-symbols-outlined" style="font-size: 14px">location_on</span>
                  {{ wh.location }}
                </p>
                <div class="mt-auto pt-4 border-t border-wire-subtle">
                  <div class="flex justify-between text-xs mb-2">
                    <span>Capacity</span>
                    <span
                      :class="['font-bold', wh.capacity >= 90 ? 'text-red-500' : 'text-primary']"
                      >{{ wh.capacity }}%</span
                    >
                  </div>
                  <div class="h-2 w-full bg-sheet rounded-full overflow-hidden">
                    <div
                      :class="[
                        'h-full rounded-full transition-[width] duration-500',
                        wh.capacity >= 90 ? 'bg-red-500' : 'bg-primary',
                      ]"
                      :style="{ width: wh.capacity + '%' }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Expanded packages panel -->
            <div
              v-if="expandedWh === wh.id"
              class="bg-sheet border border-primary border-t-0 rounded-b-xl px-4 pt-4 pb-6 overflow-x-auto"
            >
              <p class="text-sm font-bold text-primary mb-4 flex items-center gap-1.5">
                <span
                  class="material-symbols-outlined"
                  style="font-size: 16px; vertical-align: middle"
                  >package_2</span
                >
                Packages assigned to {{ wh.name }}
              </p>
              <div
                v-if="store.packagesForWarehouse(wh.id).length === 0"
                class="text-sm text-faded text-center py-4"
              >
                No packages assigned yet.
              </div>
              <table v-else class="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th
                      class="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.06em] text-faded text-left border-b border-wire"
                    >
                      Tracking #
                    </th>
                    <th
                      class="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.06em] text-faded text-left border-b border-wire"
                    >
                      Description
                    </th>
                    <th
                      class="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.06em] text-faded text-left border-b border-wire"
                    >
                      Status
                    </th>
                    <th
                      class="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.06em] text-faded text-left border-b border-wire"
                    >
                      User
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="pkg in store.packagesForWarehouse(wh.id)"
                    :key="pkg.id"
                    class="border-b border-wire-subtle transition-colors duration-150 hover:bg-primary/4"
                  >
                    <td class="px-3 py-2.5 font-mono text-primary font-semibold">{{ pkg.id }}</td>
                    <td class="px-3 py-2.5">{{ pkg.description }}</td>
                    <td class="px-3 py-2.5">
                      <span
                        :class="[
                          'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-[0.04em]',
                          statusBadgeClass(pkg.status),
                        ]"
                        >{{ pkg.status }}</span
                      >
                    </td>
                    <td class="px-3 py-2.5 text-soft">{{ pkg.userId }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Map section -->
        <div class="bg-panel border border-wire rounded-xl overflow-hidden">
          <div class="flex justify-between items-center px-6 py-4 border-b border-wire">
            <h2 class="text-base font-bold flex items-center gap-2">
              <span
                class="material-symbols-outlined"
                style="font-size: 20px; vertical-align: middle"
                >map</span
              >
              Hub Locations
            </h2>
            <span class="text-xs text-soft font-semibold"
              >{{ warehouseMarkers.length }} mapped</span
            >
          </div>
          <div class="h-[300px]">
            <LeafletMap :markers="warehouseMarkers" :routes="warehouseRoutes" />
          </div>
        </div>
      </div>
    </main>

    <!-- Create Warehouse Modal -->
    <AppModal :show="showCreateModal" title="Add New Hub" @close="showCreateModal = false">
      <form class="flex flex-col gap-4" @submit.prevent="submitCreate">
        <div class="flex flex-col gap-1">
          <label class="text-xs font-semibold text-soft" for="wh-name">Name</label>
          <input
            id="wh-name"
            v-model="form.name"
            required
            type="text"
            placeholder="e.g. Central Hub"
            class="py-2.5 px-3 bg-sheet border border-wire rounded-lg text-body text-sm outline-none focus:border-primary"
          />
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-xs font-semibold text-soft" for="wh-location">Location</label>
          <input
            id="wh-location"
            v-model="form.location"
            required
            type="text"
            placeholder="e.g. Chicago, IL"
            class="py-2.5 px-3 bg-sheet border border-wire rounded-lg text-body text-sm outline-none focus:border-primary"
          />
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-xs font-semibold text-soft" for="wh-capacity">Capacity (%)</label>
          <input
            id="wh-capacity"
            v-model.number="form.capacity"
            required
            type="number"
            min="0"
            max="100"
            class="py-2.5 px-3 bg-sheet border border-wire rounded-lg text-body text-sm outline-none focus:border-primary"
          />
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-xs font-semibold text-soft" for="wh-manager">Manager Name</label>
          <input
            id="wh-manager"
            v-model="form.managerName"
            type="text"
            placeholder="e.g. John Smith"
            class="py-2.5 px-3 bg-sheet border border-wire rounded-lg text-body text-sm outline-none focus:border-primary"
          />
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-xs font-semibold text-soft" for="wh-image">Image URL</label>
          <input
            id="wh-image"
            v-model="form.imageUrl"
            type="url"
            placeholder="https://..."
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

    <!-- Edit Warehouse Modal -->
    <AppModal :show="!!editingWh" title="Edit Warehouse" @close="closeEdit">
      <form v-if="editingWh" class="flex flex-col gap-4" @submit.prevent="submitEdit">
        <div class="flex flex-col gap-1">
          <label class="text-xs font-semibold text-soft" for="wh-edit-name">Name</label>
          <input
            id="wh-edit-name"
            v-model="form.name"
            required
            type="text"
            class="py-2.5 px-3 bg-sheet border border-wire rounded-lg text-body text-sm outline-none focus:border-primary"
          />
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-xs font-semibold text-soft" for="wh-edit-location">Location</label>
          <input
            id="wh-edit-location"
            v-model="form.location"
            required
            type="text"
            class="py-2.5 px-3 bg-sheet border border-wire rounded-lg text-body text-sm outline-none focus:border-primary"
          />
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-xs font-semibold text-soft" for="wh-edit-capacity">Capacity (%)</label>
          <input
            id="wh-edit-capacity"
            v-model.number="form.capacity"
            required
            type="number"
            min="0"
            max="100"
            class="py-2.5 px-3 bg-sheet border border-wire rounded-lg text-body text-sm outline-none focus:border-primary"
          />
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-xs font-semibold text-soft" for="wh-edit-manager">Manager Name</label>
          <input
            id="wh-edit-manager"
            v-model="form.managerName"
            type="text"
            class="py-2.5 px-3 bg-sheet border border-wire rounded-lg text-body text-sm outline-none focus:border-primary"
          />
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-xs font-semibold text-soft" for="wh-edit-image">Image URL</label>
          <input
            id="wh-edit-image"
            v-model="form.imageUrl"
            type="url"
            class="py-2.5 px-3 bg-sheet border border-wire rounded-lg text-body text-sm outline-none focus:border-primary"
          />
        </div>
        <div class="flex justify-end gap-2 mt-4">
          <button
            type="button"
            class="px-4.5 py-2.5 rounded-xl bg-sheet text-soft font-semibold text-sm border border-wire transition-[border-color,color] duration-200 hover:border-primary hover:text-primary"
            @click="closeEdit"
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
