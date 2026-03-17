<!-- @author David Hdez, Juan Andrés Young, Samuel Rivero -->
<script setup lang="ts">
// external imports
import type { Chart } from "chart.js";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { RouterLink, useRoute } from "vue-router";

// internal imports
import PackageEvents from "@/components/packages/PackageEvents.vue";
import StatusBadge from "@/components/shared/StatusBadge.vue";
import { AuthService } from "@/services/AuthService";
import { PackageService } from "@/services/PackageService";
import { UserService } from "@/services/UserService";
import { WarehouseService } from "@/services/WarehouseService";
import { buildBarChart } from "@/utils/chartUtils";

const route = useRoute();
const currentUser = AuthService.getCurrentUser();

const packages = computed(() => {
  const all = PackageService.getPackages();
  if (AuthService.isAdmin()) return all;
  return all.filter((pkg) => pkg.userId === currentUser?.id);
});
const filteredPackages = ref(packages.value);

// selectors
const selectorStatuses = PackageService.getUniqueStatuses();
const selectorWarehouses = WarehouseService.getWarehouses();
const selectedStatus = ref("");
const selectedWarehouseId = ref<number | null>(null);

// expanded history tracking
const expandedPackageId = ref<number | null>(null);

function applyFilters(): void {
  filteredPackages.value = packages.value.filter((pkg) => {
    const matchStatus =
      !selectedStatus.value || pkg.status === selectedStatus.value;
    const matchWarehouse =
      selectedWarehouseId.value === null ||
      pkg.warehouseId === selectedWarehouseId.value;
    return matchStatus && matchWarehouse;
  });
}

function deletePackage(id: number): void {
  PackageService.deletePackage(id);
  applyFilters();
}

watch([selectedStatus, selectedWarehouseId], () => applyFilters());

function getWarehouseName(warehouseId: number): string {
  return (
    WarehouseService.getWarehouseById(warehouseId)?.name ?? "Unknown Warehouse"
  );
}

function getUserName(userId: number): string {
  return UserService.getUserById(userId)?.name ?? "Unknown User";
}

function toggleHistory(packageId: number): void {
  if (expandedPackageId.value === packageId) {
    expandedPackageId.value = null;
  } else {
    expandedPackageId.value = packageId;
  }
}

// chart
const statusColors: Record<string, string> = {
  Delivered: "#10b981",
  "In Transit": "#f59e0b",
  "At Warehouse": "#2dd4bf",
  Pending: "#6b7280",
  Exception: "#f43f5e",
};

const canvasRef = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart | null = null;

onMounted(() => {
  if (!canvasRef.value) return;
  const counts: Record<string, number> = {};
  for (const pkg of packages.value) {
    counts[pkg.status] = (counts[pkg.status] ?? 0) + 1;
  }
  const labels = Object.keys(counts);
  const data = Object.values(counts);
  const colors = labels.map((l) => statusColors[l] ?? "#8b949e");
  chartInstance = buildBarChart(canvasRef.value, labels, data, colors);
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
          Package Tracking
        </h1>
        <p class="text-soft mt-1">
          Monitor and manage all your shipments.
        </p>
      </div>
      <RouterLink
        :to="{ name: 'packages.create', query: { from: route.fullPath } }"
        class="h-10 px-5 bg-primary text-base font-bold text-sm rounded-lg flex items-center gap-2 hover:bg-primary-dark transition-all w-fit"
      >
        <span class="material-symbols-outlined text-sm">add</span>
        New Package
      </RouterLink>
    </div>

    <!-- Filters -->
    <div class="flex flex-col md:flex-row gap-4 items-start md:items-center">
      <div class="flex gap-2 overflow-x-auto">
        <button
          class="px-4 py-2.5 rounded-xl font-medium text-sm transition-colors"
          :class="
            selectedStatus === ''
              ? 'bg-primary text-base'
              : 'bg-panel border border-wire text-soft'
          "
          @click="selectedStatus = ''"
        >
          All
        </button>
        <button
          v-for="status in selectorStatuses"
          :key="status"
          class="px-4 py-2.5 rounded-xl font-medium text-sm transition-colors whitespace-nowrap"
          :class="
            selectedStatus === status
              ? 'bg-primary text-base'
              : 'bg-panel border border-wire text-soft'
          "
          @click="selectedStatus = status"
        >
          {{ status }}
        </button>
      </div>

      <!-- Warehouse dropdown selector -->
      <select
        v-model="selectedWarehouseId"
        class="select-control bg-panel border border-wire rounded-xl px-4 py-2.5 text-sm text-body focus:outline-none focus:ring-1 focus:ring-primary"
      >
        <option :value="null">All Warehouses</option>
        <option
          v-for="warehouse in selectorWarehouses"
          :key="warehouse.id"
          :value="warehouse.id"
        >
          {{ warehouse.name }}
        </option>
      </select>
    </div>

    <!-- Chart -->
    <div class="bg-panel border border-wire rounded-2xl p-6">
      <h2 class="font-bold text-lg text-body mb-1">Packages by Status</h2>
      <p class="text-xs text-faded mb-4">Count of packages per status</p>
      <div class="h-52">
        <canvas ref="canvasRef" />
      </div>
    </div>

    <!-- Table -->
    <div
      class="bg-panel border border-wire rounded-2xl overflow-hidden"
    >
      <table class="w-full text-left">
        <thead class="bg-sheet border-b border-wire">
          <tr
            class="text-xs font-bold uppercase tracking-wider text-faded"
          >
            <th class="px-6 py-4">ID</th>
            <th class="px-6 py-4">Description</th>
            <th class="px-6 py-4">Owner</th>
            <th class="px-6 py-4">Warehouse</th>
            <th class="px-6 py-4">Status</th>
            <th class="px-6 py-4">Logs</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-wire-subtle">
          <template v-for="pkg in filteredPackages" :key="pkg.id">
            <tr class="hover:bg-sheet/50 transition-colors">
              <td class="px-6 py-4 font-mono text-sm text-packages">
                <RouterLink
                  :to="`/packages/${pkg.id}`"
                  class="hover:underline"
                  >#{{ pkg.id }}</RouterLink
                >
              </td>
              <td class="px-6 py-4 text-sm font-medium text-body">
                {{ pkg.description }}
              </td>
              <td class="px-6 py-4 text-sm text-soft">
                {{ getUserName(pkg.userId) }}
              </td>
              <td class="px-6 py-4 text-sm text-soft">
                {{ getWarehouseName(pkg.warehouseId) }}
              </td>
              <td class="px-6 py-4">
                <StatusBadge :status="pkg.status" />
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-2">
                  <button
                    class="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all"
                    :class="
                      expandedPackageId === pkg.id
                        ? 'bg-primary text-base'
                        : 'bg-packages/10 text-packages border border-packages/20 hover:bg-packages/20'
                    "
                    @click="toggleHistory(pkg.id)"
                    title="View history"
                  >
                    <span class="material-symbols-outlined text-sm">history</span>
                  </button>
                  <button
                    class="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20"
                    @click="deletePackage(pkg.id)"
                    title="Delete package"
                  >
                    <span class="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
              </td>
            </tr>

            <!-- Expanded history panel -->
            <tr v-if="expandedPackageId === pkg.id">
              <td colspan="5" class="px-6 py-0">
                <div class="py-4 border-t border-primary/20">
                  <PackageEvents :package-id="pkg.id" />
                </div>
              </td>
            </tr>

          </template>
        </tbody>
      </table>
    </div>
  </section>
</template>
