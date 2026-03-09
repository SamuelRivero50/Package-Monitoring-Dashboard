/**
 * @author Samuel Rivero, Dav, Juan Andrés Young Hoyos
 * @description CRUD operations for the Warehouse entity.
 */

import { apiFetch } from './api'
import type { WarehouseInterface } from '@/interfaces'
import type { CreateWarehouseDTO, UpdateWarehouseDTO } from '@/dtos'

const MOCK_WAREHOUSES: WarehouseInterface[] = [
  {
    id: 'wh-1',
    name: 'Central Hub',
    location: 'Chicago, IL',
    capacity: 85,
    managerName: 'John Smith',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB6TjsdYrQy5fAdTDahTr_KTwPOFOV7_z_D6iqLQADxDWZLcxo4SA9sCbQFz2Qnb9JOSmK1JkaIlIn6vRtGIeArN0UOkmIGp1UcqM7hCbCRbhBRMG5tR-TO_gHad47Pb7zphs06e6obbykT6P51hIeiVsYw2imyE4hcklXBtaC8JkDqFX4tD_ZszdYwPPtWlG0OGm2Qe9hXRmk8Hu1vYRNmqR75ZbMmDX2iag-M22531tuzJz26dc__zhFBea-8WW41qu1QcLA14xVY',
  },
  {
    id: 'wh-2',
    name: 'West Coast',
    location: 'Los Angeles, CA',
    capacity: 62,
    managerName: 'Maria Garcia',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDFz3OWV5ZyLRCxoDTq_x0J21fK30VPlrAAUwz6nLsP2Pi5Pqi0oOgBSAei2lWa-6-tHm_P3Rksz0wKPenjW28XDMbcbrd4E3V2syshQC0OyHX04KsdBGX-00IBKBLD3F3WYbBa9iPs2x5toqi4VfB3HLN-hHc9ASCQK2i066eiEa9tyjn5-FSkGVDKnfQ49qPjOuaZv8-4wj6jKWBtgPHbc1j_ZtUNiVkRkGdKHPhfFyyjvSS_C0IkNe6HX1zDoOWfIUkPXcsCZy5M',
  },
  {
    id: 'wh-3',
    name: 'East Distro',
    location: 'Newark, NJ',
    capacity: 94,
    managerName: 'Robert Lee',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBEPGtwjC4607S8-Lc5LcaeIJCvgWa9NSW6yF5qMDQgTbFAzgMYCqj_ZunalRUG5bZO15ZR-rsrIVgCQQirt1MHeTepdrB4u9nWb6XdtqewUWR_upbA4jGnIOClLAB5uNyjl8SepsWY0RBYGqTH2RXm9gqM4i38MbE4XqeZ1Ry0YYiAUptH_2xmNpgQ2kd8dGQ5v6DCYdCAT7Em7WPlNZs6H36kaxbyFmkMR7Rvw45B4GEXvJsB5GnGI8EHT77hgbOBko3O097hOCl_',
  },
  {
    id: 'wh-4',
    name: 'South Regional',
    location: 'Atlanta, GA',
    capacity: 42,
    managerName: 'Anna Wilson',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAiJELYiAbjTpeotsJauBeCzuSbwo4WUMI21jj7K1M9T78YTdIop-rFwEZBxHsGB_IH_rszYruQRzAlDKsrcY9bhv2azIjK975aiaAZReQwikaACtsARKdWOj8hQLFqOt7lfB_6cFJd7Xp_pTs1olIw418-WPW-GL8DdHpTVJEZBr8tx5dvhgWFY-0Hg0vDxWv1q3Blx_0-sHBmLgdrVpUHa7XDtqFXOG48BXU-8MQXONbGhmMP5hvA4Es4aM-NuaBzBC1iTOeIzmPz',
  },
]

export class WarehouseService {
  static async getAll(): Promise<WarehouseInterface[]> {
    return apiFetch('/warehouses', undefined, MOCK_WAREHOUSES)
  }

  static async getById(id: string): Promise<WarehouseInterface | undefined> {
    return apiFetch(
      `/warehouses/${id}`,
      undefined,
      MOCK_WAREHOUSES.find((w) => w.id === id),
    )
  }

  static async create(dto: CreateWarehouseDTO): Promise<WarehouseInterface> {
    const newWh: WarehouseInterface = {
      id: `wh-${Date.now()}`,
      name: dto.name,
      location: dto.location,
      capacity: dto.capacity ?? 0,
      managerName: dto.managerName ?? '',
      imageUrl: dto.imageUrl ?? '',
    }
    MOCK_WAREHOUSES.push(newWh)
    return Promise.resolve(newWh)
  }

  static async update(dto: UpdateWarehouseDTO): Promise<WarehouseInterface | undefined> {
    const wh = MOCK_WAREHOUSES.find((w) => w.id === dto.id)
    if (wh) {
      if (dto.name !== undefined) wh.name = dto.name
      if (dto.location !== undefined) wh.location = dto.location
      if (dto.capacity !== undefined) wh.capacity = dto.capacity
      if (dto.managerName !== undefined) wh.managerName = dto.managerName
      if (dto.imageUrl !== undefined) wh.imageUrl = dto.imageUrl
    }
    return Promise.resolve(wh)
  }

  static async remove(id: string): Promise<void> {
    const idx = MOCK_WAREHOUSES.findIndex((w) => w.id === id)
    if (idx !== -1) MOCK_WAREHOUSES.splice(idx, 1)
    return Promise.resolve()
  }
}
