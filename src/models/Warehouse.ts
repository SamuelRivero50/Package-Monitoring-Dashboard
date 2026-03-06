// =============================================================
// Warehouse Model
// Domain types and DTOs for the Warehouse entity.
// =============================================================

// --- Core entity ---

export interface Warehouse {
  id: string
  name: string
  location: string
  capacity: number // current usage percentage (0-100)
  maxCapacity: number // max pallet count
  image: string
  isActive: boolean
}

// --- DTOs ---

export interface CreateWarehouseDTO {
  name: string
  location: string
  maxCapacity: number
}

export interface UpdateWarehouseDTO {
  id: string
  name?: string
  location?: string
  capacity?: number
  maxCapacity?: number
  isActive?: boolean
}
