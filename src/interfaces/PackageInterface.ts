/** @author David Hdez */
export interface PackageInterface {
  id: number;
  description: string;
  status: string;
  warehouseId: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}
