// =============================================================
// Warehouse Service
// CRUD operations for the Warehouse entity.
// =============================================================

import { apiFetch } from './api'
import type { Warehouse, CreateWarehouseDTO, UpdateWarehouseDTO } from '@/models'

// --- Mock data (remove when backend is ready) ---

const MOCK_WAREHOUSES: Warehouse[] = [
  {
    id: 'wh-1',
    name: 'Central Hub',
    location: 'Chicago, IL',
    capacity: 85,
    maxCapacity: 10000,
    isActive: true,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB6TjsdYrQy5fAdTDahTr_KTwPOFOV7_z_D6iqLQADxDWZLcxo4SA9sCbQFz2Qnb9JOSmK1JkaIlIn6vRtGIeArN0UOkmIGp1UcqM7hCbCRbhBRMG5tR-TO_gHad47Pb7zphs06e6obbykT6P51hIeiVsYw2imyE4hcklXBtaC8JkDqFX4tD_ZszdYwPPtWlG0OGm2Qe9hXRmk8Hu1vYRNmqR75ZbMmDX2iag-M22531tuzJz26dc__zhFBea-8WW41qu1QcLA14xVY',
  },
  {
    id: 'wh-2',
    name: 'West Coast',
    location: 'Los Angeles, CA',
    capacity: 62,
    maxCapacity: 15000,
    isActive: true,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDFz3OWV5ZyLRCxoDTq_x0J21fK30VPlrAAUwz6nLsP2Pi5Pqi0oOgBSAei2lWa-6-tHm_P3Rksz0wKPenjW28XDMbcbrd4E3V2syshQC0OyHX04KsdBGX-00IBKBLD3F3WYbBa9iPs2x5toqi4VfB3HLN-hHc9ASCQK2i066eiEa9tyjn5-FSkGVDKnfQ49qPjOuaZv8-4wj6jKWBtgPHbc1j_ZtUNiVkRkGdKHPhfFyyjvSS_C0IkNe6HX1zDoOWfIUkPXcsCZy5M',
  },
  {
    id: 'wh-3',
    name: 'East Distro',
    location: 'Newark, NJ',
    capacity: 94,
    maxCapacity: 12000,
    isActive: true,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBEPGtwjC4607S8-Lc5LcaeIJCvgWa9NSW6yF5qMDQgTbFAzgMYCqj_ZunalRUG5bZO15ZR-rsrIVgCQQirt1MHeTepdrB4u9nWb6XdtqewUWR_upbA4jGnIOClLAB5uNyjl8SepsWY0RBYGqTH2RXm9gqM4i38MbE4XqeZ1Ry0YYiAUptH_2xmNpgQ2kd8dGQ5v6DCYdCAT7Em7WPlNZs6H36kaxbyFmkMR7Rvw45B4GEXvJsB5GnGI8EHT77hgbOBko3O097hOCl_',
  },
  {
    id: 'wh-4',
    name: 'South Regional',
    location: 'Atlanta, GA',
    capacity: 42,
    maxCapacity: 8000,
    isActive: true,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAiJELYiAbjTpeotsJauBeCzuSbwo4WUMI21jj7K1M9T78YTdIop-rFwEZBxHsGB_IH_rszYruQRzAlDKsrcY9bhv2azIjK975aiaAZReQwikaACtsARKdWOj8hQLFqOt7lfB_6cFJd7Xp_pTs1olIw418-WPW-GL8DdHpTVJEZBr8tx5dvhgWFY-0Hg0vDxWv1q3Blx_0-sHBmLgdrVpUHa7XDtqFXOG48BXU-8MQXONbGhmMP5hvA4Es4aM-NuaBzBC1iTOeIzmPz',
  },
]

// --- Service methods ---

export const warehouseService = {
  async getAll(): Promise<Warehouse[]> {
    // TODO: return apiFetch<Warehouse[]>('/warehouses')
    return apiFetch('/warehouses', undefined, MOCK_WAREHOUSES)
  },

  async getById(id: string): Promise<Warehouse | undefined> {
    // TODO: return apiFetch<Warehouse>(`/warehouses/${id}`)
    return apiFetch(
      `/warehouses/${id}`,
      undefined,
      MOCK_WAREHOUSES.find((w) => w.id === id),
    )
  },

  async create(dto: CreateWarehouseDTO): Promise<Warehouse> {
    // TODO: return apiFetch('/warehouses', { method: 'POST', body: JSON.stringify(dto) })
    const newWh: Warehouse = {
      id: `wh-${Date.now()}`,
      name: dto.name,
      location: dto.location,
      capacity: 0,
      maxCapacity: dto.maxCapacity,
      isActive: true,
      image: '',
    }
    MOCK_WAREHOUSES.push(newWh)
    return Promise.resolve(newWh)
  },

  async update(dto: UpdateWarehouseDTO): Promise<Warehouse | undefined> {
    // TODO: return apiFetch(`/warehouses/${dto.id}`, { method: 'PATCH', body: JSON.stringify(dto) })
    const wh = MOCK_WAREHOUSES.find((w) => w.id === dto.id)
    if (wh) {
      if (dto.name !== undefined) wh.name = dto.name
      if (dto.location !== undefined) wh.location = dto.location
      if (dto.capacity !== undefined) wh.capacity = dto.capacity
      if (dto.maxCapacity !== undefined) wh.maxCapacity = dto.maxCapacity
      if (dto.isActive !== undefined) wh.isActive = dto.isActive
    }
    return Promise.resolve(wh)
  },

  async remove(id: string): Promise<void> {
    // TODO: return apiFetch(`/warehouses/${id}`, { method: 'DELETE' })
    const idx = MOCK_WAREHOUSES.findIndex((w) => w.id === id)
    if (idx !== -1) MOCK_WAREHOUSES.splice(idx, 1)
    return Promise.resolve()
  },
}
