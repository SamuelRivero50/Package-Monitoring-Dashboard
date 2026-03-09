// =============================================================
// Warehouses ViewModel
// Loads warehouses and packages in parallel; handles the
// expand/collapse panel that shows packages per warehouse.
// =============================================================

import { ref, onMounted } from 'vue'
import { WarehouseService, PackageService } from '@/services'
import type { WarehouseInterface, PackageInterface } from '@/interfaces'

export function useWarehousesViewModel() {
  // --- State ---

  const isLoading = ref(true)
  const error = ref<string | null>(null)
  const warehouses = ref<WarehouseInterface[]>([])
  const allPackages = ref<PackageInterface[]>([])
  const expandedWh = ref<string | null>(null)

  // --- Actions ---

  // Toggles the package panel under a warehouse card.
  function toggleWh(id: string) {
    expandedWh.value = expandedWh.value === id ? null : id
  }

  // Returns all packages currently assigned to a warehouse.
  function packagesForWarehouse(warehouseId: string): PackageInterface[] {
    return allPackages.value.filter((p) => p.warehouseId === warehouseId)
  }

  // --- Data loading ---

  // Fetches warehouses and packages at the same time to keep things fast.
  async function loadData() {
    isLoading.value = true
    error.value = null
    try {
      const [whs, pkgs] = await Promise.all([WarehouseService.getAll(), PackageService.getAll()])
      warehouses.value = whs
      allPackages.value = pkgs
    } catch (e: unknown) {
      error.value = (e as { message?: string })?.message ?? 'Failed to load warehouses'
    } finally {
      isLoading.value = false
    }
  }

  onMounted(loadData)

  return {
    isLoading,
    error,
    warehouses,
    expandedWh,
    toggleWh,
    packagesForWarehouse,
    loadData,
  }
}
