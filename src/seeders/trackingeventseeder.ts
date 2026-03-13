/** @author David Hdez */
// internal imports
import type { TrackingEventInterface } from "@/interfaces/TrackingEventInterface";

export const trackingEventSeeder: TrackingEventInterface[] = [
  {
    id: 1,
    packageId: 1,
    location: "Chicago, IL",
    description: "Package picked up from sender",
    createdAt: new Date("2026-03-10T08:00:00"),
  },
  {
    id: 2,
    packageId: 1,
    location: "Indianapolis, IN",
    description: "In transit to distribution center",
    createdAt: new Date("2026-03-11T14:30:00"),
  },
  {
    id: 3,
    packageId: 2,
    location: "Los Angeles, CA",
    description: "Arrived at warehouse facility",
    createdAt: new Date("2026-03-09T10:15:00"),
  },
  {
    id: 4,
    packageId: 3,
    location: "Newark, NJ",
    description: "Package delivered to recipient",
    createdAt: new Date("2026-03-08T16:45:00"),
  },
  {
    id: 5,
    packageId: 3,
    location: "New York, NY",
    description: "Out for delivery",
    createdAt: new Date("2026-03-08T09:00:00"),
  },
  {
    id: 6,
    packageId: 4,
    location: "Atlanta, GA",
    description: "Awaiting carrier pickup",
    createdAt: new Date("2026-03-12T07:00:00"),
  },
  {
    id: 7,
    packageId: 5,
    location: "Miami, FL",
    description: "Delivery exception - address issue",
    createdAt: new Date("2026-03-11T11:20:00"),
  },
];
