/** @author David Hdez, Juan Andrés Young */
// Internal imports
import type { CreatePackageLogDTO } from '@/dtos/packagelogs/CreatePackageLogDTO';
import type { PackageLogInterface } from '@/interfaces/PackageLogInterface';
import type { UpdatePackageLogDTO } from '@/dtos/packagelogs/UpdatePackageLogDTO';
import { httpClient } from '@/services/httpClient';

export class PackageLogService {
  static async getAll(): Promise<PackageLogInterface[]> {
    const { data } = await httpClient.get<PackageLogInterface[]>(
      'package-logs',
    );
    return data;
  }

  static async getById(id: string): Promise<PackageLogInterface> {
    const { data } = await httpClient.get<PackageLogInterface>(
      `package-logs/${id}`,
    );
    return data;
  }

  static async getByPackageId(
    packageId: string,
  ): Promise<PackageLogInterface[]> {
    const { data } = await httpClient.get<PackageLogInterface[]>(
      `package-logs/by-package/${packageId}`,
    );
    return data;
  }

  static async create(
    payload: CreatePackageLogDTO,
  ): Promise<PackageLogInterface> {
    const { data } = await httpClient.post<PackageLogInterface>(
      'package-logs',
      payload,
    );
    return data;
  }

  static async update(
    id: string,
    payload: UpdatePackageLogDTO,
  ): Promise<PackageLogInterface> {
    const { data } = await httpClient.patch<PackageLogInterface>(
      `package-logs/${id}`,
      payload,
    );
    return data;
  }

  static async delete(id: string): Promise<void> {
    await httpClient.delete(`package-logs/${id}`);
  }
}
