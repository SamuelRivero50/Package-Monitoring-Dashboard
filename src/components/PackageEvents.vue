<!-- @author David Hdez, Juan Andrés Young  -->
<script setup lang="ts">
// external imports
import { computed } from "vue";

// internal imports
import { TrackingEventService } from "@/services/TrackingEventService";
import { formatDateTime } from "@/utils/formatters";

const props = defineProps<{
  packageId: number;
}>();

const events = computed(() =>
  TrackingEventService.getTrackingEventsByPackageId(props.packageId),
);
</script>

<template>
  <div class="space-y-6">
    <h3 class="text-lg font-bold text-body">Tracking Events</h3>

    <!-- Event timeline -->
    <div class="relative pl-6 space-y-6">
      <div class="absolute left-2 top-2 bottom-2 w-0.5 bg-primary/20"></div>
      <div v-for="event in events" :key="event.id" class="relative">
        <div
          class="absolute -left-4 top-1 size-3 rounded-full bg-primary shadow-[0_0_8px_rgba(45,212,191,0.4)]"
        ></div>
        <div
          class="bg-sheet rounded-lg border border-wire-subtle p-4 ml-2"
        >
          <div class="flex items-center justify-between gap-2 mb-1">
            <span class="font-medium text-body text-sm">{{
              event.description
            }}</span>
          </div>
          <div class="flex items-center gap-4 text-xs text-faded">
            <span class="flex items-center gap-1">
              <span class="material-symbols-outlined text-xs">location_on</span>
              {{ event.location }}
            </span>
            <span v-if="event.createdAt">{{
              formatDateTime(event.createdAt)
            }}</span>
          </div>
        </div>
      </div>
      <div v-if="events.length === 0" class="text-faded text-sm py-4 ml-2">
        No tracking events yet.
      </div>
    </div>
  </div>
</template>
