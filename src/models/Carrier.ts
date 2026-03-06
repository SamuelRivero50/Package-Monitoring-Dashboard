// =============================================================
// Carrier Model
// Domain types and DTOs for shipping carriers / companies.
// =============================================================

// --- Core entity ---

export interface Carrier {
  id: string
  name: string
  gradient: string // CSS gradient string used for the carrier banner
  activePackages: number
  avgDeliveryDays: number
}

// --- DTOs ---

export interface CreateCarrierDTO {
  name: string
}

export interface UpdateCarrierDTO {
  id: string
  name?: string
}
