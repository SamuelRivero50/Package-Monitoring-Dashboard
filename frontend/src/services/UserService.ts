/** @author David Hdez, Juan Andrés Young */
// Internal imports
import type { UpdateUserDTO } from '@/dtos/users/UpdateUserDTO';
import type { UserInterface } from '@/interfaces/UserInterface';
import { httpClient } from '@/services/httpClient';

export class UserService {
  static async getAll(): Promise<UserInterface[]> {
    const { data } = await httpClient.get<UserInterface[]>('users');
    return data;
  }

  static async getById(id: string): Promise<UserInterface> {
    const { data } = await httpClient.get<UserInterface>(`users/${id}`);
    return data;
  }

  static async update(
    id: string,
    payload: UpdateUserDTO,
  ): Promise<UserInterface> {
    const { data } = await httpClient.patch<UserInterface>(
      `users/${id}`,
      payload,
    );
    return data;
  }

  static async delete(id: string): Promise<void> {
    await httpClient.delete(`users/${id}`);
  }
}
