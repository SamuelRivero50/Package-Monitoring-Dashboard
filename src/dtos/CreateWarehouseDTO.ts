/**
 * @author Samuel Rivero
 * @description DTO for creating a Warehouse.
 */

export interface CreateWarehouseDTO {
  name: string
  location: string
  capacity: number
  managerName: string
  imageUrl?: string
}
