/**
 * @author Samuel Rivero
 * @description DTO for creating a PackageLog entry.
 */

export interface CreatePackageLogDTO {
  packageId: string
  fromWarehouseId: string
  toWarehouseId: string
  newStatus: string
  description: string
}
