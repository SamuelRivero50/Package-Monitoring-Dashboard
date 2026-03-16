<!-- @author David Hdez -->
<script setup lang="ts">
// external imports
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

// internal imports
import type { CreatePackageDTO } from "@/dtos/packages/CreatePackageDTO";
import { PackageService } from "@/services/PackageService";
import { WarehouseService } from "@/services/WarehouseService";

const route = useRoute();
const router = useRouter();

const warehouses = WarehouseService.getWarehouses();

const description = ref("");
const status = ref("Pending");
const price = ref(0);
const warehouseId = ref<number>(warehouses[0]?.id ?? 1);
const successMessage = ref("");

function closeCreateView(): void {
  const fromQuery = route.query.from;

  if (typeof fromQuery === "string" && fromQuery.startsWith("/")) {
    router.push(fromQuery);
    return;
  }

  if (window.history.length > 1) {
    router.back();
    return;
  }

  router.push({ name: "packages" });
}

function submitForm(): void {
  const newPackage: CreatePackageDTO = {
    description: description.value,
    status: status.value,
    price: price.value,
    warehouseId: warehouseId.value,
  };

  PackageService.createPackage(newPackage);
  successMessage.value = "Package created successfully!";
  description.value = "";
  status.value = "Pending";
  price.value = 0;
  warehouseId.value = warehouses[0]?.id ?? 1;
}
</script>

<template>
  <section class="max-w-2xl mx-auto py-4">
    <div class="flex items-center justify-between mb-8">
      <h2 class="text-2xl font-black text-body">
        Register New Package
      </h2>
      <button
        type="button"
        class="size-10 rounded-lg bg-panel border border-wire text-soft hover:text-primary hover:border-primary/40 transition-colors flex items-center justify-center"
        title="Close and go back"
        @click="closeCreateView"
      >
        <span class="material-symbols-outlined text-base">close</span>
      </button>
    </div>

    <form
      class="bg-panel border border-wire rounded-xl p-8 space-y-6"
      @submit.prevent="submitForm"
    >
      <div>
        <label
          class="block text-sm font-semibold text-soft mb-2"
          for="description"
          >Description</label
        >
        <input
          v-model="description"
          type="text"
          id="description"
          class="w-full bg-sheet border border-wire rounded-lg p-3 text-sm text-body placeholder:text-faded focus:outline-none focus:ring-1 focus:ring-primary"
          required
          placeholder="Package contents"
        />
      </div>


      <div>
        <label
          class="block text-sm font-semibold text-soft mb-2"
          for="warehouseId"
          >Warehouse</label
        >
        <select
          v-model="warehouseId"
          id="warehouseId"
          class="select-control w-full bg-sheet border border-wire rounded-lg p-3 text-sm text-body focus:outline-none focus:ring-1 focus:ring-primary"
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
          class="block text-sm font-semibold text-soft mb-2"
          for="price"
          >Price (USD)</label
        >
        <input
          v-model.number="price"
          type="number"
          min="0"
          step="0.01"
          id="price"
          class="w-full bg-sheet border border-wire rounded-lg p-3 text-sm text-body placeholder:text-faded focus:outline-none focus:ring-1 focus:ring-primary"
          required
          placeholder="0.00"
        />
      </div>

      <div>
        <label
          class="block text-sm font-semibold text-soft mb-2"
          for="status"
          >Status</label
        >
        <select
          v-model="status"
          id="status"
          class="select-control w-full bg-sheet border border-wire rounded-lg p-3 text-sm text-body focus:outline-none focus:ring-1 focus:ring-primary"
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
