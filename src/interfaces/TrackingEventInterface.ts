/** @author David Hdez */
export interface TrackingEventInterface {
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
