/**
 * @author Samuel Rivero
 * @description CRUD operations for the Warehouse entity. Persisted in LocalStorage.
 */

// data
import { getFromStorage, setToStorage, STORAGE_KEYS } from '@/infrastructure/storage'

// types
import type { PackageInterface, WarehouseInterface } from '@/interfaces'
import type { CreateWarehouseDTO, UpdateWarehouseDTO } from '@/dtos'

function loadAll(): WarehouseInterface[] {
  return getFromStorage<WarehouseInterface[]>(STORAGE_KEYS.WAREHOUSES) ?? []
}

export class WarehouseService {
  static async getAll(): Promise<WarehouseInterface[]> {
    return loadAll()
  }

  static async getById(id: string): Promise<WarehouseInterface | undefined> {
    return loadAll().find((w) => w.id === id)
  }

  static async create(dto: CreateWarehouseDTO): Promise<WarehouseInterface> {
    const all = loadAll()
    const newWh: WarehouseInterface = {
      id: `wh-${Date.now()}`,
      name: dto.name,
      location: dto.location,
      capacity: dto.capacity ?? 0,
      managerName: dto.managerName ?? '',
      imageUrl: dto.imageUrl ?? '',
    }
    all.push(newWh)
    setToStorage(STORAGE_KEYS.WAREHOUSES, all)
    return newWh
  }

  static async update(dto: UpdateWarehouseDTO): Promise<WarehouseInterface | undefined> {
    const all = loadAll()
    const idx = all.findIndex((w) => w.id === dto.id)
    const wh = idx !== -1 ? all[idx] : undefined
    if (!wh) return undefined
    if (dto.name !== undefined) wh.name = dto.name
    if (dto.location !== undefined) wh.location = dto.location
    if (dto.capacity !== undefined) wh.capacity = dto.capacity
    if (dto.managerName !== undefined) wh.managerName = dto.managerName
    if (dto.imageUrl !== undefined) wh.imageUrl = dto.imageUrl
    setToStorage(STORAGE_KEYS.WAREHOUSES, all)
    return wh
  }

  static async remove(id: string): Promise<void> {
    const all = loadAll().filter((w) => w.id !== id)
    setToStorage(STORAGE_KEYS.WAREHOUSES, all)
    const pkgs = getFromStorage<PackageInterface[]>(STORAGE_KEYS.PACKAGES) ?? []
    const updated = pkgs.map((p) => (p.warehouseId === id ? { ...p, warehouseId: null } : p))
    setToStorage(STORAGE_KEYS.PACKAGES, updated)
  }
}
