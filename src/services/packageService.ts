/** @author David Hdez */
// internal imports
import type { PackageInterface } from "@/interfaces/PackageInterface";
import { usePackageStore } from "@/stores/packagestore";
import { WarehouseService } from "@/services/WarehouseService";
import type { CreatePackageDTO } from "@/dtos/CreatePackageDTO";

export class PackageService {
  static getPackages(): PackageInterface[] {
    this.ensureWarehouseAssignments();
    return usePackageStore().packages;
  }

  static ensureWarehouseAssignments(): void {
    const packageStore = usePackageStore();
    const warehouses = WarehouseService.getWarehouses();
    if (warehouses.length === 0) return;

    const warehouseIds = warehouses.map((warehouse) => warehouse.id);
    const validWarehouseIds = new Set<number>(warehouseIds);

    packageStore.packages.forEach((pkg, index) => {
      if (!validWarehouseIds.has(pkg.warehouseId)) {
        const nextWarehouseId =
          warehouseIds[index % warehouseIds.length] ?? warehouseIds[0];
        if (nextWarehouseId !== undefined) {
          pkg.warehouseId = nextWarehouseId;
        }
      }
    });
  }

  static getUniqueStatuses(): string[] {
    const packages = this.getPackages();
    const statuses = packages.map((pkg) => pkg.status);
    const uniqueStatuses = new Set(statuses);

    return Array.from(uniqueStatuses);
  }

  static getUniqueCarriers(): string[] {
    const packages = this.getPackages();
    return Array.from(new Set(packages.map((pkg) => pkg.carrier)));
  }

  static getPackageById(id: number): PackageInterface | undefined {
    return usePackageStore().packages.find((pkg) => pkg.id === id);
  }

  static createPackage(pkg: CreatePackageDTO): void {
    const warehouses = WarehouseService.getWarehouses();
    const warehouseIds = warehouses.map((warehouse) => warehouse.id);
    const fallbackWarehouseId = warehouseIds[0] ?? 1;
    const assignedWarehouseId = warehouseIds.includes(pkg.warehouseId)
      ? pkg.warehouseId
      : fallbackWarehouseId;

    const id = usePackageStore().packages.length + 1;
    usePackageStore().packages.push({
      id,
      ...pkg,
      warehouseId: assignedWarehouseId,
    });
  }
}
