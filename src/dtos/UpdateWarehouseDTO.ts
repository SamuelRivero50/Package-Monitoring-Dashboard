/**
 * @author Samuel Rivero
 * @description DTO for updating a Warehouse.
 */

export interface UpdateWarehouseDTO {
  id: string
  name?: string
  location?: string
  capacity?: number
  managerName?: string
  imageUrl?: string
}
