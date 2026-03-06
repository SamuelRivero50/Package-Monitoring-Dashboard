// =============================================================
// Dashboard Model
// Types used specifically on the system overview / dashboard page.
// =============================================================

// --- Stat cards ---

export interface DashboardStatCard {
  label: string
  value: string
  icon: string
  trend: number // positive = up, negative = down, 0 = flat
  iconColorClass: string // maps to a CSS class for the icon background
}

// --- Status breakdown (donut chart data) ---

export interface StatusBreakdown {
  delivered: number
  inTransit: number
  atWarehouse: number
  pending: number
  exception: number
}

// --- Recent packages table row ---

export interface RecentPackageRow {
  trackingId: string
  description: string
  status: string
  statusClass: string
  updatedAgo: string
}

// --- Summary (returned by /dashboard/summary) ---

export interface DashboardSummary {
  totalPackages: number
  activeWarehouses: number
  affiliatedCompanies: number
  systemUsers: number
  statusBreakdown: StatusBreakdown
  recentPackages: RecentPackageRow[]
}
