/**
 * @author David Hernandez
 * @description CRUD-like operations for system settings (alert + maintenance mode). Persisted in LocalStorage.
 */

// data
import { getFromStorage, setToStorage, STORAGE_KEYS } from '@/infrastructure/storage'

// types
import type { SystemAlert, SystemSettings } from '@/types'

const DEFAULT_SETTINGS: SystemSettings = {
  maintenanceMode: false,
  alert: null,
}

function load(): SystemSettings {
  return getFromStorage<SystemSettings>(STORAGE_KEYS.SETTINGS) ?? { ...DEFAULT_SETTINGS }
}

function save(settings: SystemSettings): void {
  setToStorage(STORAGE_KEYS.SETTINGS, settings)
}

export class SettingsService {
  static async getAll(): Promise<SystemSettings> {
    return load()
  }

  static async setMaintenanceMode(enabled: boolean): Promise<SystemSettings> {
    const settings = load()
    settings.maintenanceMode = enabled
    save(settings)
    return settings
  }

  static async createAlert(message: string, type: SystemAlert['type']): Promise<SystemSettings> {
    const settings = load()
    settings.alert = {
      id: `alert-${Date.now()}`,
      message,
      type,
      active: true,
      createdAt: new Date().toISOString(),
    }
    save(settings)
    return settings
  }

  static async dismissAlert(): Promise<SystemSettings> {
    const settings = load()
    settings.alert = null
    save(settings)
    return settings
  }
}
