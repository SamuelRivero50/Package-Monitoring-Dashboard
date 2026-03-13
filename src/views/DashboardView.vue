<!-- @author David Hdez -->
<script setup lang="ts">
// external imports
import { computed, onMounted, onUnmounted, ref } from "vue";
import { RouterLink } from "vue-router";
import type { Chart } from "chart.js";

// internal imports
import { PackageService } from "@/services/PackageService";
import { WarehouseService } from "@/services/WarehouseService";
import { UserService } from "@/services/UserService";
import { ChartUtils } from "@/utils/ChartUtils";

const packages = computed(() => PackageService.getPackages());
const warehouses = computed(() => WarehouseService.getWarehouses());
const recentPackages = computed(() =>
  [...packages.value].sort((a, b) => b.id - a.id).slice(0, 5),
);

const statusColors: Record<string, string> = {
  Delivered: "#10b981",
  "In Transit": "#f59e0b",
  "At Warehouse": "#2dd4bf",
  Pending: "#6b7280",
  Exception: "#f43f5e",
};

const canvasRef = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart | null = null;

function getWarehouseName(warehouseId: number): string {
  return (
    WarehouseService.getWarehouseById(warehouseId)?.name ?? "Unknown Warehouse"
  );
}

onMounted(() => {
  if (!canvasRef.value) return;
  const counts: Record<string, number> = {};
  for (const pkg of packages.value) {
    counts[pkg.status] = (counts[pkg.status] ?? 0) + 1;
  }
  const labels = Object.keys(counts);
  const data = Object.values(counts);
  const colors = labels.map((label) => statusColors[label] ?? "#8b949e");
  chartInstance = ChartUtils.buildPieChart(
    canvasRef.value,
    labels,
    data,
    colors,
  );
});

onUnmounted(() => {
  chartInstance?.destroy();
  chartInstance = null;
});
</script>

<template>
  <section class="space-y-8">
    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="(stat, i) in [
          {
            icon: 'inventory_2',
            label: 'Total Packages',
            val: packages.length,
            color: 'packages',
          },
          {
            icon: 'warehouse',
            label: 'Warehouses',
            val: warehouses.length,
            color: 'warehouses',
          },
          {
            icon: 'group',
            label: 'Users',
            val: UserService.getUsers().length,
            color: 'users',
          },
          {
            icon: 'check_circle',
            label: 'Delivered',
            val: packages.filter((pkg) => pkg.status === 'Delivered').length,
            color: 'primary',
          },
        ]"
        :key="i"
        class="bg-surface p-6 rounded-xl border border-border-default"
      >
        <div class="flex justify-between items-start mb-4">
          <div
            class="p-2 rounded-lg"
            :class="{
              'bg-packages/15 text-packages': stat.color === 'packages',
              'bg-warehouses/15 text-warehouses': stat.color === 'warehouses',
              'bg-users/15 text-users': stat.color === 'users',
              'bg-primary/15 text-primary': stat.color === 'primary',
            }"
          >
            <span class="material-symbols-outlined">{{ stat.icon }}</span>
          </div>
        </div>
        <p class="text-text-secondary text-sm font-medium">{{ stat.label }}</p>
        <h3 class="text-2xl font-bold mt-1 text-text-primary">
          {{ stat.val }}
        </h3>
      </div>
    </div>

    <!-- Chart + Recent Packages -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-surface border border-border-default rounded-xl p-6">
        <h2 class="font-bold text-lg text-text-primary mb-1">Package Status</h2>
        <p class="text-xs text-text-muted mb-4">
          Distribution by current status
        </p>
        <div class="h-64">
          <canvas ref="canvasRef" />
        </div>
      </div>

      <div
        class="bg-surface rounded-xl border border-border-default overflow-hidden"
      >
        <div
          class="p-6 border-b border-border-default flex justify-between items-center"
        >
          <h2 class="font-bold text-lg text-text-primary">Recent Packages</h2>
          <RouterLink
            to="/packages"
            class="text-link text-sm font-medium hover:underline"
            >View all</RouterLink
          >
        </div>
        <table class="w-full text-left text-sm">
          <thead class="text-text-muted bg-elevated">
            <tr>
              <th
                class="px-6 py-4 font-semibold uppercase tracking-wider text-[10px]"
              >
                Tracking #
              </th>
              <th
                class="px-6 py-4 font-semibold uppercase tracking-wider text-[10px]"
              >
                Status
              </th>
              <th
                class="px-6 py-4 font-semibold uppercase tracking-wider text-[10px]"
              >
                Warehouse
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border-subtle">
            <tr
              v-for="pkg in recentPackages"
              :key="pkg.id"
              class="hover:bg-elevated/50 transition-colors"
            >
              <td class="px-6 py-4 font-mono text-packages">
                {{ pkg.trackingNumber }}
              </td>
              <td class="px-6 py-4">
                <span
                  class="px-2 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide"
                  :class="{
                    'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20':
                      pkg.status === 'Delivered',
                    'bg-amber-500/10 text-amber-400 border border-amber-500/20':
                      pkg.status === 'In Transit',
                    'bg-primary/10 text-primary border border-primary/20':
                      pkg.status === 'At Warehouse',
                    'bg-gray-500/10 text-text-muted border border-gray-500/20':
                      pkg.status === 'Pending',
                    'bg-rose-500/10 text-rose-400 border border-rose-500/20':
                      pkg.status === 'Exception',
                  }"
                >
                  {{ pkg.status }}
                </span>
              </td>
              <td class="px-6 py-4 text-text-secondary">
                {{ getWarehouseName(pkg.warehouseId) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Warehouse Overview -->
    <div
      class="bg-surface border border-border-default rounded-xl p-6 space-y-4"
    >
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-lg font-bold text-text-primary">Warehouses</h2>
          <p class="text-xs text-text-muted">Capacity overview</p>
        </div>
        <RouterLink
          to="/warehouses"
          class="px-4 py-2 rounded-lg bg-warehouses/10 text-warehouses text-sm font-bold hover:bg-warehouses/20 transition-colors"
        >
          Manage
        </RouterLink>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <RouterLink
          v-for="wh in warehouses"
          :key="wh.id"
          to="/warehouses"
          class="p-4 bg-elevated rounded-lg border border-border-subtle hover:border-warehouses/40 transition-colors group"
        >
          <div class="flex items-center justify-between mb-2">
            <h4
              class="text-sm font-bold text-text-primary group-hover:text-warehouses transition-colors"
            >
              {{ wh.name }}
            </h4>
            <span
              class="px-1.5 py-0.5 rounded-full text-[9px] font-bold uppercase"
              :class="
                wh.status === 'Active'
                  ? 'bg-users/10 text-users'
                  : 'bg-companies/10 text-companies'
              "
            >
              {{ wh.status }}
            </span>
          </div>
          <p class="text-text-muted text-xs flex items-center gap-1">
            <span class="material-symbols-outlined text-xs">location_on</span
            >{{ wh.location }}
          </p>
          <div class="mt-3">
            <div class="flex justify-between text-[10px] mb-1">
              <span class="text-text-secondary">Capacity</span>
              <span class="font-bold text-primary"
                >{{ Math.round((wh.currentLoad / wh.capacity) * 100) }}%</span
              >
            </div>
            <div class="h-1.5 w-full bg-base rounded-full overflow-hidden">
              <div
                class="h-full rounded-full transition-all"
                :class="
                  wh.currentLoad / wh.capacity > 0.9
                    ? 'bg-red-500'
                    : 'bg-primary'
                "
                :style="{
                  width: Math.round((wh.currentLoad / wh.capacity) * 100) + '%',
                }"
              ></div>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
