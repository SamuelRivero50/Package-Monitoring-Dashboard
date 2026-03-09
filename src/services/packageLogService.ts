/**
 * @author Samuel Rivero
 * @description CRUD operations for PackageLog entries. Logs stored within package.logHistory.
 */

import { getFromStorage, setToStorage, STORAGE_KEYS } from '@/infrastructure/storage'
import type { PackageInterface, PackageLogInterface } from '@/interfaces'
import type { CreatePackageLogDTO, UpdatePackageLogDTO } from '@/dtos'

function loadPackages(): PackageInterface[] {
  return getFromStorage<PackageInterface[]>(STORAGE_KEYS.PACKAGES) ?? []
}

export class PackageLogService {
  static async getByPackageId(packageId: string): Promise<PackageLogInterface[]> {
    const pkg = loadPackages().find((p) => p.id === packageId)
    return pkg?.logHistory ?? []
  }

  static async getById(id: string): Promise<PackageLogInterface | undefined> {
    const packages = loadPackages()
    for (const pkg of packages) {
      const log = pkg.logHistory.find((l) => l.id === id)
      if (log) return log
    }
    return undefined
  }

  static async create(dto: CreatePackageLogDTO): Promise<PackageLogInterface> {
    const packages = loadPackages()
    const pkg = packages.find((p) => p.id === dto.packageId)
    if (!pkg) throw new Error('Package not found')

    const now = new Date().toISOString()
    const newLog: PackageLogInterface = {
      id: `log-${Date.now()}`,
      packageId: dto.packageId,
      fromWarehouseId: dto.fromWarehouseId,
      toWarehouseId: dto.toWarehouseId,
      previousStatus: pkg.status,
      newStatus: dto.newStatus,
      description: dto.description,
      timestamp: now,
    }
    pkg.logHistory.push(newLog)
    pkg.status = dto.newStatus
    pkg.updatedAt = now
    setToStorage(STORAGE_KEYS.PACKAGES, packages)
    return newLog
  }

  static async update(dto: UpdatePackageLogDTO): Promise<PackageLogInterface | undefined> {
    const packages = loadPackages()
    const pkg = packages.find((p) => p.id === dto.packageId)
    if (!pkg) return undefined

    const idx = pkg.logHistory.findIndex((l) => l.id === dto.id)
    const log = idx !== -1 ? pkg.logHistory[idx] : undefined
    if (!log) return undefined

    if (dto.fromWarehouseId !== undefined) log.fromWarehouseId = dto.fromWarehouseId
    if (dto.toWarehouseId !== undefined) log.toWarehouseId = dto.toWarehouseId
    if (dto.newStatus !== undefined) log.newStatus = dto.newStatus
    if (dto.description !== undefined) log.description = dto.description

    pkg.updatedAt = new Date().toISOString()
    setToStorage(STORAGE_KEYS.PACKAGES, packages)
    return log
  }

  static async remove(id: string, packageId: string): Promise<void> {
    const packages = loadPackages()
    const pkg = packages.find((p) => p.id === packageId)
    if (!pkg) return

    pkg.logHistory = pkg.logHistory.filter((l) => l.id !== id)
    pkg.updatedAt = new Date().toISOString()
    setToStorage(STORAGE_KEYS.PACKAGES, packages)
  }
}
