/** @author David Hdez */
// internal imports
import type { TrackingEventInterface } from "@/interfaces/TrackingEventInterface";

export const trackingEventSeeder: TrackingEventInterface[] = [
  {
    id: 1,
    packageId: 1,
    fromWarehouseId: 1,
    toWarehouseId: 2,
    createdAt: new Date("2026-03-10T08:00:00"),
  },
  {
    id: 2,
    packageId: 1,
    fromWarehouseId: 2,
    toWarehouseId: 3,
    createdAt: new Date("2026-03-11T14:30:00"),
  },
  {
    id: 3,
    packageId: 2,
    fromWarehouseId: 1,
    toWarehouseId: 2,
    createdAt: new Date("2026-03-09T10:15:00"),
  },
  {
    id: 4,
    packageId: 3,
    fromWarehouseId: 3,
    toWarehouseId: 4,
    createdAt: new Date("2026-03-08T16:45:00"),
  },
  {
    id: 5,
    packageId: 3,
    fromWarehouseId: 2,
    toWarehouseId: 3,
    createdAt: new Date("2026-03-08T09:00:00"),
  },
  {
    id: 6,
    packageId: 4,
    fromWarehouseId: 4,
    toWarehouseId: 1,
    createdAt: new Date("2026-03-12T07:00:00"),
  },
  {
    id: 7,
    packageId: 5,
    fromWarehouseId: 2,
    toWarehouseId: 4,
    createdAt: new Date("2026-03-11T11:20:00"),
  },
];
