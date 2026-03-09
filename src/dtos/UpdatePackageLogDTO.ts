/**
 * @author Samuel Rivero
 * @description DTO for updating a PackageLog entry.
 */

export interface UpdatePackageLogDTO {
  id: string
  packageId: string
  fromWarehouseId?: string
  toWarehouseId?: string
  newStatus?: string
  description?: string
}
