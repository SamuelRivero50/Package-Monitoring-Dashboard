/** @author David Hdez */
// internal imports
import type { UserInterface } from "@/interfaces/UserInterface";
import { useUserStore } from "@/stores/userstore";
import type { CreateUserDTO } from "@/dtos/CreateUserDTO";

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
}
