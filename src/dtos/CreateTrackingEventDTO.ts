/** @author David Hdez */
// internal imports
import type { TrackingEventInterface } from "@/interfaces/TrackingEventInterface";

export type CreateTrackingEventDTO = Omit<
  TrackingEventInterface,
  "id" | "createdAt"
>;
