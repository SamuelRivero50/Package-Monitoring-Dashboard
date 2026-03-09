/**
 * @author Samuel Rivero, Dav, Juan Andrés Young Hoyos
 * @description DTO for updating a Package.
 */

export interface UpdatePackageDTO {
  id: string
  userId?: string
  warehouseId?: string | null
  status?: string
  description?: string
  price?: number
}
