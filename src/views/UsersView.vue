<script setup lang="ts">
/**
 * @author Samuel Rivero, Juan Andrés Young Hoyos(dropdown)
 * @description User management view - CRUD for users.
 */

// framework
import { ref, computed } from 'vue'

// stores
import { useUsersStore } from '@/stores/users'

// components
import AppSidebar from '@/components/AppSidebar.vue'
import AppModal from '@/components/AppModal.vue'
import DashboardHeader from '@/components/DashboardHeader.vue'
import BarChart from '@/components/BarChart.vue'

// types
import type { UserInterface } from '@/interfaces'

const store = useUsersStore()

const roleFilter = ref('All')

const filteredUsers = computed(() => {
  if (roleFilter.value === 'All') return store.users
  return store.users.filter((u) => u.role === roleFilter.value)
})

const showCreateModal = ref(false)
const editingUser = ref<UserInterface | null>(null)
const deletingId = ref<string | null>(null)

const form = ref({
  name: '',
  email: '',
  password: '',
  role: 'User',
  avatarUrl: '',
})

const roleBreakdown = computed(() => {
  const roles = ['User', 'Admin']
  return {
    labels: roles,
    values: roles.map((r) => store.users.filter((u) => u.role === r).length),
    colors: ['#8b949e', '#2dd4bf'],
  }
})

const statCards = computed(() => [
  { label: 'Total Users', value: String(store.users.length), icon: 'groups' },
  {
    label: 'Admins',
    value: String(store.users.filter((u) => u.role === 'Admin').length),
    icon: 'shield_person',
  },
])

function openCreate() {
  form.value = { name: '', email: '', password: '', role: 'User', avatarUrl: '' }
  showCreateModal.value = true
}

function openEdit(user: UserInterface) {
  form.value = {
    name: user.name,
    email: user.email,
    password: user.password,
    role: user.role,
    avatarUrl: user.avatarUrl ?? '',
  }
  editingUser.value = user
}

function closeEdit() {
  editingUser.value = null
}

async function submitCreate() {
  if (!form.value.name.trim() || !form.value.email.trim() || !form.value.password.trim())
    return
  await store.createUser({
    name: form.value.name.trim(),
    email: form.value.email.trim(),
    password: form.value.password,
    role: form.value.role,
    avatarUrl: form.value.avatarUrl.trim() || undefined,
  })
  showCreateModal.value = false
}

async function submitEdit() {
  if (!editingUser.value || !form.value.name.trim() || !form.value.email.trim()) return
  await store.updateUser({
    id: editingUser.value.id,
    name: form.value.name.trim(),
    email: form.value.email.trim(),
    password: form.value.password || undefined,
    role: form.value.role,
    avatarUrl: form.value.avatarUrl.trim() || undefined,
  })
  closeEdit()
}

async function confirmDelete(id: string) {
  if (!confirm('Delete this user?')) return
  deletingId.value = id
  await store.removeUser(id)
  deletingId.value = null
}
</script>

