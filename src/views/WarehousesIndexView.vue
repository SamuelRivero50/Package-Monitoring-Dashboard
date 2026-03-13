<!-- @author David Hdez -->
<script setup lang="ts">
// external imports
import { ref, watch } from "vue";

// internal imports
import { WarehouseService } from "@/services/WarehouseService";
import type { CreateWarehouseDTO } from "@/dtos/CreateWarehouseDTO";

const warehouses = WarehouseService.getWarehouses();
const filteredWarehouses = ref(warehouses);

// selectors
const selectorStatuses = WarehouseService.getUniqueStatuses();
const selectorLocations = WarehouseService.getUniqueLocations();
const selectedStatus = ref("");
const selectedLocation = ref("");

// form state
const showForm = ref(false);
const name = ref("");
const location = ref("");
const capacity = ref(1000);
const currentLoad = ref(0);
const status = ref("Active");
const successMessage = ref("");

function applyFilters(): void {
  filteredWarehouses.value = warehouses.filter((wh) => {
    const matchStatus =
      !selectedStatus.value || wh.status === selectedStatus.value;
    const matchLocation =
      !selectedLocation.value || wh.location === selectedLocation.value;
    return matchStatus && matchLocation;
  });
}

watch([selectedStatus, selectedLocation], () => applyFilters());

function submitForm(): void {
  const newWarehouse: CreateWarehouseDTO = {
    name: name.value,
    location: location.value,
    capacity: capacity.value,
    currentLoad: currentLoad.value,
    status: status.value,
  };

  WarehouseService.createWarehouse(newWarehouse);
  successMessage.value = "Warehouse created successfully!";
  name.value = "";
  location.value = "";
  capacity.value = 1000;
  currentLoad.value = 0;
  status.value = "Active";
  showForm.value = false;
}
</script>

<template>
  <section class="space-y-6">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h1 class="text-3xl font-black tracking-tight text-text-primary">
          Warehouse Hubs
        </h1>
        <p class="text-text-secondary mt-1">
          Real-time capacity and performance monitoring.
        </p>
      </div>
      <button
        class="h-10 px-5 bg-primary text-base font-bold text-sm rounded-lg flex items-center gap-2 hover:bg-primary-dark transition-all w-fit"
        @click="showForm = !showForm"
      >
        <span class="material-symbols-outlined text-sm">{{
          showForm ? "close" : "add"
        }}</span>
        {{ showForm ? "Cancel" : "Add Warehouse" }}
      </button>
    </div>

    <!-- Filters -->
    <div class="flex flex-col md:flex-row gap-4 items-start md:items-center">
      <select
        v-model="selectedStatus"
        class="select-control bg-surface border border-border-default rounded-xl px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-primary"
      >
        <option value="">All Statuses</option>
        <option v-for="s in selectorStatuses" :key="s" :value="s">
          {{ s }}
        </option>
      </select>

      <select
        v-model="selectedLocation"
        class="select-control bg-surface border border-border-default rounded-xl px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-primary"
      >
        <option value="">All Locations</option>
        <option v-for="loc in selectorLocations" :key="loc" :value="loc">
          {{ loc }}
        </option>
      </select>
    </div>

    <!-- Create warehouse form -->
    <form
      v-if="showForm"
      class="bg-surface border border-border-default rounded-xl p-6 space-y-4"
      @submit.prevent="submitForm"
    >
      <h3 class="text-lg font-bold text-text-primary">New Warehouse</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            class="block text-sm font-semibold text-text-secondary mb-2"
            for="whName"
            >Name</label
          >
          <input
            v-model="name"
            type="text"
            id="whName"
            class="w-full bg-elevated border border-border-default rounded-lg p-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-primary"
            required
            placeholder="Warehouse name"
          />
        </div>
        <div>
          <label
            class="block text-sm font-semibold text-text-secondary mb-2"
            for="whLocation"
            >Location</label
          >
          <input
            v-model="location"
            type="text"
            id="whLocation"
            class="w-full bg-elevated border border-border-default rounded-lg p-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-primary"
            required
            placeholder="City, State"
          />
        </div>
        <div>
          <label
            class="block text-sm font-semibold text-text-secondary mb-2"
            for="whCapacity"
            >Capacity</label
          >
          <input
            v-model.number="capacity"
            type="number"
            min="1"
            id="whCapacity"
            class="w-full bg-elevated border border-border-default rounded-lg p-3 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-primary"
            required
          />
        </div>
        <div>
          <label
            class="block text-sm font-semibold text-text-secondary mb-2"
            for="whStatus"
            >Status</label
          >
          <select
            v-model="status"
            id="whStatus"
            class="select-control w-full bg-elevated border border-border-default rounded-lg p-3 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="Active">Active</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </div>
      </div>
      <button
        type="submit"
        class="bg-primary text-base font-bold py-2.5 px-6 rounded-lg text-sm hover:bg-primary-dark transition-all"
      >
        Create Warehouse
      </button>
    </form>

    <p v-if="successMessage" class="text-users font-medium text-sm">
      {{ successMessage }}
    </p>

    <!-- Table view -->
    <div
      class="bg-surface border border-border-default rounded-2xl overflow-hidden"
    >
      <table class="w-full text-left">
        <thead class="bg-elevated border-b border-border-default">
          <tr
            class="text-xs font-bold uppercase tracking-wider text-text-muted"
          >
            <th class="px-6 py-4">Name</th>
            <th class="px-6 py-4">Location</th>
            <th class="px-6 py-4">Capacity</th>
            <th class="px-6 py-4">Load</th>
            <th class="px-6 py-4">Usage</th>
            <th class="px-6 py-4">Status</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-border-subtle">
          <tr
            v-for="wh in filteredWarehouses"
            :key="wh.id"
            class="hover:bg-elevated/50 transition-colors"
          >
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <div class="p-2 bg-warehouses/15 rounded-lg text-warehouses">
                  <span class="material-symbols-outlined text-sm"
                    >warehouse</span
                  >
                </div>
                <span class="text-sm font-bold text-text-primary">{{
                  wh.name
                }}</span>
              </div>
            </td>
            <td class="px-6 py-4 text-sm text-text-secondary">
              <span class="flex items-center gap-1">
                <span class="material-symbols-outlined text-xs"
                  >location_on</span
                >
                {{ wh.location }}
              </span>
            </td>
            <td class="px-6 py-4 text-sm text-text-secondary">
              {{ wh.capacity.toLocaleString() }}
            </td>
            <td class="px-6 py-4 text-sm text-text-secondary">
              {{ wh.currentLoad.toLocaleString() }}
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <div class="w-20 h-2 bg-elevated rounded-full overflow-hidden">
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
            <td class="px-6 py-4">
              <span
                class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide"
                :class="
                  wh.status === 'Active'
                    ? 'bg-users/10 text-users border border-users/20'
                    : 'bg-companies/10 text-companies border border-companies/20'
                "
              >
                {{ wh.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
