<!-- @author David Hdez -->
<script setup lang="ts">
// external imports
import { ref } from "vue";

// internal imports
import { PackageService } from "@/services/PackageService";
import { WarehouseService } from "@/services/WarehouseService";
import type { CreatePackageDTO } from "@/dtos/CreatePackageDTO";

const warehouses = WarehouseService.getWarehouses();

const trackingNumber = ref("");
const description = ref("");
const status = ref("Pending");
const weight = ref(0);
const carrier = ref("");
const warehouseId = ref<number>(warehouses[0]?.id ?? 1);
const successMessage = ref("");

function submitForm(): void {
  const newPackage: CreatePackageDTO = {
    trackingNumber: trackingNumber.value,
    description: description.value,
    status: status.value,
    weight: weight.value,
    carrier: carrier.value,
    warehouseId: warehouseId.value,
  };

  PackageService.createPackage(newPackage);
  successMessage.value = "Package created successfully!";
  trackingNumber.value = "";
  description.value = "";
  status.value = "Pending";
  weight.value = 0;
  carrier.value = "";
  warehouseId.value = warehouses[0]?.id ?? 1;
}
</script>

<template>
  <section class="max-w-2xl mx-auto py-4">
    <h2 class="text-2xl font-black text-text-primary mb-8">
      Register New Package
    </h2>

    <form
      class="bg-surface border border-border-default rounded-xl p-8 space-y-6"
      @submit.prevent="submitForm"
    >
      <div>
        <label
          class="block text-sm font-semibold text-text-secondary mb-2"
          for="trackingNumber"
          >Tracking Number</label
        >
        <input
          v-model="trackingNumber"
          type="text"
          id="trackingNumber"
          class="w-full bg-elevated border border-border-default rounded-lg p-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-primary"
          required
          placeholder="TRK-XXXX-XX"
        />
      </div>

      <div>
        <label
          class="block text-sm font-semibold text-text-secondary mb-2"
          for="description"
          >Description</label
        >
        <input
          v-model="description"
          type="text"
          id="description"
          class="w-full bg-elevated border border-border-default rounded-lg p-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-primary"
          required
          placeholder="Package contents"
        />
      </div>

      <div>
        <label
          class="block text-sm font-semibold text-text-secondary mb-2"
          for="carrier"
          >Carrier</label
        >
        <input
          v-model="carrier"
          type="text"
          id="carrier"
          class="w-full bg-elevated border border-border-default rounded-lg p-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-primary"
          required
          placeholder="FedEx, DHL, UPS..."
        />
      </div>

      <div>
        <label
          class="block text-sm font-semibold text-text-secondary mb-2"
          for="warehouseId"
          >Warehouse</label
        >
        <select
          v-model="warehouseId"
          id="warehouseId"
          class="select-control w-full bg-elevated border border-border-default rounded-lg p-3 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option
            v-for="warehouse in warehouses"
            :key="warehouse.id"
            :value="warehouse.id"
          >
            {{ warehouse.name }}
          </option>
        </select>
      </div>

      <div>
        <label
          class="block text-sm font-semibold text-text-secondary mb-2"
          for="weight"
          >Weight (kg)</label
        >
        <input
          v-model.number="weight"
          type="number"
          min="0"
          step="0.1"
          id="weight"
          class="w-full bg-elevated border border-border-default rounded-lg p-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-primary"
          required
          placeholder="0.0"
        />
      </div>

      <div>
        <label
          class="block text-sm font-semibold text-text-secondary mb-2"
          for="status"
          >Status</label
        >
        <select
          v-model="status"
          id="status"
          class="select-control w-full bg-elevated border border-border-default rounded-lg p-3 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="Pending">Pending</option>
          <option value="In Transit">In Transit</option>
          <option value="At Warehouse">At Warehouse</option>
          <option value="Delivered">Delivered</option>
          <option value="Exception">Exception</option>
        </select>
      </div>

      <div class="pt-4">
        <button
          type="submit"
          class="w-full bg-primary text-base font-black py-3 rounded-xl hover:bg-primary-dark transition-all"
        >
          Create Package
        </button>
      </div>

      <p v-if="successMessage" class="text-emerald-400 mt-4 font-medium">
        {{ successMessage }}
      </p>
    </form>
  </section>
</template>
