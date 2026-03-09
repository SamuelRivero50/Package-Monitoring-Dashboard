/**
 * @author Samuel Rivero, Dav, Juan Andrés Young Hoyos
 * @description CRUD operations for the Package entity.
 */

import { apiFetch } from './api'
import type { PackageInterface } from '@/interfaces'
import type { CreatePackageDTO, UpdatePackageDTO } from '@/dtos'

const MOCK_PACKAGES: PackageInterface[] = [
  {
    id: 'pkg-1',
    userId: 'user-1',
    warehouseId: 'wh-1',
    status: 'In Transit',
    description: 'Electronics Kit',
    price: 299.99,
    createdAt: '2026-03-06T09:00:00Z',
    updatedAt: '2026-03-06T14:20:00Z',
    logHistory: [
      {
        id: 'log-1',
        packageId: 'pkg-1',
        fromWarehouseId: 'wh-1',
        toWarehouseId: 'wh-2',
        previousStatus: 'Pending',
        newStatus: 'In Transit',
        description: 'Picked up from warehouse',
        timestamp: '2026-03-06T09:12:00Z',
      },
    ],
  },
  {
    id: 'pkg-2',
    userId: 'user-2',
    warehouseId: 'wh-2',
    status: 'Delivered',
    description: 'Spare Parts',
    price: 89.5,
    createdAt: '2026-03-04T08:00:00Z',
    updatedAt: '2026-03-05T14:42:00Z',
    logHistory: [
      {
        id: 'log-2',
        packageId: 'pkg-2',
        fromWarehouseId: 'wh-2',
        toWarehouseId: 'wh-2',
        previousStatus: 'In Transit',
        newStatus: 'Delivered',
        description: 'Delivered',
        timestamp: '2026-03-05T14:42:00Z',
      },
    ],
  },
  {
    id: 'pkg-3',
    userId: 'user-3',
    warehouseId: null,
    status: 'Pending',
    description: 'Medical Box',
    price: 150,
    createdAt: '2026-03-06T07:00:00Z',
    updatedAt: '2026-03-06T07:00:00Z',
    logHistory: [
      {
        id: 'log-3',
        packageId: 'pkg-3',
        fromWarehouseId: '',
        toWarehouseId: '',
        previousStatus: '',
        newStatus: 'Pending',
        description: 'Label created',
        timestamp: '2026-03-06T07:00:00Z',
      },
    ],
  },
]

export class PackageService {
  static async getAll(status?: string): Promise<PackageInterface[]> {
    const filtered =
      status && status !== 'All' ? MOCK_PACKAGES.filter((p) => p.status === status) : MOCK_PACKAGES
    return apiFetch('/packages', undefined, filtered)
  }

  static async getById(id: string): Promise<PackageInterface | undefined> {
    return apiFetch(
      `/packages/${id}`,
      undefined,
      MOCK_PACKAGES.find((p) => p.id === id),
    )
  }

  static async create(dto: CreatePackageDTO): Promise<PackageInterface> {
    const now = new Date().toISOString()
    const pkgId = `pkg-${Date.now()}`
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
    MOCK_PACKAGES.push(newPkg)
    return Promise.resolve(newPkg)
  }

  static async update(dto: UpdatePackageDTO): Promise<PackageInterface | undefined> {
    const pkg = MOCK_PACKAGES.find((p) => p.id === dto.id)
    if (pkg) {
      if (dto.warehouseId !== undefined) pkg.warehouseId = dto.warehouseId
      if (dto.status !== undefined) pkg.status = dto.status
      if (dto.description !== undefined) pkg.description = dto.description
      if (dto.price !== undefined) pkg.price = dto.price
      pkg.updatedAt = new Date().toISOString()
    }
    return Promise.resolve(pkg)
  }

  static async remove(id: string): Promise<void> {
    const idx = MOCK_PACKAGES.findIndex((p) => p.id === id)
    if (idx !== -1) MOCK_PACKAGES.splice(idx, 1)
    return Promise.resolve()
  }
}
