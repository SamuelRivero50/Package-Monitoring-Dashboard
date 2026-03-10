// =============================================================
// Users ViewModel
// Loads user list and exposes a delete action for the
// User Management page.
// =============================================================

// framework
import { ref, onMounted } from 'vue'

// services
import { UserService } from '@/services'

// types
import type { UserInterface } from '@/interfaces'

export function useUsersViewModel() {
  // --- State ---

  const isLoading = ref(true)
  const error = ref<string | null>(null)
  const users = ref<UserInterface[]>([])

  // Stat cards shown at the top of the Users page.
  const statCards = [
    { label: 'Total Users', value: '1,284', icon: 'groups' },
    { label: 'Admins', value: '42', icon: 'shield_person' },
  ]

  // --- Actions ---

  async function deleteUser(id: string) {
    await UserService.remove(id)
    users.value = users.value.filter((u) => u.id !== id)
  }

  // --- Data loading ---

  async function loadUsers() {
    isLoading.value = true
    error.value = null
    try {
      users.value = await UserService.getAll()
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
