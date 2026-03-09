/**
 * @author Samuel Rivero
 * @description DTO for creating a Package.
 */

export interface CreatePackageDTO {
  userId: string
  warehouseId?: string | null
  status: string
  description: string
  price: number
}
