// =============================================================
// Users ViewModel
// Loads user list and exposes a delete action for the
// User Management page.
// =============================================================

import { ref, onMounted } from 'vue'
import { userService } from '@/services'
import type { User } from '@/models'

export function useUsersViewModel() {
  // --- State ---

  const isLoading = ref(true)
  const error = ref<string | null>(null)
  const users = ref<User[]>([])

  // Stat cards shown at the top of the Users page.
  const statCards = [
    { label: 'Total Users', value: '1,284', icon: 'groups' },
    { label: 'Admins', value: '42', icon: 'shield_person' },
  ]

  // --- Actions ---

  async function deleteUser(id: string) {
    await userService.remove(id)
    users.value = users.value.filter((u) => u.id !== id)
  }

  // --- Data loading ---

  async function loadUsers() {
    isLoading.value = true
    error.value = null
    try {
      users.value = await userService.getAll()
    } catch (e: unknown) {
      error.value = (e as { message?: string })?.message ?? 'Failed to load users'
    } finally {
      isLoading.value = false
    }
  }

  onMounted(loadUsers)

  return {
    isLoading,
    error,
    users,
    statCards,
    loadUsers,
    deleteUser,
  }
}
