// =============================================================
// Packages ViewModel
// Handles filtering, search, expand/collapse rows, and
// warehouse assignment for the Package Tracking page.
// =============================================================

import { ref, computed, onMounted } from 'vue'
import { PackageService } from '@/services'
import type { PackageInterface } from '@/interfaces'

export function usePackagesViewModel() {
  // --- State ---

  const isLoading = ref(true)
  const error = ref<string | null>(null)
  const packages = ref<PackageInterface[]>([])
  const activeFilter = ref('All')
  const searchQuery = ref('')
  const expandedRow = ref<string | null>(null)

  const filterButtons = ['All', 'In Transit', 'Delivered', 'Pending', 'Exception']

  // --- Computed ---

  // Returns packages matching the active filter and search query.
  const filteredPackages = computed(() => {
    let list = packages.value

    if (activeFilter.value !== 'All') {
      list = list.filter((p) => p.status === activeFilter.value)
    }

    const q = searchQuery.value.trim().toLowerCase()
    if (q) {
      list = list.filter(
        (p) =>
          p.id.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.userId.toLowerCase().includes(q),
      )
    }

    return list
  })

  // --- Actions ---

  function setFilter(filter: string) {
    activeFilter.value = filter
  }

  // Toggles the tracking log panel for a given package row.
  function toggleLog(id: string) {
    expandedRow.value = expandedRow.value === id ? null : id
  }

  // Assigns (or clears) a warehouse for the given package.
  async function assignWarehouse(pkgId: string, warehouseId: string | null) {
    await PackageService.update({ id: pkgId, warehouseId })
    const pkg = packages.value.find((p) => p.id === pkgId)
    if (pkg) pkg.warehouseId = warehouseId
  }

  // --- Data loading ---

  async function loadPackages() {
    isLoading.value = true
    error.value = null
    try {
      packages.value = await PackageService.getAll()
    } catch (e: unknown) {
      error.value = (e as { message?: string })?.message ?? 'Failed to load packages'
    } finally {
      isLoading.value = false
    }
  }

  onMounted(loadPackages)

  return {
    isLoading,
    error,
    packages,
    filteredPackages,
    activeFilter,
    searchQuery,
    expandedRow,
    filterButtons,
    setFilter,
    toggleLog,
    assignWarehouse,
    loadPackages,
  }
}
