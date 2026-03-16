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
    managerName: "Robert Chen",
    imageUrl: "https://picsum.photos/seed/1/400/200",
  },
  {
    id: 2,
    name: "West Coast Depot",
    location: "Los Angeles, CA",
    capacity: 3500,
    currentLoad: 2170,
    managerName: "Sandra Lee",
    imageUrl: "https://picsum.photos/seed/2/400/200",
  },
  {
    id: 3,
    name: "East Distribution",
    location: "Newark, NJ",
    capacity: 4200,
    currentLoad: 3948,
    managerName: "Marcus Williams",
    imageUrl: "https://picsum.photos/seed/3/400/200",
  },
  {
    id: 4,
    name: "South Regional",
    location: "Atlanta, GA",
    capacity: 2800,
    currentLoad: 1176,
    managerName: "Diana Torres",
    imageUrl: "https://picsum.photos/seed/4/400/200",
  },
];
