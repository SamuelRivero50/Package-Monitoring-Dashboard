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
    avatarUrl: "https://ui-avatars.com/api/?name=Alex+Johnson&background=6366f1&color=fff&size=150",
  },
  {
    id: 2,
    name: "Maria Garcia",
    email: "maria@packtrack.io",
    password: "maria123",
    role: "User",
    avatarUrl: "https://ui-avatars.com/api/?name=Maria+Garcia&background=f59e0b&color=fff&size=150",
  },
  {
    id: 3,
    name: "John Smith",
    email: "john@packtrack.io",
    password: "john123",
    role: "User",
    avatarUrl: "https://ui-avatars.com/api/?name=John+Smith&background=10b981&color=fff&size=150",
  },
  {
    id: 4,
    name: "Elena Rodriguez",
    email: "elena@packtrack.io",
    password: "elena123",
    role: "User",
    avatarUrl: "https://ui-avatars.com/api/?name=Elena+Rodriguez&background=f43f5e&color=fff&size=150",
  },
  {
    id: 4,
    name: "Eledna Rodriguez",
    email: "eledna@packtrack.io",
    password: "eldena123",
    role: "Admin",
    avatarUrl: "https://ui-avatars.com/api/?name=Elena+Rodriguez&background=f43f5e&color=fff&size=150",
  },
];
