<!-- @author David Hdez -->
<script setup lang="ts">
// external imports
import { ref } from "vue";

// internal imports
import { SettingsService } from "@/services/SettingsService";

const userNotificationMessage = ref<string>(
  SettingsService.getUserNotificationMessage(),
);
const userNotificationEnabled = ref<boolean>(
  SettingsService.isUserNotificationEnabled(),
);
const maintenanceModeEnabled = ref<boolean>(
  SettingsService.isMaintenanceModeEnabled(),
);
const successMessage = ref<string>("");

function toggleUserNotification(): void {
  userNotificationEnabled.value = !userNotificationEnabled.value;
}

function toggleMaintenanceMode(): void {
  maintenanceModeEnabled.value = !maintenanceModeEnabled.value;
}

function saveSettings(): void {
  const trimmedNotificationMessage = userNotificationMessage.value.trim();
  const shouldEnableUserNotification =
    userNotificationEnabled.value && trimmedNotificationMessage.length > 0;

  SettingsService.updateUserNotification(
    trimmedNotificationMessage,
    shouldEnableUserNotification,
  );
  SettingsService.setMaintenanceMode(maintenanceModeEnabled.value);

  userNotificationEnabled.value = shouldEnableUserNotification;
  successMessage.value = "Settings saved successfully.";
}
</script>

<template>
  <section class="max-w-3xl space-y-8">
    <div>
      <h1 class="text-3xl font-black tracking-tight text-text-primary">
        System Settings
      </h1>
      <p class="text-text-secondary mt-1">
        Manage only global user notice and maintenance mode.
      </p>
    </div>

    <div class="space-y-6">
      <!-- User Notification -->
      <div
        class="bg-surface border border-border-default rounded-xl p-6 space-y-4"
      >
        <div class="flex items-center justify-between gap-4">
          <div>
            <h3 class="text-lg font-bold text-text-primary">
              User Notification
            </h3>
            <p class="text-xs text-text-muted">
              Visible for all users with role User.
            </p>
          </div>
          <button
            type="button"
            :class="
              userNotificationEnabled ? 'bg-primary' : 'bg-border-default'
            "
            class="w-12 h-6 rounded-full relative transition-colors"
            @click="toggleUserNotification"
          >
            <span
              :class="
                userNotificationEnabled
                  ? 'left-7 bg-white'
                  : 'left-1 bg-text-secondary'
              "
              class="absolute top-1 size-4 rounded-full transition-all"
            ></span>
          </button>
        </div>
        <textarea
          v-model="userNotificationMessage"
          rows="3"
          class="w-full bg-elevated border border-border-default rounded-lg py-3 px-4 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="Write a message that all users with role User will see."
        ></textarea>
        <p class="text-[11px] text-text-muted">
          The notification is enabled only when the switch is on and the message
          is not empty.
        </p>
      </div>

      <!-- Maintenance Mode -->
      <div
        class="bg-surface border border-border-default rounded-xl p-6 space-y-4"
      >
        <div
          class="flex items-center justify-between p-4 bg-elevated rounded-lg border border-border-subtle"
        >
          <div>
            <p class="font-bold text-text-primary">Maintenance Mode</p>
            <p class="text-xs text-text-muted">
              Restricts app access for users with role User while updates are in
              progress.
            </p>
          </div>
          <button
            type="button"
            :class="maintenanceModeEnabled ? 'bg-primary' : 'bg-border-default'"
            class="w-12 h-6 rounded-full relative transition-colors"
            @click="toggleMaintenanceMode"
          >
            <span
              :class="
                maintenanceModeEnabled
                  ? 'left-7 bg-white'
                  : 'left-1 bg-text-secondary'
              "
              class="absolute top-1 size-4 rounded-full transition-all"
            ></span>
          </button>
        </div>
      </div>

      <button
        class="px-6 py-3 bg-primary text-base font-bold rounded-lg hover:bg-primary-dark transition-colors"
        @click="saveSettings"
      >
        Save Changes
      </button>

      <p v-if="successMessage" class="text-users text-sm font-medium">
        {{ successMessage }}
      </p>
    </div>
  </section>
</template>
