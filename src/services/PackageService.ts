/** @author David Hdez */
// internal imports
import type { CreatePackageDTO } from "@/dtos/packages/CreatePackageDTO";
import type { PackageInterface } from "@/interfaces/PackageInterface";
import { WarehouseService } from "@/services/WarehouseService";
import { usePackageStore } from "@/stores/packagestore";

export class PackageService {
  static getPackages(): PackageInterface[] {
    this.ensureWarehouseAssignments();
    return usePackageStore().packages;
  }

  // Auto-repair invalid warehouse references to preserve referential integrity.
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

  static getPackageById(id: number): PackageInterface | undefined {
    return usePackageStore().packages.find((pkg) => pkg.id === id);
  }

  static createPackage(pkg: CreatePackageDTO): void {
    const warehouses = WarehouseService.getWarehouses();
    const warehouseIds = warehouses.map((warehouse) => warehouse.id);
    const fallbackWarehouseId = warehouseIds[0] ?? 1;
    // Use a valid fallback when incoming warehouseId is missing or invalid.
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

  static updatePackage(id: number, data: Partial<CreatePackageDTO>): void {
    const pkg = usePackageStore().packages.find((p) => p.id === id);
    if (pkg) Object.assign(pkg, data);
  }

  static deletePackage(id: number): void {
    const store = usePackageStore();
    const index = store.packages.findIndex((p) => p.id === id);
    if (index !== -1) store.packages.splice(index, 1);
  }

}
