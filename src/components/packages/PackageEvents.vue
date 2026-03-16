<!-- @author David Hdez, Juan Andrés Young  -->
<script setup lang="ts">
// external imports
import { computed, ref } from "vue";

// internal imports
import type { CreateTrackingEventDTO } from "@/dtos/tracking/CreateTrackingEventDTO";
import type { TrackingEventInterface } from "@/interfaces/TrackingEventInterface";
import { TrackingEventService } from "@/services/TrackingEventService";
import { WarehouseService } from "@/services/WarehouseService";
import { formatDateTime } from "@/utils/formatters";

const props = defineProps<{
  packageId: number;
}>();

const events = computed(() =>
  TrackingEventService.getTrackingEventsByPackageId(props.packageId),
);

const warehouses = computed(() => WarehouseService.getWarehouses());
// Transfers require two distinct warehouses to build a valid route.
const canManageRoutes = computed<boolean>(() => warehouses.value.length >= 2);

const defaultFromWarehouseId = computed<number>(() => warehouses.value[0]?.id ?? 1);
const defaultToWarehouseId = computed<number>(
  () => warehouses.value[1]?.id ?? defaultFromWarehouseId.value,
);

const fromWarehouseId = ref<number>(defaultFromWarehouseId.value);
const toWarehouseId = ref<number>(defaultToWarehouseId.value);
const newPreviousStatus = ref<string>("");
const newNewStatus = ref<string>("");
const newDescription = ref<string>("");
const editingEventId = ref<number | null>(null);
const editFromWarehouseId = ref<number>(defaultFromWarehouseId.value);
const editToWarehouseId = ref<number>(defaultToWarehouseId.value);
const editPreviousStatus = ref<string>("");
const editNewStatus = ref<string>("");
const editDescription = ref<string>("");
const errorMessage = ref<string>("");

// Keep create/edit actions disabled when route constraints are not met.
const isCreateActionDisabled = computed<boolean>(
  () => !canManageRoutes.value || fromWarehouseId.value === toWarehouseId.value,
);
const isEditActionDisabled = computed<boolean>(
  () => !canManageRoutes.value || editFromWarehouseId.value === editToWarehouseId.value,
);

function getWarehouseName(warehouseId: number): string {
  return WarehouseService.getWarehouseById(warehouseId)?.name ?? "Unknown Warehouse";
}

function getRouteLabel(event: TrackingEventInterface): string {
  return `${getWarehouseName(event.fromWarehouseId)} -> ${getWarehouseName(event.toWarehouseId)}`;
}

function resetCreateForm(): void {
  fromWarehouseId.value = defaultFromWarehouseId.value;
  toWarehouseId.value = defaultToWarehouseId.value;
  newPreviousStatus.value = "";
  newNewStatus.value = "";
  newDescription.value = "";
}

function addTrackingEvent(): void {
  if (!canManageRoutes.value) {
    errorMessage.value = "At least two warehouses are required to create a route log.";
    return;
  }

  const eventPayload: CreateTrackingEventDTO = {
    packageId: props.packageId,
    fromWarehouseId: fromWarehouseId.value,
    toWarehouseId: toWarehouseId.value,
    previousStatus: newPreviousStatus.value,
    newStatus: newNewStatus.value,
    description: newDescription.value,
  };

  errorMessage.value = "";

  try {
    TrackingEventService.createTrackingEvent(eventPayload);
    resetCreateForm();
  } catch (error: unknown) {
    errorMessage.value =
      error instanceof Error ? error.message : "Unable to create tracking event.";
  }
}

function startEdit(event: TrackingEventInterface): void {
  editingEventId.value = event.id;
  editFromWarehouseId.value = event.fromWarehouseId;
  editToWarehouseId.value = event.toWarehouseId;
  editPreviousStatus.value = event.previousStatus ?? "";
  editNewStatus.value = event.newStatus ?? "";
  editDescription.value = event.description ?? "";
  errorMessage.value = "";
}

function cancelEdit(): void {
  editingEventId.value = null;
}

function saveEdit(eventId: number): void {
  errorMessage.value = "";

  if (!canManageRoutes.value) {
    errorMessage.value = "At least two warehouses are required to edit a route log.";
    return;
  }

  try {
    TrackingEventService.updateTrackingEvent(eventId, {
      fromWarehouseId: editFromWarehouseId.value,
      toWarehouseId: editToWarehouseId.value,
      previousStatus: editPreviousStatus.value,
      newStatus: editNewStatus.value,
      description: editDescription.value,
    });
    editingEventId.value = null;
  } catch (error: unknown) {
    errorMessage.value =
      error instanceof Error ? error.message : "Unable to update tracking event.";
  }
}
</script>

