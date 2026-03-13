/** @author David Hdez */
// internal imports
import type { CreateTrackingEventDTO } from "@/dtos/CreateTrackingEventDTO";
import type { TrackingEventInterface } from "@/interfaces/TrackingEventInterface";
import { useTrackingEventStore } from "@/stores/trackingeventstore";

export class TrackingEventService {
  static getTrackingEvents(): TrackingEventInterface[] {
    return useTrackingEventStore().trackingEvents;
  }

  static getTrackingEventsByPackageId(
    packageId: number,
  ): TrackingEventInterface[] {
    return useTrackingEventStore().trackingEvents.filter(
      (event) => event.packageId === packageId,
    );
  }

  static createTrackingEvent(event: CreateTrackingEventDTO): void {
    const id = useTrackingEventStore().trackingEvents.length + 1;
    useTrackingEventStore().trackingEvents.push({
      id,
      ...event,
      createdAt: new Date(),
    });
  }
}
