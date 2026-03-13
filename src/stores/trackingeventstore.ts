/** @author David Hdez */
// external imports
import { defineStore } from "pinia";
import { ref } from "vue";

// internal imports
import type { TrackingEventInterface } from "@/interfaces/TrackingEventInterface";

export const useTrackingEventStore = defineStore("trackingevent", () => {
  const trackingEvents = ref<TrackingEventInterface[]>([]);

  return { trackingEvents };
});
