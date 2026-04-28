/** @author David Hdez, Juan Andrés Young */
// Internal imports
import type { CreateWarehouseDTO } from '@/dtos/warehouses/CreateWarehouseDTO';
import type { UpdateWarehouseDTO } from '@/dtos/warehouses/UpdateWarehouseDTO';
import type { WarehouseInterface } from '@/interfaces/WarehouseInterface';
import { httpClient } from '@/services/httpClient';

export class WarehouseService {
  static async getWarehouses(): Promise<WarehouseInterface[]> {
    const { data } = await httpClient.get<WarehouseInterface[]>('warehouses');
    return data;
  }

  static async getWarehouseById(id: string): Promise<WarehouseInterface> {
    const { data } = await httpClient.get<WarehouseInterface>(
      `warehouses/${id}`,
    );
    return data;
  }

  static async createWarehouse(
    payload: CreateWarehouseDTO,
  ): Promise<WarehouseInterface> {
    const { data } = await httpClient.post<WarehouseInterface>(
      'warehouses',
      payload,
    );
    return data;
  }

  static async updateWarehouse(
    id: string,
    payload: UpdateWarehouseDTO,
  ): Promise<WarehouseInterface> {
    const { data } = await httpClient.patch<WarehouseInterface>(
      `warehouses/${id}`,
      payload,
    );
    return data;
  }

  static async deleteWarehouse(id: string): Promise<void> {
    await httpClient.delete(`warehouses/${id}`);
  }
}
