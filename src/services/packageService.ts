// =============================================================
// Package Service
// CRUD operations for the Package entity.
// Replace the mock fallbacks with real apiFetch() calls once
// the backend is running.
// =============================================================

import { apiFetch } from './api'
import type { Package, CreatePackageDTO, UpdatePackageDTO } from '@/models'

// --- Mock data (remove when backend is ready) ---

const MOCK_PACKAGES: Package[] = [
  {
    id: '#TRK-9921-X3',
    description: 'Electronics Kit',
    user: 'John Doe',
    company: 'TechFlow Inc.',
    status: 'In Transit',
    statusClass: 'badgeTransit',
    warehouse: 'Central Hub',
    log: [
      { date: '2026-03-06 09:12', event: 'Picked up from warehouse', location: 'Chicago, IL' },
      {
        date: '2026-03-06 11:35',
        event: 'In transit to sorting facility',
        location: 'Indianapolis, IN',
      },
      {
        date: '2026-03-06 14:20',
        event: 'Arrived at sorting facility',
        location: 'Louisville, KY',
      },
    ],
  },
  {
    id: '#TRK-8442-B9',
    description: 'Spare Parts',
    user: 'Sarah Smith',
    company: 'Global Heavy',
    status: 'Delivered',
    statusClass: 'badgeDelivered',
    warehouse: 'East Distro',
    log: [
      { date: '2026-03-04 08:00', event: 'Picked up', location: 'Newark, NJ' },
      { date: '2026-03-05 10:15', event: 'Out for delivery', location: 'Boston, MA' },
      { date: '2026-03-05 14:42', event: 'Delivered', location: 'Boston, MA' },
    ],
  },
  {
    id: '#TRK-1022-P1',
    description: 'Medical Box',
    user: 'Mike Wilson',
    company: 'HealthFirst',
    status: 'Pending',
    statusClass: 'badgePending',
    warehouse: null,
    log: [{ date: '2026-03-06 07:00', event: 'Label created', location: 'Los Angeles, CA' }],
  },
  {
    id: '#TRK-7711-E4',
    description: 'Fiber Panels',
    user: 'Elena Rodriguez',
    company: 'ConstructX',
    status: 'Exception',
    statusClass: 'badgeException',
    warehouse: 'West Coast',
    log: [
      { date: '2026-03-05 09:30', event: 'Picked up', location: 'Dallas, TX' },
      { date: '2026-03-05 18:00', event: 'Exception — address issue', location: 'Houston, TX' },
    ],
  },
]

// Status → CSS class mapping used when updating a package.
const STATUS_CLASS_MAP: Record<string, Package['statusClass']> = {
  'In Transit': 'badgeTransit',
  Delivered: 'badgeDelivered',
  Pending: 'badgePending',
  Exception: 'badgeException',
}

// --- Service methods ---

export const packageService = {
  // Fetch all packages, optionally filtered by status.
  async getAll(status?: string): Promise<Package[]> {
    // TODO: return apiFetch<Package[]>(`/packages?status=${status ?? ''}`)
    const filtered =
      status && status !== 'All' ? MOCK_PACKAGES.filter((p) => p.status === status) : MOCK_PACKAGES
    return apiFetch('/packages', undefined, filtered)
  },

  // Fetch a single package by its tracking ID.
  async getById(id: string): Promise<Package | undefined> {
    // TODO: return apiFetch<Package>(`/packages/${id}`)
    return apiFetch(
      `/packages/${id}`,
      undefined,
      MOCK_PACKAGES.find((p) => p.id === id),
    )
  },

  // Create a new package and add it to the local list.
  async create(dto: CreatePackageDTO): Promise<Package> {
    // TODO: return apiFetch<Package>('/packages', { method: 'POST', body: JSON.stringify(dto) })
    const newPkg: Package = {
      id: `#TRK-${Math.floor(Math.random() * 9000 + 1000)}-XX`,
      description: dto.description,
      user: dto.user,
      company: dto.company,
      status: 'Pending',
      statusClass: 'badgePending',
      warehouse: dto.warehouseId ?? null,
      log: [
        {
          date: new Date().toISOString().slice(0, 16).replace('T', ' '),
          event: 'Label created',
          location: 'System',
        },
      ],
    }
    MOCK_PACKAGES.push(newPkg)
    return Promise.resolve(newPkg)
  },

  // Update fields on an existing package.
  async update(dto: UpdatePackageDTO): Promise<Package | undefined> {
    // TODO: return apiFetch<Package>(`/packages/${dto.id}`, { method: 'PATCH', body: JSON.stringify(dto) })
    const pkg = MOCK_PACKAGES.find((p) => p.id === dto.id)
    if (pkg) {
      if (dto.warehouseId !== undefined) pkg.warehouse = dto.warehouseId
      if (dto.status) pkg.statusClass = STATUS_CLASS_MAP[dto.status] ?? 'badgePending'
      if (dto.status) pkg.status = dto.status
      if (dto.description) pkg.description = dto.description
    }
    return Promise.resolve(pkg)
  },

  // Delete a package by ID.
  async remove(id: string): Promise<void> {
    // TODO: return apiFetch<void>(`/packages/${id}`, { method: 'DELETE' })
    const idx = MOCK_PACKAGES.findIndex((p) => p.id === id)
    if (idx !== -1) MOCK_PACKAGES.splice(idx, 1)
    return Promise.resolve()
  },
}
