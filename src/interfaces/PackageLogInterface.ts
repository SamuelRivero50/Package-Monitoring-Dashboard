/**
 * @author Samuel Rivero, Dav, Juan Andrés Young Hoyos
 * @description PackageLog domain interface from class diagram.
 * Diagram: id, package (Package), fromWarehouse (Warehouse), toWarehouse (Warehouse),
 * previousStatus, newStatus, description, timestamp. We use *Id for JSON storage.
 */

export interface PackageLogInterface {
  id: string
  packageId: string
  fromWarehouseId: string
  toWarehouseId: string
  previousStatus: string
  newStatus: string
  description: string
  timestamp: string
}
