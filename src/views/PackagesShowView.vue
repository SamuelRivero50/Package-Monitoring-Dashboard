<!-- @author David Hdez -->
<script setup lang="ts">
// external imports
import { useRoute } from "vue-router";

// internal imports
import { PackageService } from "@/services/PackageService";
import { WarehouseService } from "@/services/WarehouseService";
import { formatWeight } from "@/utils/formatters";
import PackageEvents from "@/components/PackageEvents.vue";

const route = useRoute();
const packageId = Number(route.params.id);
const pkg = PackageService.getPackageById(packageId);
const warehouse = pkg
  ? WarehouseService.getWarehouseById(pkg.warehouseId)
  : undefined;
</script>

<template>
  <section v-if="pkg" class="space-y-8">
    <!-- Package Header -->
    <div class="bg-surface rounded-xl border border-border-default p-8">
      <div
        class="flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div>
          <p class="text-packages font-mono text-sm mb-2">
            {{ pkg.trackingNumber }}
          </p>
          <h2 class="text-2xl font-black text-text-primary">
            {{ pkg.description }}
          </h2>
        </div>
        <span
          class="px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide w-fit"
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
      </div>
    </div>

    <!-- Package Info -->
    <div class="bg-surface rounded-xl border border-border-default p-6">
      <h3 class="text-lg font-bold text-text-primary mb-4">
        Package Information
      </h3>
      <div class="space-y-3">
        <div class="flex justify-between border-b border-border-subtle pb-3">
          <span class="text-text-secondary">Tracking Number</span>
          <span class="font-mono font-medium text-packages">{{
            pkg.trackingNumber
          }}</span>
        </div>
        <div class="flex justify-between border-b border-border-subtle pb-3">
          <span class="text-text-secondary">Description</span>
          <span class="font-medium text-text-primary">{{
            pkg.description
          }}</span>
        </div>
        <div class="flex justify-between border-b border-border-subtle pb-3">
          <span class="text-text-secondary">Carrier</span>
          <span class="font-medium text-text-primary">{{ pkg.carrier }}</span>
        </div>
        <div class="flex justify-between border-b border-border-subtle pb-3">
          <span class="text-text-secondary">Warehouse</span>
          <span class="font-medium text-text-primary">{{
            warehouse?.name ?? "Unknown Warehouse"
          }}</span>
        </div>
        <div class="flex justify-between border-b border-border-subtle pb-3">
          <span class="text-text-secondary">Weight</span>
          <span class="font-medium text-text-primary">{{
            formatWeight(pkg.weight)
          }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-text-secondary">Status</span>
          <span class="font-medium text-text-primary">{{ pkg.status }}</span>
        </div>
      </div>
    </div>

    <!-- Tracking Events -->
    <div class="bg-surface rounded-xl border border-border-default p-6">
      <PackageEvents :package-id="pkg.id" />
    </div>
  </section>

  <section v-else class="flex flex-col items-center justify-center py-20">
    <span class="material-symbols-outlined text-6xl text-text-muted mb-4"
      >search_off</span
    >
    <h2 class="text-xl font-bold text-text-secondary">Package not found</h2>
    <p class="text-text-muted mt-2">
      The package you're looking for doesn't exist.
    </p>
  </section>
</template>
