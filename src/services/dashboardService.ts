/**
 * @author Samuel Rivero, Dav, Juan Andrés Young Hoyos
 * @description Aggregated data for the system overview page.
 */

// relative
import { apiFetch } from './api'

// types
import type { DashboardSummary, RecentPackageRow } from '@/types'

const MOCK_RECENT: RecentPackageRow[] = [
  {
    trackingId: '#TRK-9902',
    description: 'Industrial Pump Spare Parts',
    status: 'In Transit',
    statusClass: 'badge-transit',
    updatedAgo: '2 mins ago',
  },
  {
    trackingId: '#TRK-8812',
    description: 'Solar Panel Modules (x20)',
    status: 'At Warehouse',
    statusClass: 'badge-warehouse',
    updatedAgo: '1 hour ago',
  },
  {
    trackingId: '#TRK-7721',
    description: 'Server Rack Components',
    status: 'Delivered',
    statusClass: 'badge-delivered',
    updatedAgo: '3 hours ago',
  },
  {
    trackingId: '#TRK-6610',
    description: 'Lithium Battery Pack',
    status: 'In Transit',
    statusClass: 'badge-transit',
    updatedAgo: '5 hours ago',
  },
]

const MOCK_SUMMARY: DashboardSummary = {
  totalPackages: 12840,
  activeWarehouses: 24,
  affiliatedCompanies: 156,
  systemUsers: 892,
  statusBreakdown: {
    delivered: 65,
    inTransit: 25,
    atWarehouse: 10,
    pending: 0,
    exception: 0,
  },
  recentPackages: MOCK_RECENT,
}

export class DashboardService {
  static async getSummary(): Promise<DashboardSummary> {
    return apiFetch('/dashboard/summary', undefined, MOCK_SUMMARY)
  }
}
