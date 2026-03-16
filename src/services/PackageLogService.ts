/** @author David Hdez, Juan Andrés Young */
// internal imports
import type { CreatePackageLogDTO } from "@/dtos/packagelogs/CreatePackageLogDTO";
import type { PackageLogInterface } from "@/interfaces/PackageLogInterface";
import { WarehouseService } from "@/services/WarehouseService";
import { usePackageLogStore } from "@/stores/packagelogstore";

export class PackageLogService {
  // Normalize legacy records to the current warehouse-based event schema.
  private static normalizeLegacyLogs(): void {
    const store = usePackageLogStore();
    const warehouses = WarehouseService.getWarehouses();
    const defaultFromWarehouseId = warehouses[0]?.id ?? 1;
    const defaultToWarehouseId = warehouses[1]?.id ?? defaultFromWarehouseId;

    store.packageLogs.forEach((log) => {
      const logRecord = log as unknown as Record<string, unknown>;

      if (typeof logRecord.fromWarehouseId !== "number") {
        logRecord.fromWarehouseId = defaultFromWarehouseId;
      }

      if (typeof logRecord.toWarehouseId !== "number") {
        logRecord.toWarehouseId = defaultToWarehouseId;
      }

      // Migrate legacy createdAt field to timestamp.
      if (logRecord.createdAt !== undefined && logRecord.timestamp === undefined) {
        logRecord.timestamp = logRecord.createdAt;
        delete logRecord.createdAt;
      }

      if (logRecord.timestamp === undefined) {
        logRecord.timestamp = new Date();
      }

      if (logRecord.previousStatus === undefined) {
        logRecord.previousStatus = "";
      }

      if (logRecord.newStatus === undefined) {
        logRecord.newStatus = "";
      }

      if (logRecord.description === undefined) {
        logRecord.description = "";
      }

      delete logRecord.location;
    });
  }

  static getPackageLogs(): PackageLogInterface[] {
    this.normalizeLegacyLogs();
    return usePackageLogStore().packageLogs;
  }

  static getPackageLogsByPackageId(packageId: number): PackageLogInterface[] {
    return this.getPackageLogs().filter((log) => log.packageId === packageId);
  }

  static createPackageLog(log: CreatePackageLogDTO): void {
    // Prevent self-routes at the service layer.
    if (log.fromWarehouseId === log.toWarehouseId) {
      throw new Error("Origin and destination warehouses must be different.");
    }

    const id = usePackageLogStore().packageLogs.length + 1;
    usePackageLogStore().packageLogs.push({
      id,
      ...log,
      timestamp: new Date(),
    });
  }

  static updatePackageLog(id: number, data: Partial<CreatePackageLogDTO>): void {
    const packageLog = usePackageLogStore().packageLogs.find((log) => log.id === id);

    if (!packageLog) return;

    const nextFromWarehouseId = data.fromWarehouseId ?? packageLog.fromWarehouseId;
    const nextToWarehouseId = data.toWarehouseId ?? packageLog.toWarehouseId;

    if (nextFromWarehouseId === nextToWarehouseId) {
      throw new Error("Origin and destination warehouses must be different.");
    }

    Object.assign(packageLog, data);
  }
}
