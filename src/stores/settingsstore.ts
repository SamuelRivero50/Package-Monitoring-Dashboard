/** @author David Hdez */
// external imports
import { defineStore } from "pinia";
import { ref } from "vue";

// internal imports
import type { SystemSettingInterface } from "@/interfaces/SystemSettingInterface";
import { settingsSeeder } from "@/seeders/settingsseeder";

export const useSettingsStore = defineStore("settings", () => {
  const settings = ref<SystemSettingInterface>({ ...settingsSeeder });

  return { settings };
});
