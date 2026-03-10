/**
 * @author Samuel Rivero
 * @description Pinia store for users.
 */

// framework
import { ref } from 'vue'
import { defineStore } from 'pinia'

// services
import { UserService } from '@/services'

// types
import type { UserInterface } from '@/interfaces'
import type { CreateUserDTO, UpdateUserDTO } from '@/dtos'

export const useUsersStore = defineStore('users', () => {
  const users = ref<UserInterface[]>([])
  const isLoading = ref(false)

  async function loadUsers() {
    isLoading.value = true
    try {
      users.value = await UserService.getAll()
    } finally {
      isLoading.value = false
    }
  }

  async function createUser(dto: CreateUserDTO) {
    const created = await UserService.create(dto)
    users.value.push(created)
    return created
  }

  async function updateUser(dto: UpdateUserDTO) {
    const updated = await UserService.update(dto)
    if (updated) {
      const idx = users.value.findIndex((u) => u.id === dto.id)
      if (idx !== -1) users.value[idx] = updated
    }
    return updated
  }

  async function removeUser(id: string) {
    await UserService.remove(id)
    users.value = users.value.filter((u) => u.id !== id)
  }

  loadUsers()

  return {
    users,
    isLoading,
    loadUsers,
    createUser,
    updateUser,
    removeUser,
  }
})
