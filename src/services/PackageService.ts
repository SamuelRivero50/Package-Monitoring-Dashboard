/** @author David Hdez, Juan Andrés Young */
// Internal imports
import type { CreatePackageDTO } from '@/dtos/packages/CreatePackageDTO';
import type { PackageInterface } from '@/interfaces/PackageInterface';
import type { UpdatePackageDTO } from '@/dtos/packages/UpdatePackageDTO';
import { httpClient } from '@/services/httpClient';

export class PackageService {
  static async getPackages(): Promise<PackageInterface[]> {
    const { data } = await httpClient.get<PackageInterface[]>('packages');
    return data;
  }

  static async getPackageById(id: string): Promise<PackageInterface> {
    const { data } = await httpClient.get<PackageInterface>(`packages/${id}`);
    return data;
  }

  static async createPackage(
    payload: CreatePackageDTO,
  ): Promise<PackageInterface> {
    const { data } = await httpClient.post<PackageInterface>(
      'packages',
      payload,
    );
    return data;
  }

  static async updatePackage(
    id: string,
    payload: UpdatePackageDTO,
  ): Promise<PackageInterface> {
    const { data } = await httpClient.patch<PackageInterface>(
      `packages/${id}`,
      payload,
    );
    return data;
  }

  static async deletePackage(id: string): Promise<void> {
    await httpClient.delete(`packages/${id}`);
  }
}
