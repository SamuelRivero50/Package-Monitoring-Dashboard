// =============================================================
// Dashboard ViewModel
// Handles data fetching and derived state for the Dashboard page.
// The component only binds to what this composable exposes.
// =============================================================

import { ref, computed, onMounted } from 'vue'
import { DashboardService } from '@/services'
import type { DashboardSummary, DashboardStatCard } from '@/types'

export function useDashboardViewModel() {
  // --- State ---

  const isLoading = ref(true)
  const error = ref<string | null>(null)
  const summary = ref<DashboardSummary | null>(null)

  // --- Computed ---

  // Builds the four stat cards from the summary data.
  const statCards = computed<DashboardStatCard[]>(() => {
    if (!summary.value) return []
    const s = summary.value
    return [
      {
        label: 'Total Packages',
        value: s.totalPackages.toLocaleString(),
        icon: 'package',
        trend: 12,
        iconColorClass: 'stat-icon--packages',
      },
      {
        label: 'Active Warehouses',
        value: String(s.activeWarehouses),
        icon: 'warehouse',
        trend: 0,
        iconColorClass: 'stat-icon--warehouses',
      },
      {
        label: 'System Users',
        value: String(s.systemUsers),
        icon: 'group',
        trend: 5,
        iconColorClass: 'stat-icon--users',
      },
    ]
  })

  // --- Helpers ---

  // Returns a formatted trend string, e.g. +12%, -2%, 0%.
  function trendLabel(trend: number): string {
    if (trend > 0) return `+${trend}%`
    if (trend < 0) return `${trend}%`
    return '0%'
  }

  // Returns the CSS class for a given trend direction.
  function trendClass(trend: number): string {
    if (trend > 0) return 'stat-trend--up'
    if (trend < 0) return 'stat-trend--down'
    return 'stat-trend--neutral'
  }

  // --- Data loading ---

  async function loadSummary() {
    isLoading.value = true
    error.value = null
    try {
      summary.value = await DashboardService.getSummary()
    } catch (e: unknown) {
      error.value = (e as { message?: string })?.message ?? 'Failed to load dashboard data'
    } finally {
      isLoading.value = false
    }
  }

  onMounted(loadSummary)

  return {
    isLoading,
    error,
    summary,
    statCards,
    trendLabel,
    trendClass,
    loadSummary,
  }
}
