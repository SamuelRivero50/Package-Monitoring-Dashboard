/**
 * @author David Hernandez
 * @description System-wide settings persisted in LocalStorage (alert banner + maintenance mode).
 */

export interface SystemAlert {
  id: string
  message: string
  type: 'info' | 'warning' | 'error'
  active: boolean
  createdAt: string
}

export interface SystemSettings {
  maintenanceMode: boolean
  alert: SystemAlert | null
}
