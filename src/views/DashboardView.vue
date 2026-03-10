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

const warehouseRoutes = [
  { fromId: 'wh-2', toId: 'wh-1' },
  { fromId: 'wh-1', toId: 'wh-3' },
  { fromId: 'wh-1', toId: 'wh-4' },
  { fromId: 'wh-4', toId: 'wh-3' },
]
</script>

<template>
  <div class="flex min-h-screen bg-canvas">
    <AppSidebar activePage="/dashboard" />

    <main class="flex-1 flex flex-col min-w-0">
      <DashboardHeader title="System Overview" />

      <!-- Content -->
      <div class="p-8 flex flex-col gap-8 overflow-y-auto">

        <!-- Stat Cards -->
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div
            v-for="card in statCards"
            :key="card.label"
            class="bg-panel p-6 rounded-xl border border-wire transition-[border-color] duration-200 hover:border-primary/25"
          >
            <div class="flex justify-between items-start mb-4">
              <div :class="['p-2 rounded-lg flex items-center justify-center', card.iconColorClass]">
                <span class="material-symbols-outlined text-white" style="font-size:22px">{{ card.icon }}</span>
              </div>
              <span :class="['text-xs font-bold flex items-center gap-0.5', trendClass(card.trend)]">
                <span v-if="card.trend !== 0" class="material-symbols-outlined" style="font-size:14px">
                  {{ card.trend > 0 ? 'trending_up' : 'trending_down' }}
                </span>
                {{ trendLabel(card.trend) }}
              </span>
            </div>
            <p class="text-sm font-medium text-soft">{{ card.label }}</p>
            <h3 class="text-2xl font-bold mt-1 leading-none">{{ card.value }}</h3>
          </div>
        </div>

        <!-- Middle row: Table + Status summary -->
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
          <!-- Recent Packages -->
          <div class="bg-panel rounded-xl border border-wire overflow-hidden flex flex-col transition-[border-color] duration-200 hover:border-primary/25">
            <div class="p-6 border-b border-wire flex justify-between items-center">
              <h2 class="text-lg font-bold">Recent Packages</h2>
              <button class="text-primary text-sm font-medium hover:underline">View all</button>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-left text-sm border-collapse">
                <thead>
                  <tr class="bg-sheet text-soft">
                    <th class="px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.08em]">Tracking #</th>
                    <th class="px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.08em]">Description</th>
                    <th class="px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.08em]">Status</th>
                    <th class="px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.08em]">Updated</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="row in recentPackages"
                    :key="row.trackingId"
                    class="border-t border-wire transition-colors duration-150 hover:bg-sheet"
                  >
                    <td class="px-6 py-3.5 font-medium font-mono text-link">{{ row.trackingId }}</td>
                    <td class="px-6 py-3.5 font-medium">{{ row.description }}</td>
                    <td class="px-6 py-3.5">
                      <span :class="['rounded px-2.5 py-0.5 text-xs font-medium inline-block', row.statusClass]">{{ row.status }}</span>
                    </td>
                    <td class="px-6 py-3.5 text-faded">{{ row.updatedAgo }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Status Summary -->
          <div class="bg-panel rounded-xl border border-wire p-6 flex flex-col transition-[border-color] duration-200 hover:border-primary/25">
            <h2 class="text-lg font-bold mb-4">Status Summary</h2>
            <div class="flex-1 flex flex-col justify-center items-center gap-6">
              <DonutChart
                :labels="chartLabels"
                :values="chartValues"
                :colors="chartColors"
                :center-value="totalLabel"
                center-label="Total"
              />
              <div class="w-full mt-8 flex flex-col gap-2">
                <div class="flex items-center justify-between text-sm font-medium">
                  <div class="flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-primary"></span>
                    <span>Delivered</span>
                  </div>
                  <span class="font-bold text-sm">65%</span>
                </div>
                <div class="flex items-center justify-between text-sm font-medium">
                  <div class="flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span>In Transit</span>
                  </div>
                  <span class="font-bold text-sm">25%</span>
                </div>
                <div class="flex items-center justify-between text-sm font-medium">
                  <div class="flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-soft"></span>
                    <span>Warehouse</span>
                  </div>
                  <span class="font-bold text-sm">10%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Warehouses Section -->
        <div class="bg-panel border border-wire rounded-xl p-6 transition-[border-color] duration-200 hover:border-primary/25">
          <div class="flex justify-between items-start mb-6">
            <div>
              <h2 class="text-lg font-bold">Warehouses</h2>
              <p class="text-sm text-soft mt-0.5">Real-time capacity and utilization across locations</p>
            </div>
            <button class="bg-primary text-canvas font-bold px-4 py-2.5 rounded-lg text-sm transition-opacity duration-150 hover:opacity-90">
              Add Warehouse
            </button>
          </div>
          <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
            <!-- Warehouse card 1 -->
            <div class="p-4 rounded-xl border border-wire bg-canvas">
              <div class="flex items-center gap-2 mb-4">
                <div class="w-10 h-10 rounded-lg bg-primary/15 text-primary flex items-center justify-center">
                  <span class="material-symbols-outlined">location_on</span>
                </div>
                <div>
                  <h4 class="text-sm font-bold">North Region Hub</h4>
                  <p class="text-[11px] text-soft uppercase font-bold">Chicago, IL</p>
                </div>
              </div>
              <div class="flex flex-col gap-2">
                <div class="flex justify-between text-xs font-semibold">
                  <span class="text-soft">Capacity</span>
                  <span>88%</span>
                </div>
                <div class="h-2 w-full bg-wire-subtle rounded-full overflow-hidden">
                  <div class="h-full bg-primary rounded-full" style="width: 88%"></div>
                </div>
                <p class="text-[10px] text-faded text-right">8,800 / 10,000 pallets</p>
              </div>
            </div>
            <!-- Warehouse card 2 -->
            <div class="p-4 rounded-xl border border-wire bg-canvas">
              <div class="flex items-center gap-2 mb-4">
                <div class="w-10 h-10 rounded-lg bg-primary/15 text-primary flex items-center justify-center">
                  <span class="material-symbols-outlined">location_on</span>
                </div>
                <div>
                  <h4 class="text-sm font-bold">West Coast Center</h4>
                  <p class="text-[11px] text-soft uppercase font-bold">Long Beach, CA</p>
                </div>
              </div>
              <div class="flex flex-col gap-2">
                <div class="flex justify-between text-xs font-semibold">
                  <span class="text-soft">Capacity</span>
                  <span>42%</span>
                </div>
                <div class="h-2 w-full bg-wire-subtle rounded-full overflow-hidden">
                  <div class="h-full bg-primary rounded-full" style="width: 42%"></div>
                </div>
                <p class="text-[10px] text-faded text-right">6,300 / 15,000 pallets</p>
              </div>
            </div>
            <!-- Warehouse card 3 -->
            <div class="p-4 rounded-xl border border-wire bg-canvas">
              <div class="flex items-center gap-2 mb-4">
                <div class="w-10 h-10 rounded-lg bg-primary/15 text-primary flex items-center justify-center">
                  <span class="material-symbols-outlined">location_on</span>
                </div>
                <div>
                  <h4 class="text-sm font-bold">East Distribution</h4>
                  <p class="text-[11px] text-soft uppercase font-bold">Newark, NJ</p>
                </div>
              </div>
              <div class="flex flex-col gap-2">
                <div class="flex justify-between text-xs font-semibold">
                  <span class="text-soft">Capacity</span>
                  <span class="text-red-400 font-bold">94%</span>
                </div>
                <div class="h-2 w-full bg-wire-subtle rounded-full overflow-hidden">
                  <div class="h-full bg-red-400 rounded-full" style="width: 94%"></div>
                </div>
                <p class="text-[10px] text-faded text-right">11,280 / 12,000 pallets</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Live Map -->
        <div class="relative h-[360px] rounded-xl overflow-hidden border border-wire">
          <LeafletMap :markers="warehouseMarkers" :routes="warehouseRoutes" />
          <div class="absolute top-4 right-4 bg-canvas/80 backdrop-blur px-3 py-1.5 rounded-lg border border-primary/20 z-[1000]">
            <span class="text-[10px] font-bold uppercase tracking-[0.1em] text-primary">Status: Operational</span>
          </div>
        </div>

      </div>
    </main>
  </div>
</template>
