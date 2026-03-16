/** @author David Hdez, Juan Andrés Young */
export interface PackageInterface {
  id: number;
  userId: number;
  description: string;
  status: string;
  warehouseId: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}
