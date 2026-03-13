/** @author David Hdez */
// internal imports
import type { UserInterface } from "@/interfaces/UserInterface";
import { useAuthStore } from "@/stores/authstore";
import { useUserStore } from "@/stores/userstore";

export class AuthService {
  static getCurrentUser(): UserInterface | null {
    return useAuthStore().currentUser;
  }

  static isAuthenticated(): boolean {
    return useAuthStore().isAuthenticated;
  }

  static isAdmin(): boolean {
    return useAuthStore().currentUser?.role === "Admin";
  }

  static login(email: string, password: string): void {
    const normalizedEmail = email.trim().toLowerCase();
    const user = useUserStore().users.find(
      (u) =>
        u.email.toLowerCase() === normalizedEmail && u.password === password,
    );
    if (!user) throw new Error("Invalid email or password.");
    useAuthStore().currentUser = user;
  }

  static register(name: string, email: string, password: string): void {
    const trimmedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (!trimmedName || !normalizedEmail || !trimmedPassword) {
      throw new Error("All fields are required.");
    }

    const existingUser = useUserStore().users.find(
      (u) => u.email.toLowerCase() === normalizedEmail,
    );
    if (existingUser) {
      throw new Error("Email already registered.");
    }

    const newUser: UserInterface = {
      id: useUserStore().users.length + 1,
      name: trimmedName,
      email: normalizedEmail,
      password: trimmedPassword,
      role: "User",
      status: "Active",
    };

    useUserStore().users.push(newUser);
    useAuthStore().currentUser = newUser;
  }

  static logout(): void {
    useAuthStore().currentUser = null;
  }
}
