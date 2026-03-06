// =============================================================
// Package Model
// Domain types and DTOs for the Package entity.
// =============================================================

// --- Tracking history ---

export interface PackageLog {
  date: string
  event: string
  location: string
}

// --- Core entity ---

export type PackageStatus = 'In Transit' | 'Delivered' | 'Pending' | 'Exception'

export type PackageStatusClass =
  | 'badgeTransit'
  | 'badgeDelivered'
  | 'badgePending'
  | 'badgeException'

export interface Package {
  id: string
  description: string
  user: string
  company: string
  status: PackageStatus
  statusClass: PackageStatusClass
  warehouse: string | null
  log: PackageLog[]
}

// --- DTOs (Data Transfer Objects) ---

// Payload sent to the backend when creating a new package.
export interface CreatePackageDTO {
  description: string
  user: string
  company: string
  warehouseId?: string
}

// Payload sent when updating an existing package.
export interface UpdatePackageDTO {
  id: string
  description?: string
  status?: PackageStatus
  warehouseId?: string | null
}
