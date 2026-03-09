/**
 * @author Samuel Rivero, Juan Andrés Young Hoyos
 * @description LocalStorage persistence layer for Entregable 1.
 */

const STORAGE_KEYS = {
  PACKAGES: 'packtracker_packages',
  WAREHOUSES: 'packtracker_warehouses',
  USERS: 'packtracker_users',
  SEEDED: 'packtracker_seeded',
  AUTH_TOKEN: 'packtracker_auth_token',
  AUTH_USER: 'packtracker_auth_user',
} as const

export function getFromStorage<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}

export function setToStorage<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value))
}

export function isSeeded(): boolean {
  return localStorage.getItem(STORAGE_KEYS.SEEDED) === 'true'
}

export function markSeeded(): void {
  localStorage.setItem(STORAGE_KEYS.SEEDED, 'true')
}

export { STORAGE_KEYS }
