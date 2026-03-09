/**
 * @author Samuel Rivero
 * @description Pinia store for authentication. Token and user persisted in LocalStorage.
 */

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { UserService } from '@/services'
import { getFromStorage, setToStorage, STORAGE_KEYS } from '@/infrastructure/storage'
import type { UserInterface } from '@/interfaces'
import type { LoginDTO } from '@/dtos'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(getFromStorage<string>(STORAGE_KEYS.AUTH_TOKEN))
  const user = ref<UserInterface | null>(getFromStorage<UserInterface>(STORAGE_KEYS.AUTH_USER))

  const isAuthenticated = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.role === 'Admin')

  function persistAuth(t: string, u: UserInterface) {
    token.value = t
    user.value = u
    setToStorage(STORAGE_KEYS.AUTH_TOKEN, t)
    setToStorage(STORAGE_KEYS.AUTH_USER, u)
  }

  function clearAuth() {
    token.value = null
    user.value = null
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
    localStorage.removeItem(STORAGE_KEYS.AUTH_USER)
  }

  async function login(dto: LoginDTO) {
    const { token: t, user: u } = await UserService.login(dto)
    persistAuth(t, u)
  }

  async function logout() {
    await UserService.logout()
    clearAuth()
  }

  return {
    token,
    user,
    isAuthenticated,
    isAdmin,
    login,
    logout,
  }
})
