// =============================================================
// Packages Store (Pinia)
// Global state for packages and warehouses.
// All data operations go through the service layer so swapping
// the backend only requires changes in /services, not here.
// =============================================================

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { packageService, warehouseService } from '@/services'
import type { Package } from '@/models/Package'
import type { Warehouse } from '@/models/Warehouse'

export const usePackagesStore = defineStore('packages', () => {
  // --- State ---

  const warehouses = ref<Warehouse[]>([])
  const packages = ref<Package[]>([])
  const isLoading = ref(false)

  // --- Computed ---

  const warehouseNames = computed(() => warehouses.value.map((w) => w.name))

  // --- Actions ---

  async function loadWarehouses() {
    warehouses.value = await warehouseService.getAll()
  }

  async function loadPackages() {
    packages.value = await packageService.getAll()
  }

  // Loads both resources in parallel.
  async function loadAll() {
    isLoading.value = true
    try {
      await Promise.all([loadWarehouses(), loadPackages()])
    } finally {
      isLoading.value = false
    }
  }

  // Assigns (or clears) a warehouse for the given package.
  async function assignWarehouse(pkgId: string, warehouseName: string | null) {
    await packageService.update({ id: pkgId, warehouseId: warehouseName })
    const pkg = packages.value.find((p) => p.id === pkgId)
    if (pkg) pkg.warehouse = warehouseName
  }

  // Returns all packages currently assigned to a warehouse.
  function packagesForWarehouse(warehouseName: string) {
    return packages.value.filter((p) => p.warehouse === warehouseName)
  }

  // Initial load on first use.
  loadAll()

  return {
    packages,
    warehouses,
    warehouseNames,
    isLoading,
    loadAll,
    loadWarehouses,
    loadPackages,
    assignWarehouse,
    packagesForWarehouse,
  }
})
