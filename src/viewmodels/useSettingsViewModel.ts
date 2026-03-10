/**
 * @author David Hernandez
 * @description ViewModel for SettingsView. Manages system alert and maintenance mode.
 */

// framework
import { ref, onMounted } from 'vue'

// services
import { SettingsService } from '@/services/settingsService'

// types
import type { SystemAlert, SystemSettings } from '@/types'

export function useSettingsViewModel() {
  // --- State ---
  const isLoading = ref(true)
  const maintenanceMode = ref(false)
  const alertMessage = ref('')
  const alertType = ref<SystemAlert['type']>('info')
  const currentAlert = ref<SystemAlert | null>(null)
  const saveSuccess = ref(false)

  // --- Actions ---

  async function loadSettings(): Promise<void> {
    isLoading.value = true
    const settings: SystemSettings = await SettingsService.getAll()
    maintenanceMode.value = settings.maintenanceMode
    currentAlert.value = settings.alert
    isLoading.value = false
  }

  async function toggleMaintenance(): Promise<void> {
    maintenanceMode.value = !maintenanceMode.value
    await SettingsService.setMaintenanceMode(maintenanceMode.value)
    flashSuccess()
  }

  async function publishAlert(): Promise<void> {
    if (!alertMessage.value.trim()) return
    const settings = await SettingsService.createAlert(alertMessage.value.trim(), alertType.value)
    currentAlert.value = settings.alert
    alertMessage.value = ''
    flashSuccess()
  }

  async function removeAlert(): Promise<void> {
    await SettingsService.dismissAlert()
    currentAlert.value = null
    flashSuccess()
  }

  function flashSuccess(): void {
    saveSuccess.value = true
    setTimeout(() => {
      saveSuccess.value = false
    }, 2000)
  }

  // --- Lifecycle ---
  onMounted(loadSettings)

  return {
    isLoading,
    maintenanceMode,
    alertMessage,
    alertType,
    currentAlert,
    saveSuccess,
    toggleMaintenance,
    publishAlert,
    removeAlert,
  }
}
