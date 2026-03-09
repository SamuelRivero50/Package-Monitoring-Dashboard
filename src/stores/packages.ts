/**
 * @author Samuel Rivero, Dav, Juan Andrés Young Hoyos
 * @description Pinia store for packages and warehouses.
 */

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { PackageService, WarehouseService } from '@/services'
import type { PackageInterface, WarehouseInterface } from '@/interfaces'

export const usePackagesStore = defineStore('packages', () => {
  const warehouses = ref<WarehouseInterface[]>([])
  const packages = ref<PackageInterface[]>([])
  const isLoading = ref(false)

  const warehouseNames = computed(() => warehouses.value.map((w) => w.name))

  async function loadWarehouses() {
    warehouses.value = await WarehouseService.getAll()
  }

  async function loadPackages() {
    packages.value = await PackageService.getAll()
  }

  async function loadAll() {
    isLoading.value = true
    try {
      await Promise.all([loadWarehouses(), loadPackages()])
    } finally {
      isLoading.value = false
    }
  }

  async function assignWarehouse(pkgId: string, warehouseId: string | null) {
    await PackageService.update({ id: pkgId, warehouseId })
    const pkg = packages.value.find((p) => p.id === pkgId)
    if (pkg) pkg.warehouseId = warehouseId
  }

  function packagesForWarehouse(warehouseId: string) {
    return packages.value.filter((p) => p.warehouseId === warehouseId)
  }

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
