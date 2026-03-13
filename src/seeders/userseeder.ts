/** @author David Hdez */
// internal imports
import type { UserInterface } from "@/interfaces/UserInterface";

export const userSeeder: UserInterface[] = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex@packtrack.io",
    password: "admin123",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Maria Garcia",
    email: "maria@packtrack.io",
    password: "maria123",
    role: "User",
    status: "Active",
  },
  {
    id: 3,
    name: "John Smith",
    email: "john@packtrack.io",
    password: "john123",
    role: "User",
    status: "Active",
  },
  {
    id: 4,
    name: "Elena Rodriguez",
    email: "elena@packtrack.io",
    password: "elena123",
    role: "User",
    status: "Inactive",
  },
];
