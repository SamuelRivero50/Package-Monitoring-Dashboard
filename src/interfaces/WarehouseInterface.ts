/** @author David Hdez */
export interface WarehouseInterface {
  id: number;
  name: string;
  location: string;
  capacity: number;
  currentLoad: number;
  managerName: string;
  imageUrl: string;
}
