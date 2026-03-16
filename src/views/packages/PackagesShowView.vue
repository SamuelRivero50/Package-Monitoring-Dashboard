<!-- @author David Hdez -->
<script setup lang="ts">
// external imports
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

// internal imports
import PackageEvents from "@/components/packages/PackageEvents.vue";
import StatusBadge from "@/components/shared/StatusBadge.vue";
import { PackageService } from "@/services/PackageService";
import { WarehouseService } from "@/services/WarehouseService";
import { formatWeight } from "@/utils/formatters";

const route = useRoute();
const router = useRouter();
// Normalize route param once to keep strongly typed service calls.
const packageId = Number(route.params.id);

const pkg = PackageService.getPackageById(packageId);
const warehouse = pkg ? WarehouseService.getWarehouseById(pkg.warehouseId) : undefined;
const warehouses = WarehouseService.getWarehouses();

const editMode = ref(false);
const editStatus = ref(pkg?.status ?? "");
const editDescription = ref(pkg?.description ?? "");
const editWeight = ref(pkg?.weight ?? 0);
const editWarehouseId = ref(pkg?.warehouseId ?? 0);

// Reset edit fields from persisted package state to avoid stale form values.
function startEdit(): void {
  editStatus.value = pkg?.status ?? "";
  editDescription.value = pkg?.description ?? "";
  editWeight.value = pkg?.weight ?? 0;
  editWarehouseId.value = pkg?.warehouseId ?? 0;
  editMode.value = true;
}

// Delegate mutations to the service to keep business rules out of the view.
function saveEdit(): void {
  PackageService.updatePackage(packageId, {
    status: editStatus.value,
    description: editDescription.value,
    weight: editWeight.value,
    warehouseId: editWarehouseId.value,
  });
  editMode.value = false;
}

// Navigate back to the list after deletion to avoid stale detail routes.
function deletePackage(): void {
  PackageService.deletePackage(packageId);
  router.push("/packages");
}
</script>

<template>
  <section v-if="pkg" class="space-y-8">
    <!-- Package Header -->
    <div class="bg-panel rounded-xl border border-wire p-8">
      <div
        class="flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div>
          <p class="text-packages font-mono text-sm mb-2">
            {{ pkg.trackingNumber }}
          </p>
          <h2 class="text-2xl font-black text-body">
            {{ pkg.description }}
          </h2>
        </div>
        <div class="flex items-center gap-3">
          <StatusBadge :status="pkg.status" class="text-sm px-4 py-2" />
          <button
            class="inline-flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-bold bg-panel border border-wire text-soft hover:bg-sheet transition-all"
            @click="startEdit"
          >
            <span class="material-symbols-outlined text-sm">edit</span>
            Edit
          </button>
          <button
            class="inline-flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-bold bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all"
            @click="deletePackage"
          >
            <span class="material-symbols-outlined text-sm">delete</span>
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- Edit Form -->
    <div v-if="editMode" class="bg-panel rounded-xl border border-wire p-6 space-y-4">
      <h3 class="text-lg font-bold text-body">Edit Package</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-semibold text-soft mb-2">Status</label>
          <select
            v-model="editStatus"
            class="select-control w-full bg-sheet border border-wire rounded-lg p-3 text-sm text-body focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option>Pending</option>
            <option>In Transit</option>
            <option>Delivered</option>
            <option>Exception</option>
            <option>At Warehouse</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-semibold text-soft mb-2">Description</label>
          <input
            v-model="editDescription"
            type="text"
            class="w-full bg-sheet border border-wire rounded-lg p-3 text-sm text-body focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label class="block text-sm font-semibold text-soft mb-2">Weight (kg)</label>
          <input
            v-model.number="editWeight"
            type="number"
            min="0"
            step="0.1"
            class="w-full bg-sheet border border-wire rounded-lg p-3 text-sm text-body focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label class="block text-sm font-semibold text-soft mb-2">Warehouse</label>
          <select
            v-model.number="editWarehouseId"
            class="select-control w-full bg-sheet border border-wire rounded-lg p-3 text-sm text-body focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option v-for="wh in warehouses" :key="wh.id" :value="wh.id">{{ wh.name }}</option>
          </select>
        </div>
      </div>
      <div class="flex gap-3">
        <button
          class="bg-primary font-bold py-2.5 px-6 rounded-lg text-sm hover:bg-primary-dark transition-all"
          @click="saveEdit"
        >
          Save
        </button>
        <button
          class="bg-panel border border-wire text-soft font-bold py-2.5 px-6 rounded-lg text-sm hover:bg-sheet transition-all"
          @click="editMode = false"
        >
          Cancel
        </button>
      </div>
    </div>

    <!-- Package Info -->
    <div class="bg-panel rounded-xl border border-wire p-6">
      <h3 class="text-lg font-bold text-body mb-4">
        Package Information
      </h3>
      <div class="space-y-3">
        <div class="flex justify-between border-b border-wire-subtle pb-3">
          <span class="text-soft">Tracking Number</span>
          <span class="font-mono font-medium text-packages">{{
            pkg.trackingNumber
          }}</span>
        </div>
        <div class="flex justify-between border-b border-wire-subtle pb-3">
          <span class="text-soft">Description</span>
          <span class="font-medium text-body">{{
            pkg.description
          }}</span>
        </div>
        <div class="flex justify-between border-b border-wire-subtle pb-3">
          <span class="text-soft">Warehouse</span>
          <span class="font-medium text-body">{{
            warehouse?.name ?? "Unknown Warehouse"
          }}</span>
        </div>
        <div class="flex justify-between border-b border-wire-subtle pb-3">
          <span class="text-soft">Weight</span>
          <span class="font-medium text-body">{{
            formatWeight(pkg.weight)
          }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-soft">Status</span>
          <span class="font-medium text-body">{{ pkg.status }}</span>
        </div>
      </div>
    </div>

    <!-- Tracking Events -->
    <div class="bg-panel rounded-xl border border-wire p-6">
      <PackageEvents :package-id="pkg.id" />
    </div>
  </section>

  <section v-else class="flex flex-col items-center justify-center py-20">
    <span class="material-symbols-outlined text-6xl text-faded mb-4"
      >search_off</span
    >
    <h2 class="text-xl font-bold text-soft">Package not found</h2>
    <p class="text-faded mt-2">
      The package you're looking for doesn't exist.
    </p>
  </section>
</template>
