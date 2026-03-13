<!-- @author David Hdez -->
<script setup lang="ts">
// external imports
import { computed, ref } from "vue";

// internal imports
import { TrackingEventService } from "@/services/TrackingEventService";
import { formatDateTime } from "@/utils/formatters";

const props = defineProps<{
  packageId: number;
}>();

const events = computed(() =>
  TrackingEventService.getTrackingEventsByPackageId(props.packageId),
);

const form = ref({
  location: "",
  description: "",
});

function submitEvent(): void {
  if (!form.value.description.trim()) return;
  TrackingEventService.createTrackingEvent({
    packageId: props.packageId,
    location: form.value.location.trim(),
    description: form.value.description.trim(),
  });
  form.value = { location: "", description: "" };
}
</script>

<template>
  <div class="space-y-6">
    <h3 class="text-lg font-bold text-text-primary">Tracking Events</h3>

    <!-- Create event form -->
    <div class="bg-elevated rounded-lg p-4 border border-border-subtle">
      <h4 class="text-sm font-semibold text-text-secondary mb-3">
        Add Tracking Event
      </h4>
      <form class="space-y-3" @submit.prevent="submitEvent">
        <div>
          <label for="location" class="block text-sm text-text-secondary mb-1"
            >Location</label
          >
          <input
            id="location"
            v-model="form.location"
            type="text"
            class="w-full bg-base border border-border-default rounded-lg py-2 px-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="City, State"
            required
          />
        </div>
        <div>
          <label
            for="eventDescription"
            class="block text-sm text-text-secondary mb-1"
            >Description</label
          >
          <textarea
            id="eventDescription"
            v-model="form.description"
            rows="2"
            class="w-full bg-base border border-border-default rounded-lg py-2 px-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="What happened with the package?"
            required
          />
        </div>
        <button
          type="submit"
          :disabled="!form.description.trim()"
          class="bg-primary text-base font-bold py-2 px-4 rounded-lg text-sm hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Add Event
        </button>
      </form>
    </div>

    <!-- Event timeline -->
    <div class="relative pl-6 space-y-6">
      <div class="absolute left-2 top-2 bottom-2 w-0.5 bg-primary/20"></div>
      <div v-for="event in events" :key="event.id" class="relative">
        <div
          class="absolute -left-4 top-1 size-3 rounded-full bg-primary shadow-[0_0_8px_rgba(45,212,191,0.4)]"
        ></div>
        <div
          class="bg-elevated rounded-lg border border-border-subtle p-4 ml-2"
        >
          <div class="flex items-center justify-between gap-2 mb-1">
            <span class="font-medium text-text-primary text-sm">{{
              event.description
            }}</span>
          </div>
          <div class="flex items-center gap-4 text-xs text-text-muted">
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
      <div v-if="events.length === 0" class="text-text-muted text-sm py-4 ml-2">
        No tracking events yet.
      </div>
    </div>
  </div>
</template>
