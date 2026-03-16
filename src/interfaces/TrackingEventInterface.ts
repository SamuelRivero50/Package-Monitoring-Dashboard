/** @author David Hdez */
export interface TrackingEventInterface {
  id: number;
  createdAt: Date;

  // relations
  packageId: number;
  fromWarehouseId: number;
  toWarehouseId: number;
}
