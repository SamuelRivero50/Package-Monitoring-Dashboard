/** @author David Hdez */
// internal imports
import type { CreateUserDTO } from "@/dtos/users/CreateUserDTO";
import type { UserInterface } from "@/interfaces/UserInterface";
import { useUserStore } from "@/stores/userstore";

export class UserService {
  static getUsers(): UserInterface[] {
    return useUserStore().users;
  }

  static getUserById(id: number): UserInterface | undefined {
    return useUserStore().users.find((u) => u.id === id);
  }

  static createUser(user: CreateUserDTO): void {
    const id = useUserStore().users.length + 1;
    useUserStore().users.push({ id, ...user });
  }

  static updateUser(id: number, data: Partial<CreateUserDTO>): void {
    const user = useUserStore().users.find((u) => u.id === id);
    if (user) Object.assign(user, data);
  }

  static deleteUser(id: number): void {
    const store = useUserStore();
    const index = store.users.findIndex((u) => u.id === id);
    if (index !== -1) store.users.splice(index, 1);
  }

}
