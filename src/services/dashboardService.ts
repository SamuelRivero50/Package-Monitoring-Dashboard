/**
 * @author Samuel Rivero, Dav, Juan Andrés Young Hoyos
 * @description Aggregated data for the system overview page — reads from LocalStorage.
 */

// data
import { getFromStorage, STORAGE_KEYS } from '@/infrastructure/storage'

// types
import type { PackageInterface, UserInterface, WarehouseInterface } from '@/interfaces'
import type { DashboardSummary, RecentPackageRow } from '@/types'

const STATUS_CLASS: Record<string, string> = {
  'In Transit': 'badge-transit',
  Delivered: 'badge-delivered',
  Pending: 'badge-pending',
  Exception: 'badge-exception',
  'At Warehouse': 'badge-warehouse',
}

function timeAgo(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime()
  const mins = Math.floor(diff / 60_000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins} min${mins === 1 ? '' : 's'} ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs} hour${hrs === 1 ? '' : 's'} ago`
  const days = Math.floor(hrs / 24)
  return `${days} day${days === 1 ? '' : 's'} ago`
}

export class DashboardService {
  static async getSummary(): Promise<DashboardSummary> {
    const packages = getFromStorage<PackageInterface[]>(STORAGE_KEYS.PACKAGES) ?? []
    const warehouses = getFromStorage<WarehouseInterface[]>(STORAGE_KEYS.WAREHOUSES) ?? []
    const users = getFromStorage<UserInterface[]>(STORAGE_KEYS.USERS) ?? []

    const statusBreakdown = {
      delivered: packages.filter((p) => p.status === 'Delivered').length,
      inTransit: packages.filter((p) => p.status === 'In Transit').length,
      atWarehouse: packages.filter((p) => p.status === 'At Warehouse').length,
      pending: packages.filter((p) => p.status === 'Pending').length,
      exception: packages.filter((p) => p.status === 'Exception').length,
    }

    const recentPackages: RecentPackageRow[] = [...packages]
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 5)
      .map((p) => ({
        trackingId: p.id,
        description: p.description,
        status: p.status,
        statusClass: STATUS_CLASS[p.status] ?? 'badge-pending',
        updatedAgo: timeAgo(p.updatedAt),
      }))

    return {
      totalPackages: packages.length,
      activeWarehouses: warehouses.length,
      affiliatedCompanies: users.length,
      systemUsers: users.length,
      statusBreakdown,
      recentPackages,
    }
  }
}
