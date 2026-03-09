/**
 * @author Samuel Rivero, Dav, Juan Andrés Young Hoyos
 * @description Dashboard view types. NOT in class diagram.
 */

export interface DashboardStatCard {
  label: string
  value: string
  icon: string
  trend: number
  iconColorClass: string
}

export interface StatusBreakdown {
  delivered: number
  inTransit: number
  atWarehouse: number
  pending: number
  exception: number
}

export interface RecentPackageRow {
  trackingId: string
  description: string
  status: string
  statusClass: string
  updatedAgo: string
}

export interface DashboardSummary {
  totalPackages: number
  activeWarehouses: number
  affiliatedCompanies: number
  systemUsers: number
  statusBreakdown: StatusBreakdown
  recentPackages: RecentPackageRow[]
}
