/** @author David Hdez */
// internal imports
import type { PackageInterface } from "@/interfaces/PackageInterface";

export const packageSeeder: PackageInterface[] = [
  {
    id: 1,
    trackingNumber: "TRK-9902-A1",
    description: "Industrial Pump Spare Parts",
    status: "In Transit",
    weight: 12.5,
    carrier: "FedEx",
    warehouseId: 1,
  },
  {
    id: 2,
    trackingNumber: "TRK-8812-B3",
    description: "Solar Panel Modules (x20)",
    status: "At Warehouse",
    weight: 45.0,
    carrier: "DHL",
    warehouseId: 2,
  },
  {
    id: 3,
    trackingNumber: "TRK-7721-C7",
    description: "Server Rack Components",
    status: "Delivered",
    weight: 8.2,
    carrier: "UPS",
    warehouseId: 3,
  },
  {
    id: 4,
    trackingNumber: "TRK-1022-P1",
    description: "Medical Supply Box",
    status: "Pending",
    weight: 3.1,
    carrier: "FedEx",
    warehouseId: 4,
  },
  {
    id: 5,
    trackingNumber: "TRK-7711-E4",
    description: "Fiber Optic Panels",
    status: "Exception",
    weight: 22.0,
    carrier: "Amazon",
    warehouseId: 2,
  },
];
