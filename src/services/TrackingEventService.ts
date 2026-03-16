/** @author David Hdez */
// internal imports
import type { CreateTrackingEventDTO } from "@/dtos/tracking/CreateTrackingEventDTO";
import type { TrackingEventInterface } from "@/interfaces/TrackingEventInterface";
import { WarehouseService } from "@/services/WarehouseService";
import { useTrackingEventStore } from "@/stores/trackingeventstore";

export class TrackingEventService {
  // Normalize legacy records to the current warehouse-based event schema.
  private static normalizeLegacyEvents(): void {
    const store = useTrackingEventStore();
    const warehouses = WarehouseService.getWarehouses();
    const defaultFromWarehouseId = warehouses[0]?.id ?? 1;
    const defaultToWarehouseId = warehouses[1]?.id ?? defaultFromWarehouseId;

    store.trackingEvents.forEach((event) => {
      const eventRecord = event as unknown as Record<string, unknown>;

      if (typeof eventRecord.fromWarehouseId !== "number") {
        eventRecord.fromWarehouseId = defaultFromWarehouseId;
      }

      if (typeof eventRecord.toWarehouseId !== "number") {
        eventRecord.toWarehouseId = defaultToWarehouseId;
      }

      delete eventRecord.location;
      delete eventRecord.description;
    });
  }

  static getTrackingEvents(): TrackingEventInterface[] {
    this.normalizeLegacyEvents();
    return useTrackingEventStore().trackingEvents;
  }

  static getTrackingEventsByPackageId(
    packageId: number,
  ): TrackingEventInterface[] {
    return this.getTrackingEvents().filter((event) => event.packageId === packageId);
  }

  static createTrackingEvent(event: CreateTrackingEventDTO): void {
    // Prevent self-routes at the service layer.
    if (event.fromWarehouseId === event.toWarehouseId) {
      throw new Error("Origin and destination warehouses must be different.");
    }

    const id = useTrackingEventStore().trackingEvents.length + 1;
    useTrackingEventStore().trackingEvents.push({
      id,
      ...event,
      createdAt: new Date(),
    });
  }

  static updateTrackingEvent(
    id: number,
    data: Partial<CreateTrackingEventDTO>,
  ): void {
    const trackingEvent = useTrackingEventStore().trackingEvents.find(
      (event) => event.id === id,
    );

    if (!trackingEvent) return;

    const nextFromWarehouseId = data.fromWarehouseId ?? trackingEvent.fromWarehouseId;
    const nextToWarehouseId = data.toWarehouseId ?? trackingEvent.toWarehouseId;

    if (nextFromWarehouseId === nextToWarehouseId) {
      throw new Error("Origin and destination warehouses must be different.");
    }

    Object.assign(trackingEvent, data);
  }
}
