/** @author David Hdez */
// internal imports
import type { SystemSettingInterface } from "@/interfaces/SystemSettingInterface";
import { useSettingsStore } from "@/stores/settingsstore";

export class SettingsService {
  static getSettings(): SystemSettingInterface {
    return useSettingsStore().settings;
  }

  static isMaintenanceModeEnabled(): boolean {
    return useSettingsStore().settings.maintenanceModeEnabled;
  }

  static setMaintenanceMode(enabled: boolean): void {
    useSettingsStore().settings.maintenanceModeEnabled = enabled;
  }

  static isUserNotificationEnabled(): boolean {
    return useSettingsStore().settings.userNotificationEnabled;
  }

  static getUserNotificationMessage(): string {
    return useSettingsStore().settings.userNotificationMessage;
  }

  static updateUserNotification(message: string, enabled: boolean): void {
    const trimmedMessage = message.trim();
    useSettingsStore().settings.userNotificationMessage = trimmedMessage;
    useSettingsStore().settings.userNotificationEnabled =
      enabled && trimmedMessage.length > 0;
  }
}
