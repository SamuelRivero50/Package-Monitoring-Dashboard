<!-- @author David Hdez -->
<script setup lang="ts">
// external imports
import type { Chart } from "chart.js";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";

// internal imports
import { WarehouseService } from "@/services/WarehouseService";
import { ChartUtils } from "@/utils/ChartUtils";
import LeafletMap from "@/components/warehouses/LeafletMap.vue";
import type { MapRoute } from "@/components/warehouses/LeafletMap.vue";

const warehouses = WarehouseService.getWarehouses();
const filteredWarehouses = ref(warehouses);

// selectors
const selectorLocations = WarehouseService.getUniqueLocations();
const selectedLocation = ref("");

function applyFilters(): void {
  filteredWarehouses.value = warehouses.filter((wh) => {
    return !selectedLocation.value || wh.location === selectedLocation.value;
  });
}

watch([selectedLocation], () => applyFilters());

// map
const CITY_COORDS: Record<string, [number, number]> = {
  "chicago, il": [41.8781, -87.6298],
  "los angeles, ca": [34.0522, -118.2437],
  "newark, nj": [40.7357, -74.1724],
  "atlanta, ga": [33.749, -84.388],
};

const warehouseMarkers = computed(() =>
  filteredWarehouses.value
    .map((wh) => {
      const coords = CITY_COORDS[wh.location.toLowerCase()];
      if (!coords) return null;
      const pct = Math.round((wh.currentLoad / wh.capacity) * 100);
      return {
        id: String(wh.id),
        label: wh.name,
        lat: coords[0],
        lng: coords[1],
        popupHtml: `<b>${wh.name}</b><br>${wh.location}<br>Capacity: ${pct}%`,
      };
    })
    .filter((m): m is NonNullable<typeof m> => m !== null),
);

const warehouseRoutes = computed<MapRoute[]>(() => {
  const ids = warehouseMarkers.value.map((m) => m.id);
  return ids.map((id, i) => ({ fromId: id, toId: ids[(i + 1) % ids.length]! }));
});

// chart
const canvasRef = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart | null = null;

onMounted(() => {
  if (!canvasRef.value) return;
  const labels = warehouses.map((wh) => wh.name);
  const data = warehouses.map((wh) =>
    Math.round((wh.currentLoad / wh.capacity) * 100),
  );
  const colors = data.map((pct) => (pct > 90 ? "#f43f5e" : "#2dd4bf"));
  chartInstance = ChartUtils.buildBarChart(canvasRef.value, labels, data, colors);
});

onUnmounted(() => {
  chartInstance?.destroy();
  chartInstance = null;
});
</script>

<template>
  <section class="space-y-6">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h1 class="text-3xl font-black tracking-tight text-body">
          Warehouse Hubs
        </h1>
        <p class="text-soft mt-1">
          Real-time capacity and performance monitoring.
        </p>
      </div>
    </div>

    <!-- Filters -->
    <div class="flex flex-col md:flex-row gap-4 items-start md:items-center">
      <select
        v-model="selectedLocation"
        class="select-control bg-panel border border-wire rounded-xl px-4 py-2.5 text-sm text-body focus:outline-none focus:ring-1 focus:ring-primary"
      >
        <option value="">All Locations</option>
        <option v-for="loc in selectorLocations" :key="loc" :value="loc">
          {{ loc }}
        </option>
      </select>
    </div>

    <!-- Map -->
    <div class="bg-panel border border-wire rounded-2xl p-6">
      <h2 class="font-bold text-lg text-body mb-1">Warehouse Locations</h2>
      <p class="text-xs text-faded mb-4">Live route network across all hubs</p>
      <div class="h-80 rounded-xl overflow-hidden">
        <LeafletMap :markers="warehouseMarkers" :routes="warehouseRoutes" />
      </div>
    </div>

    <!-- Chart -->
    <div class="bg-panel border border-wire rounded-2xl p-6">
      <h2 class="font-bold text-lg text-body mb-1">Capacity Usage</h2>
      <p class="text-xs text-faded mb-4">Current load as % of capacity per warehouse</p>
      <div class="h-52">
        <canvas ref="canvasRef" />
      </div>
    </div>

    <!-- Table view -->
    <div
      class="bg-panel border border-wire rounded-2xl overflow-hidden"
    >
      <table class="w-full text-left">
        <thead class="bg-sheet border-b border-wire">
          <tr
            class="text-xs font-bold uppercase tracking-wider text-faded"
          >
            <th class="px-6 py-4">Name</th>
            <th class="px-6 py-4">Location</th>
            <th class="px-6 py-4">Manager</th>
            <th class="px-6 py-4">Capacity</th>
            <th class="px-6 py-4">Load</th>
            <th class="px-6 py-4">Usage</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-wire-subtle">
          <tr
            v-for="wh in filteredWarehouses"
            :key="wh.id"
            class="hover:bg-sheet/50 transition-colors"
          >
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <div class="p-2 bg-warehouses/15 rounded-lg text-warehouses">
                  <span class="material-symbols-outlined text-sm"
                    >warehouse</span
                  >
                </div>
                <span class="text-sm font-bold text-body">{{
                  wh.name
                }}</span>
              </div>
            </td>
            <td class="px-6 py-4 text-sm text-soft">
              <span class="flex items-center gap-1">
                <span class="material-symbols-outlined text-xs"
                  >location_on</span
                >
                {{ wh.location }}
              </span>
            </td>
            <td class="px-6 py-4 text-sm text-soft">
              {{ wh.managerName }}
            </td>
            <td class="px-6 py-4 text-sm text-soft">
              {{ wh.capacity.toLocaleString() }}
            </td>
            <td class="px-6 py-4 text-sm text-soft">
              {{ wh.currentLoad.toLocaleString() }}
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <div class="w-20 h-2 bg-sheet rounded-full overflow-hidden">
                  <div
                    class="h-full rounded-full transition-all"
                    :class="
                      wh.currentLoad / wh.capacity > 0.9
                        ? 'bg-red-500'
                        : 'bg-primary'
                    "
                    :style="{
                      width:
                        Math.round((wh.currentLoad / wh.capacity) * 100) + '%',
                    }"
                  ></div>
                </div>
                <span class="text-xs font-bold text-primary"
                  >{{ Math.round((wh.currentLoad / wh.capacity) * 100) }}%</span
                >
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
