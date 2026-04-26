/** @author David Hdez, Juan Andrés Young */
// Internal imports
import type { UpdateUserDTO } from '@/dtos/users/UpdateUserDTO';
import type { UserInterface } from '@/interfaces/UserInterface';
import { httpClient } from '@/services/httpClient';

export class UserService {
  static async getUsers(): Promise<UserInterface[]> {
    const { data } = await httpClient.get<UserInterface[]>('users');
    return data;
  }

  static async getUserById(id: string): Promise<UserInterface> {
    const { data } = await httpClient.get<UserInterface>(`users/${id}`);
    return data;
  }

  static async updateUser(
    id: string,
    payload: UpdateUserDTO,
  ): Promise<UserInterface> {
    const { data } = await httpClient.patch<UserInterface>(
      `users/${id}`,
      payload,
    );
    return data;
  }

  static async deleteUser(id: string): Promise<void> {
    await httpClient.delete(`users/${id}`);
  }
}
