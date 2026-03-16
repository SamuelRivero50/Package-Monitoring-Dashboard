/** @author David Hdez */
// internal imports
import type { CreateWarehouseDTO } from "@/dtos/warehouses/CreateWarehouseDTO";
import type { WarehouseInterface } from "@/interfaces/WarehouseInterface";
import { useWarehouseStore } from "@/stores/warehousestore";

export class WarehouseService {
  static getWarehouses(): WarehouseInterface[] {
    return useWarehouseStore().warehouses;
  }

  static getUniqueStatuses(): string[] {
    const warehouses = this.getWarehouses();
    return Array.from(new Set(warehouses.map((w) => w.status)));
  }

  static getUniqueLocations(): string[] {
    const warehouses = this.getWarehouses();
    return Array.from(new Set(warehouses.map((w) => w.location)));
  }

  static getWarehouseById(id: number): WarehouseInterface | undefined {
    return useWarehouseStore().warehouses.find((w) => w.id === id);
  }

  static createWarehouse(warehouse: CreateWarehouseDTO): void {
    const id = useWarehouseStore().warehouses.length + 1;
    useWarehouseStore().warehouses.push({ id, ...warehouse });
  }
}