<template>
  <div class="space-y-6">
    <h3 class="text-lg font-bold text-body">Tracking Events</h3>

    <div class="bg-sheet rounded-lg border border-wire-subtle p-4 space-y-3">
      <h4 class="text-sm font-bold text-body">Add Warehouse Route Log</h4>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-semibold text-soft mb-2">From Warehouse</label>
          <select
            v-model.number="fromWarehouseId"
            class="select-control w-full bg-panel border border-wire rounded-lg p-2.5 text-sm text-body focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option v-for="warehouse in warehouses" :key="warehouse.id" :value="warehouse.id">
              {{ warehouse.name }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-xs font-semibold text-soft mb-2">To Warehouse</label>
          <select
            v-model.number="toWarehouseId"
            class="select-control w-full bg-panel border border-wire rounded-lg p-2.5 text-sm text-body focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option v-for="warehouse in warehouses" :key="warehouse.id" :value="warehouse.id">
              {{ warehouse.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-semibold text-soft mb-2">Previous Status</label>
          <input
            v-model="newPreviousStatus"
            type="text"
            class="w-full bg-panel border border-wire rounded-lg p-2.5 text-sm text-body placeholder:text-faded focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="e.g. Pending"
          />
        </div>
        <div>
          <label class="block text-xs font-semibold text-soft mb-2">New Status</label>
          <input
            v-model="newNewStatus"
            type="text"
            class="w-full bg-panel border border-wire rounded-lg p-2.5 text-sm text-body placeholder:text-faded focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="e.g. In Transit"
          />
        </div>
      </div>

      <div>
        <label class="block text-xs font-semibold text-soft mb-2">Description</label>
        <input
          v-model="newDescription"
          type="text"
          class="w-full bg-panel border border-wire rounded-lg p-2.5 text-sm text-body placeholder:text-faded focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="Event details..."
        />
      </div>

      <button
        type="button"
        class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-xs font-bold hover:bg-primary-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="isCreateActionDisabled"
        @click="addTrackingEvent"
      >
        <span class="material-symbols-outlined text-sm">add</span>
        Add Log
      </button>

      <p v-if="!canManageRoutes" class="text-xs text-faded">
        You need at least two warehouses to register route logs.
      </p>
      <p
        v-else-if="fromWarehouseId === toWarehouseId"
        class="text-xs text-faded"
      >
        Select different origin and destination warehouses.
      </p>
    </div>

    <p v-if="errorMessage" class="text-rose-400 text-sm font-medium">
      {{ errorMessage }}
    </p>

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
          <div class="flex items-center justify-between gap-2 mb-2">
            <span class="font-medium text-body text-sm">{{ getRouteLabel(event) }}</span>
            <div class="flex items-center gap-2">
              <button
                type="button"
                class="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold bg-panel border border-wire text-soft hover:bg-canvas transition-all"
                @click="startEdit(event)"
              >
                <span class="material-symbols-outlined text-sm">edit</span>
                Edit
              </button>
            </div>
          </div>

          <div v-if="editingEventId === event.id" class="space-y-3 mb-3">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-semibold text-soft mb-2">From Warehouse</label>
                <select
                  v-model.number="editFromWarehouseId"
                  class="select-control w-full bg-panel border border-wire rounded-lg p-2.5 text-sm text-body focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option v-for="warehouse in warehouses" :key="warehouse.id" :value="warehouse.id">
                    {{ warehouse.name }}
                  </option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-semibold text-soft mb-2">To Warehouse</label>
                <select
                  v-model.number="editToWarehouseId"
                  class="select-control w-full bg-panel border border-wire rounded-lg p-2.5 text-sm text-body focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option v-for="warehouse in warehouses" :key="warehouse.id" :value="warehouse.id">
                    {{ warehouse.name }}
                  </option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-semibold text-soft mb-2">Previous Status</label>
                <input
                  v-model="editPreviousStatus"
                  type="text"
                  class="w-full bg-panel border border-wire rounded-lg p-2.5 text-sm text-body placeholder:text-faded focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="e.g. Pending"
                />
              </div>

              <div>
                <label class="block text-xs font-semibold text-soft mb-2">New Status</label>
                <input
                  v-model="editNewStatus"
                  type="text"
                  class="w-full bg-panel border border-wire rounded-lg p-2.5 text-sm text-body placeholder:text-faded focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="e.g. In Transit"
                />
              </div>
            </div>

            <div>
              <label class="block text-xs font-semibold text-soft mb-2">Description</label>
              <input
                v-model="editDescription"
                type="text"
                class="w-full bg-panel border border-wire rounded-lg p-2.5 text-sm text-body placeholder:text-faded focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Event details..."
              />
            </div>

            <div class="flex gap-2">
              <button
                type="button"
                class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-primary hover:bg-primary-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="isEditActionDisabled"
                @click="saveEdit(event.id)"
              >
                Save
              </button>
              <button
                type="button"
                class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-panel border border-wire text-soft hover:bg-canvas transition-all"
                @click="cancelEdit"
              >
                Cancel
              </button>
            </div>
          </div>

          <div class="space-y-1.5 mt-1">
            <div v-if="event.previousStatus || event.newStatus" class="flex items-center gap-2 text-xs">
              <span class="text-faded">Status:</span>
              <span v-if="event.previousStatus" class="text-soft">{{ event.previousStatus }}</span>
              <span v-if="event.previousStatus && event.newStatus" class="material-symbols-outlined text-xs text-faded">arrow_forward</span>
              <span v-if="event.newStatus" class="text-primary font-semibold">{{ event.newStatus }}</span>
            </div>
            <p v-if="event.description" class="text-xs text-soft">{{ event.description }}</p>
            <div class="flex items-center gap-4 text-xs text-faded">
              <span class="flex items-center gap-1">
                <span class="material-symbols-outlined text-xs">swap_horiz</span>
                Warehouse transfer
              </span>
              <span v-if="event.timestamp">{{ formatDateTime(event.timestamp) }}</span>
            </div>
          </div>
        </div>
      </div>
      <div v-if="events.length === 0" class="text-faded text-sm py-4 ml-2">
        No tracking events yet.
      </div>
    </div>
  </div>
</template>
