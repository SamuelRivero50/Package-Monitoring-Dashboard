<!-- @author David Hdez -->
<script setup lang="ts">
// external imports
import type { Chart } from "chart.js";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { RouterLink } from "vue-router";

// internal imports
import { buildPieChart } from "@/utils/chartUtils";
import StatusBadge from "@/components/shared/StatusBadge.vue";
import { PackageService } from "@/services/PackageService";
import { UserService } from "@/services/UserService";
import { WarehouseService } from "@/services/WarehouseService";

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
  chartInstance = buildPieChart(
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
        class="bg-panel p-6 rounded-xl border border-wire"
      >
        <div class="flex justify-between items-start mb-4">
          <div
            class="p-2 rounded-lg"
            :class="{
              'bg-packages/15 text-packages': stat.color === 'packages',
              'bg-warehouses/15 text-warehouses': stat.color === 'warehouses',
              'bg-users-icon/15 text-users-icon': stat.color === 'users',
              'bg-primary/15 text-primary': stat.color === 'primary',
            }"
          >
            <span class="material-symbols-outlined">{{ stat.icon }}</span>
          </div>
        </div>
        <p class="text-soft text-sm font-medium">{{ stat.label }}</p>
        <h3 class="text-2xl font-bold mt-1 text-body">
          {{ stat.val }}
        </h3>
      </div>
    </div>

    <!-- Chart + Recent Packages -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-panel border border-wire rounded-xl p-6">
        <h2 class="font-bold text-lg text-body mb-1">Package Status</h2>
        <p class="text-xs text-faded mb-4">
          Distribution by current status
        </p>
        <div class="h-64">
          <canvas ref="canvasRef" />
        </div>
      </div>

      <div
        class="bg-panel rounded-xl border border-wire overflow-hidden"
      >
        <div
          class="p-6 border-b border-wire flex justify-between items-center"
        >
          <h2 class="font-bold text-lg text-body">Recent Packages</h2>
          <RouterLink
            to="/packages"
            class="text-link text-sm font-medium hover:underline"
            >View all</RouterLink
          >
        </div>
        <table class="w-full text-left text-sm">
          <thead class="text-faded bg-sheet">
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
          <tbody class="divide-y divide-wire-subtle">
            <tr
              v-for="pkg in recentPackages"
              :key="pkg.id"
              class="hover:bg-sheet/50 transition-colors"
            >
              <td class="px-6 py-4 font-mono text-packages">
                #{{ pkg.id }}
              </td>
              <td class="px-6 py-4">
                <StatusBadge :status="pkg.status" />
              </td>
              <td class="px-6 py-4 text-soft">
                {{ getWarehouseName(pkg.warehouseId) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Warehouse Overview -->
    <div
      class="bg-panel border border-wire rounded-xl p-6 space-y-4"
    >
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-lg font-bold text-body">Warehouses</h2>
          <p class="text-xs text-faded">Capacity overview</p>
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
          v-for="warehouse in warehouses"
          :key="warehouse.id"
          to="/warehouses"
          class="p-4 bg-sheet rounded-lg border border-wire-subtle hover:border-warehouses/40 transition-colors group"
        >
          <div class="flex items-center justify-between mb-2">
            <h4
              class="text-sm font-bold text-body group-hover:text-warehouses transition-colors"
            >
              {{ warehouse.name }}
            </h4>
          </div>
          <p class="text-faded text-xs flex items-center gap-1">
            <span class="material-symbols-outlined text-xs">location_on</span
            >{{ warehouse.location }}
          </p>
          <div class="mt-3">
            <div class="flex justify-between text-[10px] mb-1">
              <span class="text-soft">Capacity</span>
              <span class="font-bold text-primary"
                >{{ Math.round((warehouse.currentLoad / warehouse.capacity) * 100) }}%</span
              >
            </div>
            <div class="h-1.5 w-full bg-canvas rounded-full overflow-hidden">
              <div
                class="h-full rounded-full transition-all"
                :class="
                  warehouse.currentLoad / warehouse.capacity > 0.9
                    ? 'bg-red-500'
                    : 'bg-primary'
                "
                :style="{
                  width: Math.round((warehouse.currentLoad / warehouse.capacity) * 100) + '%',
                }"
              ></div>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
