/** @author David Hdez */
// internal imports
import type { PackageInterface } from "@/interfaces/PackageInterface";

export const packageSeeder: PackageInterface[] = [
  {
    id: 1,
    description: "Industrial Pump Spare Parts",
    status: "In Transit",
    warehouseId: 1,
    price: 340.0,
    createdAt: new Date("2026-03-08T08:00:00"),
    updatedAt: new Date("2026-03-11T14:30:00"),
  },
  {
    id: 2,
    description: "Solar Panel Modules (x20)",
    status: "At Warehouse",
    warehouseId: 2,
    price: 1250.0,
    createdAt: new Date("2026-03-07T10:00:00"),
    updatedAt: new Date("2026-03-09T10:15:00"),
  },
  {
    id: 3,
    description: "Server Rack Components",
    status: "Delivered",
    warehouseId: 3,
    price: 875.5,
    createdAt: new Date("2026-03-06T09:00:00"),
    updatedAt: new Date("2026-03-08T16:45:00"),
  },
  {
    id: 4,
    description: "Medical Supply Box",
    status: "Pending",
    warehouseId: 4,
    price: 210.0,
    createdAt: new Date("2026-03-11T07:00:00"),
    updatedAt: new Date("2026-03-12T07:00:00"),
  },
  {
    id: 5,
    description: "Fiber Optic Panels",
    status: "Exception",
    warehouseId: 2,
    price: 580.0,
    createdAt: new Date("2026-03-10T11:00:00"),
    updatedAt: new Date("2026-03-11T11:20:00"),
  },
];
