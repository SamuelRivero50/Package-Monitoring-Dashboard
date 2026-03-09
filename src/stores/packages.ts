/**
 * @author Samuel Rivero
 * @description Pinia store for packages and warehouses.
 */

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { PackageService, WarehouseService, PackageLogService } from '@/services'
import type { PackageInterface, WarehouseInterface } from '@/interfaces'
import type {
  CreatePackageDTO,
  UpdatePackageDTO,
  CreatePackageLogDTO,
  UpdatePackageLogDTO,
} from '@/dtos'
import type { CreateWarehouseDTO, UpdateWarehouseDTO } from '@/dtos'

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

  async function createPackage(dto: CreatePackageDTO) {
    const created = await PackageService.create(dto)
    packages.value.push(created)
    return created
  }

  async function updatePackage(dto: UpdatePackageDTO) {
    const updated = await PackageService.update(dto)
    if (updated) {
      const idx = packages.value.findIndex((p) => p.id === dto.id)
      if (idx !== -1) packages.value[idx] = updated
    }
    return updated
  }

  async function removePackage(id: string) {
    await PackageService.remove(id)
    packages.value = packages.value.filter((p) => p.id !== id)
  }

  async function createWarehouse(dto: CreateWarehouseDTO) {
    const created = await WarehouseService.create(dto)
    warehouses.value.push(created)
    return created
  }

  async function updateWarehouse(dto: UpdateWarehouseDTO) {
    const updated = await WarehouseService.update(dto)
    if (updated) {
      const idx = warehouses.value.findIndex((w) => w.id === dto.id)
      if (idx !== -1) warehouses.value[idx] = updated
    }
    return updated
  }

  async function removeWarehouse(id: string) {
    await WarehouseService.remove(id)
    warehouses.value = warehouses.value.filter((w) => w.id !== id)
    await loadPackages()
  }

  async function addPackageLog(dto: CreatePackageLogDTO) {
    const log = await PackageLogService.create(dto)
    await loadPackages()
    return log
  }

  async function updatePackageLog(dto: UpdatePackageLogDTO) {
    const log = await PackageLogService.update(dto)
    await loadPackages()
    return log
  }

  async function removePackageLog(id: string, packageId: string) {
    await PackageLogService.remove(id, packageId)
    await loadPackages()
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
    createPackage,
    updatePackage,
    removePackage,
    createWarehouse,
    updateWarehouse,
    removeWarehouse,
    addPackageLog,
    updatePackageLog,
    removePackageLog,
    packagesForWarehouse,
  }
})
