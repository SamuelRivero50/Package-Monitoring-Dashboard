/** @author David Hdez */
export interface PackageInterface {
  id: number;
  trackingNumber: string;
  description: string;
  status: string;
  weight: number;
  carrier: string;
  warehouseId: number;
}
