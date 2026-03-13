/** @author David Hdez */
// internal imports
import type { WarehouseInterface } from "@/interfaces/WarehouseInterface";

export const warehouseSeeder: WarehouseInterface[] = [
  {
    id: 1,
    name: "Central Hub",
    location: "Chicago, IL",
    capacity: 5000,
    currentLoad: 4250,
    status: "Active",
  },
  {
    id: 2,
    name: "West Coast Depot",
    location: "Los Angeles, CA",
    capacity: 3500,
    currentLoad: 2170,
    status: "Active",
  },
  {
    id: 3,
    name: "East Distribution",
    location: "Newark, NJ",
    capacity: 4200,
    currentLoad: 3948,
    status: "Active",
  },
  {
    id: 4,
    name: "South Regional",
    location: "Atlanta, GA",
    capacity: 2800,
    currentLoad: 1176,
    status: "Maintenance",
  },
];
