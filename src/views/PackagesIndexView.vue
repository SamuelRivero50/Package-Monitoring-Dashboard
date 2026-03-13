<!-- @author David Hdez -->
<script setup lang="ts">
// external imports
import { ref, watch } from "vue";
import { RouterLink } from "vue-router";

// internal imports
import type { TrackingEventInterface } from "@/interfaces/TrackingEventInterface";
import { PackageService } from "@/services/PackageService";
import { TrackingEventService } from "@/services/TrackingEventService";
import { WarehouseService } from "@/services/WarehouseService";
import { formatWeight, formatDateTime } from "@/utils/formatters";

const packages = PackageService.getPackages();
const filteredPackages = ref(packages);

// selectors
const selectorStatuses = PackageService.getUniqueStatuses();
const selectorWarehouses = WarehouseService.getWarehouses();
const selectedStatus = ref("");
const selectedWarehouseId = ref<number | null>(null);

// expanded logs tracking
const expandedPackageId = ref<number | null>(null);

// log form
const logForm = ref({ location: "", description: "" });

function applyFilters(): void {
  filteredPackages.value = packages.filter((pkg) => {
    const matchStatus =
      !selectedStatus.value || pkg.status === selectedStatus.value;
    const matchWarehouse =
      selectedWarehouseId.value === null ||
      pkg.warehouseId === selectedWarehouseId.value;
    return matchStatus && matchWarehouse;
  });
}

watch([selectedStatus, selectedWarehouseId], () => applyFilters());

function getWarehouseName(warehouseId: number): string {
  return (
    WarehouseService.getWarehouseById(warehouseId)?.name ?? "Unknown Warehouse"
  );
}

function toggleLogs(packageId: number): void {
  if (expandedPackageId.value === packageId) {
    expandedPackageId.value = null;
  } else {
    expandedPackageId.value = packageId;
    logForm.value = { location: "", description: "" };
  }
}

function getEventsForPackage(packageId: number): TrackingEventInterface[] {
  return TrackingEventService.getTrackingEventsByPackageId(packageId);
}

function submitLog(packageId: number): void {
  if (!logForm.value.description.trim()) return;
  TrackingEventService.createTrackingEvent({
    packageId,
    location: logForm.value.location.trim(),
    description: logForm.value.description.trim(),
  });
  logForm.value = { location: "", description: "" };
}
</script>

<template>
  <section class="space-y-6">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h1 class="text-3xl font-black tracking-tight text-text-primary">
          Package Tracking
        </h1>
        <p class="text-text-secondary mt-1">
          Monitor and manage all your shipments.
        </p>
      </div>
      <RouterLink
        to="/packages/create"
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
              : 'bg-surface border border-border-default text-text-secondary'
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
              : 'bg-surface border border-border-default text-text-secondary'
          "
          @click="selectedStatus = status"
        >
          {{ status }}
        </button>
      </div>

      <!-- Warehouse dropdown selector -->
      <select
        v-model="selectedWarehouseId"
        class="select-control bg-surface border border-border-default rounded-xl px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-primary"
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

    <!-- Table -->
    <div
      class="bg-surface border border-border-default rounded-2xl overflow-hidden"
    >
      <table class="w-full text-left">
        <thead class="bg-elevated border-b border-border-default">
          <tr
            class="text-xs font-bold uppercase tracking-wider text-text-muted"
          >
            <th class="px-6 py-4">Tracking #</th>
            <th class="px-6 py-4">Description</th>
            <th class="px-6 py-4">Warehouse</th>
            <th class="px-6 py-4">Weight</th>
            <th class="px-6 py-4">Status</th>
            <th class="px-6 py-4">Logs</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-border-subtle">
          <template v-for="pkg in filteredPackages" :key="pkg.id">
            <tr class="hover:bg-elevated/50 transition-colors">
              <td class="px-6 py-4 font-mono text-sm text-packages">
                <RouterLink
                  :to="`/packages/${pkg.id}`"
                  class="hover:underline"
                  >{{ pkg.trackingNumber }}</RouterLink
                >
              </td>
              <td class="px-6 py-4 text-sm font-medium text-text-primary">
                {{ pkg.description }}
              </td>
              <td class="px-6 py-4 text-sm text-text-secondary">
                {{ getWarehouseName(pkg.warehouseId) }}
              </td>
              <td class="px-6 py-4 text-sm text-text-secondary">
                {{ formatWeight(pkg.weight) }}
              </td>
              <td class="px-6 py-4">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold"
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
              <td class="px-6 py-4">
                <button
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                  :class="
                    expandedPackageId === pkg.id
                      ? 'bg-primary text-base'
                      : 'bg-packages/10 text-packages border border-packages/20 hover:bg-packages/20'
                  "
                  @click="toggleLogs(pkg.id)"
                >
                  <span class="material-symbols-outlined text-sm">{{
                    expandedPackageId === pkg.id ? "expand_less" : "edit_note"
                  }}</span>
                  {{ expandedPackageId === pkg.id ? "Close" : "Edit Logs" }}
                </button>
              </td>
            </tr>

            <!-- Expanded logs panel -->
            <tr v-if="expandedPackageId === pkg.id">
              <td colspan="6" class="px-6 py-0">
                <div class="py-4 space-y-4 border-t border-primary/20">
                  <!-- Event list -->
                  <div class="flex items-center gap-2 mb-2">
                    <span class="material-symbols-outlined text-primary text-lg"
                      >history</span
                    >
                    <h4 class="text-sm font-bold text-text-primary">
                      Tracking Log for {{ pkg.trackingNumber }}
                    </h4>
                    <span class="text-xs text-text-muted"
                      >({{ getEventsForPackage(pkg.id).length }} events)</span
                    >
                  </div>

                  <div
                    v-if="getEventsForPackage(pkg.id).length > 0"
                    class="space-y-2 max-h-48 overflow-y-auto pr-2"
                  >
                    <div
                      v-for="event in getEventsForPackage(pkg.id)"
                      :key="event.id"
                      class="flex items-start gap-3 p-3 bg-elevated rounded-lg border border-border-subtle"
                    >
                      <div
                        class="mt-1 size-2 rounded-full bg-primary shrink-0"
                      ></div>
                      <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-text-primary">
                          {{ event.description }}
                        </p>
                        <div
                          class="flex items-center gap-3 mt-1 text-xs text-text-muted"
                        >
                          <span class="flex items-center gap-1">
                            <span class="material-symbols-outlined text-xs"
                              >location_on</span
                            >
                            {{ event.location }}
                          </span>
                          <span v-if="event.createdAt">{{
                            formatDateTime(event.createdAt)
                          }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p v-else class="text-text-muted text-sm">
                    No tracking events yet.
                  </p>

                  <!-- Add event form -->
                  <form
                    class="flex flex-col md:flex-row gap-3 pt-3 border-t border-border-subtle"
                    @submit.prevent="submitLog(pkg.id)"
                  >
                    <input
                      v-model="logForm.location"
                      type="text"
                      class="flex-1 bg-base border border-border-default rounded-lg py-2 px-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="Location (City, State)"
                      required
                    />
                    <input
                      v-model="logForm.description"
                      type="text"
                      class="flex-2 bg-base border border-border-default rounded-lg py-2 px-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="What happened with the package?"
                      required
                    />
                    <button
                      type="submit"
                      :disabled="!logForm.description.trim()"
                      class="bg-primary text-base font-bold py-2 px-4 rounded-lg text-sm hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all whitespace-nowrap"
                    >
                      <span class="flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-sm"
                          >add_circle</span
                        >
                        Add Event
                      </span>
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </section>
</template>
