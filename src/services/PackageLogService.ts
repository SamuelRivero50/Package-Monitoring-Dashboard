/** @author David Hdez, Juan Andrés Young */
// Internal imports
import type { CreatePackageLogDTO } from '@/dtos/packagelogs/CreatePackageLogDTO';
import type { PackageLogInterface } from '@/interfaces/PackageLogInterface';
import type { UpdatePackageLogDTO } from '@/dtos/packagelogs/UpdatePackageLogDTO';
import { httpClient } from '@/services/httpClient';

export class PackageLogService {
  static async getPackageLogs(): Promise<PackageLogInterface[]> {
    const { data } = await httpClient.get<PackageLogInterface[]>(
      'package-logs',
    );
    return data;
  }

  static async getPackageLogById(id: string): Promise<PackageLogInterface> {
    const { data } = await httpClient.get<PackageLogInterface>(
      `package-logs/${id}`,
    );
    return data;
  }

  static async getPackageLogsByPackageId(
    packageId: string,
  ): Promise<PackageLogInterface[]> {
    const { data } = await httpClient.get<PackageLogInterface[]>(
      `package-logs/by-package/${packageId}`,
    );
    return data;
  }

  static async createPackageLog(
    payload: CreatePackageLogDTO,
  ): Promise<PackageLogInterface> {
    if (payload.fromWarehouseId === payload.toWarehouseId) {
      throw new Error('Origin and destination warehouses must be different.');
    }

    const { data } = await httpClient.post<PackageLogInterface>(
      'package-logs',
      payload,
    );
    return data;
  }

  static async updatePackageLog(
    id: string,
    payload: UpdatePackageLogDTO,
  ): Promise<PackageLogInterface> {
    const { data } = await httpClient.patch<PackageLogInterface>(
      `package-logs/${id}`,
      payload,
    );
    return data;
  }

  static async deletePackageLog(id: string): Promise<void> {
    await httpClient.delete(`package-logs/${id}`);
  }
}
