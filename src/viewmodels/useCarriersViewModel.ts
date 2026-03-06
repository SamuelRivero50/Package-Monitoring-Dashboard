// =============================================================
// Carriers ViewModel
// Loads carrier data for the Carrier Directory page.
// =============================================================

import { ref, onMounted } from 'vue'
import { carrierService } from '@/services'
import type { Carrier } from '@/models'

export function useCarriersViewModel() {
  // --- State ---

  const isLoading = ref(true)
  const error = ref<string | null>(null)
  const carriers = ref<Carrier[]>([])

  // --- Data loading ---

  async function loadCarriers() {
    isLoading.value = true
    error.value = null
    try {
      carriers.value = await carrierService.getAll()
    } catch (e: unknown) {
      error.value = (e as { message?: string })?.message ?? 'Failed to load carriers'
    } finally {
      isLoading.value = false
    }
  }

  onMounted(loadCarriers)

  return {
    isLoading,
    error,
    carriers,
    loadCarriers,
  }
}
