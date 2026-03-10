/**
 * @author Samuel Rivero
 * @description CRUD operations for the Package entity. Persisted in LocalStorage.
 */

// data
import { getFromStorage, setToStorage, STORAGE_KEYS } from '@/infrastructure/storage'

// types
import type { PackageInterface } from '@/interfaces'
import type { CreatePackageDTO, UpdatePackageDTO } from '@/dtos'

function loadAll(): PackageInterface[] {
  return getFromStorage<PackageInterface[]>(STORAGE_KEYS.PACKAGES) ?? []
}

function nextPackageId(existing: PackageInterface[]): string {
  const TIMESTAMP_THRESHOLD = 1e9
  let max = 0
  for (const p of existing) {
    const m = p.id.match(/^pkg-(\d+)$/)
    if (m?.[1]) {
      const n = parseInt(m[1], 10)
      if (n < TIMESTAMP_THRESHOLD && n > max) max = n
    }
  }
  return `pkg-${max + 1}`
}

export class PackageService {
  static async getAll(status?: string): Promise<PackageInterface[]> {
    const all = loadAll()
    if (status && status !== 'All') return all.filter((p) => p.status === status)
    return all
  }

  static async getById(id: string): Promise<PackageInterface | undefined> {
    return loadAll().find((p) => p.id === id)
  }

  static async create(dto: CreatePackageDTO): Promise<PackageInterface> {
    const all = loadAll()
    const now = new Date().toISOString()
    const pkgId = nextPackageId(all)
    const newPkg: PackageInterface = {
      id: pkgId,
      userId: dto.userId,
      warehouseId: dto.warehouseId ?? null,
      status: dto.status,
      description: dto.description,
      price: dto.price,
      createdAt: now,
      updatedAt: now,
      logHistory: [
        {
          id: `log-${Date.now()}`,
          packageId: pkgId,
          fromWarehouseId: '',
          toWarehouseId: dto.warehouseId ?? '',
          previousStatus: '',
          newStatus: dto.status,
          description: 'Created',
          timestamp: now,
        },
      ],
    }
    all.push(newPkg)
    setToStorage(STORAGE_KEYS.PACKAGES, all)
    return newPkg
  }

  static async update(dto: UpdatePackageDTO): Promise<PackageInterface | undefined> {
    const all = loadAll()
    const idx = all.findIndex((p) => p.id === dto.id)
    const pkg = idx !== -1 ? all[idx] : undefined
    if (!pkg) return undefined
    if (dto.warehouseId !== undefined) pkg.warehouseId = dto.warehouseId
    if (dto.status !== undefined) pkg.status = dto.status
    if (dto.description !== undefined) pkg.description = dto.description
    if (dto.price !== undefined) pkg.price = dto.price
    pkg.updatedAt = new Date().toISOString()
    setToStorage(STORAGE_KEYS.PACKAGES, all)
    return pkg
  }

  static async remove(id: string): Promise<void> {
    const all = loadAll().filter((p) => p.id !== id)
    setToStorage(STORAGE_KEYS.PACKAGES, all)
  }
}
