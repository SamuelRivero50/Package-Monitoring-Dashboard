/** @author David Hdez */
// external imports
import { createPinia, type StateTree } from "pinia";
import { watch } from "vue";

// internal imports
import type { SystemSettingInterface } from "@/interfaces/SystemSettingInterface";
import { packageSeeder } from "@/seeders/packageseeder";
import { settingsSeeder } from "@/seeders/settingsseeder";
import { trackingEventSeeder } from "@/seeders/trackingeventseeder";
import { warehouseSeeder } from "@/seeders/warehouseseeder";
import { userSeeder } from "@/seeders/userseeder";

export default class PiniaConfig {
  public static init() {
    const pinia = createPinia();
    const savedState = localStorage.getItem("piniaState");

    if (savedState) {
      const parsedState = JSON.parse(savedState) as Record<string, StateTree>;
      const rawSettingsStore = parsedState.settings;
      const persistedSettingsStore =
        typeof rawSettingsStore === "object" && rawSettingsStore !== null
          ? (rawSettingsStore as { settings?: unknown })
          : {};
      const persistedSettings =
        typeof persistedSettingsStore.settings === "object" &&
        persistedSettingsStore.settings !== null
          ? (persistedSettingsStore.settings as Partial<SystemSettingInterface>)
          : {};

      parsedState.settings = {
        settings: {
          ...settingsSeeder,
          ...persistedSettings,
        },
      };

      pinia.state.value = parsedState;
    } else {
      pinia.state.value = {
        package: {
          packages: packageSeeder,
        },
        trackingevent: {
          trackingEvents: trackingEventSeeder,
        },
        warehouse: {
          warehouses: warehouseSeeder,
        },
        user: {
          users: userSeeder,
        },
        auth: {
          currentUser: null,
        },
        settings: {
          settings: settingsSeeder,
        },
      };
      localStorage.setItem("piniaState", JSON.stringify(pinia.state.value));
    }

    watch(
      pinia.state,
      (state) => {
        localStorage.setItem("piniaState", JSON.stringify(state));
      },
      { deep: true },
    );

    return pinia;
  }
}
