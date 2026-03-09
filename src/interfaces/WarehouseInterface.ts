/**
 * @author Samuel Rivero, Dav, Juan Andrés Young Hoyos
 * @description Warehouse domain interface from class diagram.
 * Diagram: id, name, location, capacity, managerName, imageUrl, checkAvailability(): boolean
 */

export interface WarehouseInterface {
  id: string
  name: string
  location: string
  capacity: number
  managerName: string
  imageUrl: string
}
