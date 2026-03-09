/**
 * @author Samuel Rivero, Dav, Juan Andrés Young Hoyos
 * @description CRUD operations for the Carrier entity.
 */

import { apiFetch } from './api'
import type { CarrierInterface } from '@/types'
import type { CreateCarrierDTO, UpdateCarrierDTO } from '@/dtos'

const MOCK_CARRIERS: CarrierInterface[] = [
  {
    id: 'cr-1',
    name: 'FedEx',
    gradient: 'linear-gradient(135deg, #4D148C, #FF6600)',
    activePackages: 1240,
    avgDeliveryDays: 2.4,
  },
  {
    id: 'cr-2',
    name: 'DHL',
    gradient: 'linear-gradient(135deg, #FFCC00, #D40511)',
    activePackages: 890,
    avgDeliveryDays: 3.1,
  },
  {
    id: 'cr-3',
    name: 'UPS',
    gradient: 'linear-gradient(135deg, #351C15, #FFB500)',
    activePackages: 1560,
    avgDeliveryDays: 2.8,
  },
  {
    id: 'cr-4',
    name: 'Amazon',
    gradient: 'linear-gradient(135deg, #232F3E, #FF9900)',
    activePackages: 2100,
    avgDeliveryDays: 1.9,
  },
]

export class CarrierService {
  static async getAll(): Promise<CarrierInterface[]> {
    return apiFetch('/carriers', undefined, MOCK_CARRIERS)
  }

  static async getById(id: string): Promise<CarrierInterface | undefined> {
    return apiFetch(
      `/carriers/${id}`,
      undefined,
      MOCK_CARRIERS.find((c) => c.id === id),
    )
  }

  static async create(dto: CreateCarrierDTO): Promise<CarrierInterface> {
    const newCarrier: CarrierInterface = {
      id: `cr-${Date.now()}`,
      name: dto.name,
      gradient: 'linear-gradient(135deg, #2dd4bf, #0d9488)',
      activePackages: 0,
      avgDeliveryDays: 0,
    }
    MOCK_CARRIERS.push(newCarrier)
    return Promise.resolve(newCarrier)
  }

  static async update(dto: UpdateCarrierDTO): Promise<CarrierInterface | undefined> {
    const carrier = MOCK_CARRIERS.find((c) => c.id === dto.id)
    if (carrier && dto.name) carrier.name = dto.name
    return Promise.resolve(carrier)
  }

  static async remove(id: string): Promise<void> {
    const idx = MOCK_CARRIERS.findIndex((c) => c.id === id)
    if (idx !== -1) MOCK_CARRIERS.splice(idx, 1)
    return Promise.resolve()
  }
}
