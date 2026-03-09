/**
 * @author Samuel Rivero, Dav, Juan Andrés Young Hoyos
 * @description Package domain interface from class diagram.
 * Diagram: id, user (User), warehouse (Warehouse), status, description, price,
 * createdAt, updatedAt, logHistory (PackageLog[]). We use userId/warehouseId for JSON storage.
 */

import type { PackageLogInterface } from './PackageLogInterface'

export interface PackageInterface {
  id: string
  userId: string
  warehouseId: string | null
  status: string
  description: string
  price: number
  createdAt: string
  updatedAt: string
  logHistory: PackageLogInterface[]
}
