/** @author David Hdez */
export interface PackageLogInterface {
  id: number;
  timestamp: Date;
  previousStatus?: string;
  newStatus?: string;
  description?: string;

  // relations
  packageId: number;
  fromWarehouseId: number;
  toWarehouseId: number;
}