<template>
  <div class="flex min-h-screen bg-canvas">
    <AppSidebar activePage="/users" />

    <main class="flex-1 flex flex-col min-w-0 overflow-y-auto">
      <DashboardHeader title="User Management" />

      <div class="p-8 flex flex-col gap-8">
        <!-- Stat cards -->
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div
            v-for="stat in statCards"
            :key="stat.label"
            class="p-6 rounded-xl border border-wire bg-canvas flex justify-between items-start transition-[border-color] duration-200 hover:border-primary/25"
          >
            <div>
              <p class="text-sm text-soft">{{ stat.label }}</p>
              <h3 class="text-[32px] font-bold mt-1">{{ stat.value }}</h3>
            </div>
            <div class="p-2 bg-primary/15 rounded-lg text-primary flex items-center justify-center">
              <span class="material-symbols-outlined" style="font-size:22px">{{ stat.icon }}</span>
            </div>
          </div>
          <div class="p-6 rounded-xl border border-wire bg-canvas flex items-center justify-center transition-[border-color] duration-200 hover:border-primary/25">
            <button
              class="px-5 py-2.5 rounded-xl bg-primary text-canvas font-bold text-sm border-none whitespace-nowrap transition-[filter] duration-200 hover:brightness-110"
              @click="openCreate"
            >New User</button>
          </div>
        </div>

        <!-- Filter bar -->
        <div class="flex gap-4">
          <select
            v-model="roleFilter"
            class="px-3 py-2.5 bg-canvas border border-wire rounded-xl text-body text-sm outline-none cursor-pointer transition-[border-color] duration-200 hover:border-primary focus:border-primary"
          >
            <option value="All">All Roles</option>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <!-- Role Bar Chart -->
        <div class="bg-canvas border border-wire rounded-xl p-6">
          <p class="text-sm font-bold text-soft mb-4 uppercase tracking-[0.06em]">Users by Role</p>
          <div class="h-[200px]">
            <BarChart
              :labels="roleBreakdown.labels"
              :values="roleBreakdown.values"
              :colors="roleBreakdown.colors"
            />
          </div>
        </div>

        <!-- Users table -->
        <div class="bg-canvas border border-wire rounded-xl overflow-hidden">
          <table class="w-full text-left border-collapse">
            <thead class="bg-sheet">
              <tr>
                <th class="px-6 py-4 text-xs font-bold uppercase tracking-[0.06em] text-faded">User</th>
                <th class="px-6 py-4 text-xs font-bold uppercase tracking-[0.06em] text-faded">Role</th>
                <th class="px-6 py-4 text-xs font-bold uppercase tracking-[0.06em] text-faded text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="user in filteredUsers"
                :key="user.id"
                class="border-b border-wire-subtle transition-colors duration-150 hover:bg-primary/4"
              >
                <td class="px-6 py-4 text-sm">
                  <div class="flex items-center gap-2">
                    <div
                      class="w-10 h-10 rounded-full bg-cover bg-center shrink-0"
                      :style="{
                        backgroundImage: user.avatarUrl ? `url(${user.avatarUrl})` : 'none',
                        backgroundColor: user.avatarUrl ? 'transparent' : '#1c2333',
                      }"
                    ></div>
                    <div>
                      <p class="text-sm font-bold">{{ user.name }}</p>
                      <p class="text-xs text-soft">{{ user.email }}</p>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 text-xs font-bold text-primary">{{ user.role }}</td>
                <td class="px-6 py-4 text-right">
                  <div class="flex items-center justify-end gap-1">
                    <button
                      class="w-8 h-8 flex items-center justify-center rounded-lg text-soft transition-[background,color] duration-150 hover:bg-primary/15 hover:text-primary"
                      title="Edit"
                      @click="openEdit(user)"
                    >
                      <span class="material-symbols-outlined" style="font-size:18px">edit</span>
                    </button>
                    <button
                      class="w-8 h-8 flex items-center justify-center rounded-lg text-soft transition-[background,color] duration-150 disabled:opacity-50 disabled:cursor-not-allowed hover:not-disabled:bg-red-500/15 hover:not-disabled:text-red-500"
                      :disabled="deletingId === user.id"
                      title="Delete"
                      @click="confirmDelete(user.id)"
                    >
                      <span class="material-symbols-outlined" style="font-size:18px">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>

    <!-- Create User Modal -->
    <AppModal :show="showCreateModal" title="New User" @close="showCreateModal = false">
      <form class="flex flex-col gap-4" @submit.prevent="submitCreate">
        <div class="flex flex-col gap-1">
          <label class="text-xs font-semibold text-soft" for="user-name">Name</label>
          <input id="user-name" v-model="form.name" required type="text" placeholder="John Doe"
            class="py-2.5 px-3 bg-sheet border border-wire rounded-lg text-body text-sm outline-none focus:border-primary" />
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-xs font-semibold text-soft" for="user-email">Email</label>
          <input id="user-email" v-model="form.email" required type="email" placeholder="john@example.com"
            class="py-2.5 px-3 bg-sheet border border-wire rounded-lg text-body text-sm outline-none focus:border-primary" />
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-xs font-semibold text-soft" for="user-password">Password</label>
          <input id="user-password" v-model="form.password" required type="password"
            class="py-2.5 px-3 bg-sheet border border-wire rounded-lg text-body text-sm outline-none focus:border-primary" />
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-xs font-semibold text-soft" for="user-role">Role</label>
          <select id="user-role" v-model="form.role"
            class="py-2.5 px-3 bg-sheet border border-wire rounded-lg text-body text-sm outline-none focus:border-primary">
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-xs font-semibold text-soft" for="user-avatar">Avatar URL</label>
          <input id="user-avatar" v-model="form.avatarUrl" type="url" placeholder="https://..."
            class="py-2.5 px-3 bg-sheet border border-wire rounded-lg text-body text-sm outline-none focus:border-primary" />
        </div>
        <div class="flex justify-end gap-2 mt-4">
          <button type="button"
            class="px-4.5 py-2.5 rounded-xl bg-sheet text-soft font-semibold text-sm border border-wire transition-[border-color,color] duration-200 hover:border-primary hover:text-primary"
            @click="showCreateModal = false">Cancel</button>
          <button type="submit"
            class="px-5 py-2.5 rounded-xl bg-primary text-canvas font-bold text-sm transition-[filter] duration-200 hover:brightness-110">Create</button>
        </div>
      </form>
    </AppModal>

    <!-- Edit User Modal -->
    <AppModal :show="!!editingUser" title="Edit User" @close="closeEdit">
      <form v-if="editingUser" class="flex flex-col gap-4" @submit.prevent="submitEdit">
        <div class="flex flex-col gap-1">
          <label class="text-xs font-semibold text-soft" for="user-edit-name">Name</label>
          <input id="user-edit-name" v-model="form.name" required type="text"
            class="py-2.5 px-3 bg-sheet border border-wire rounded-lg text-body text-sm outline-none focus:border-primary" />
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-xs font-semibold text-soft" for="user-edit-email">Email</label>
          <input id="user-edit-email" v-model="form.email" required type="email"
            class="py-2.5 px-3 bg-sheet border border-wire rounded-lg text-body text-sm outline-none focus:border-primary" />
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-xs font-semibold text-soft" for="user-edit-password">Password (leave blank to keep)</label>
          <input id="user-edit-password" v-model="form.password" type="password" placeholder="••••••••"
            class="py-2.5 px-3 bg-sheet border border-wire rounded-lg text-body text-sm outline-none focus:border-primary" />
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-xs font-semibold text-soft" for="user-edit-role">Role</label>
          <select id="user-edit-role" v-model="form.role"
            class="py-2.5 px-3 bg-sheet border border-wire rounded-lg text-body text-sm outline-none focus:border-primary">
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-xs font-semibold text-soft" for="user-edit-avatar">Avatar URL</label>
          <input id="user-edit-avatar" v-model="form.avatarUrl" type="url"
            class="py-2.5 px-3 bg-sheet border border-wire rounded-lg text-body text-sm outline-none focus:border-primary" />
        </div>
        <div class="flex justify-end gap-2 mt-4">
          <button type="button"
            class="px-4.5 py-2.5 rounded-xl bg-sheet text-soft font-semibold text-sm border border-wire transition-[border-color,color] duration-200 hover:border-primary hover:text-primary"
            @click="closeEdit">Cancel</button>
          <button type="submit"
            class="px-5 py-2.5 rounded-xl bg-primary text-canvas font-bold text-sm transition-[filter] duration-200 hover:brightness-110">Save</button>
        </div>
      </form>
    </AppModal>
  </div>
</template>
