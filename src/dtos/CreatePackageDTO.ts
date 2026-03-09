/**
 * @author Samuel Rivero, Dav, Juan Andrés Young Hoyos
 * @description DTO for creating a Package.
 */

export interface CreatePackageDTO {
  userId: string
  warehouseId?: string | null
  status: string
  description: string
  price: number
}
