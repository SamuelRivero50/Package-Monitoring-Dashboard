<script setup lang="ts">
/**
 * @author Samuel Rivero
 * @description User management view - CRUD for users.
 */
import { ref, computed } from 'vue'
import AppSidebar from '@/components/AppSidebar.vue'
import AppModal from '@/components/AppModal.vue'
import DashboardHeader from '@/components/DashboardHeader.vue'
import { useUsersStore } from '@/stores/users'
import type { UserInterface } from '@/interfaces'

const store = useUsersStore()

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
  <div class="pageLayout">
    <AppSidebar activePage="/users" />

    <main class="pageMain">
      <DashboardHeader title="User Management" />

      <div class="pageContent">
        <!-- Stat cards -->
        <div class="statsRow">
          <div v-for="stat in statCards" :key="stat.label" class="userStatCard">
            <div class="userStatLeft">
              <p class="userStatLabel">{{ stat.label }}</p>
              <h3 class="userStatValue">{{ stat.value }}</h3>
            </div>
            <div class="userStatIcon">
              <span class="material-symbols-outlined">{{ stat.icon }}</span>
            </div>
          </div>
          <div class="userStatCard userStatCardAction">
            <button class="btnPrimary" @click="openCreate">New User</button>
          </div>
        </div>

        <!-- Users table -->
        <div class="tableCard">
          <table class="dataTable">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th class="thRight">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in store.users" :key="user.id" class="tableRow">
                <td>
                  <div class="userCell">
                    <div
                      class="userCellAvatar"
                      :style="{
                        backgroundImage: user.avatarUrl ? `url(${user.avatarUrl})` : 'none',
                        backgroundColor: user.avatarUrl ? 'transparent' : 'var(--bg-elevated)',
                      }"
                    ></div>
                    <div>
                      <p class="userCellName">{{ user.name }}</p>
                      <p class="userCellEmail">{{ user.email }}</p>
                    </div>
                  </div>
                </td>
                <td class="roleCell">{{ user.role }}</td>
                <td class="actionsCell">
                  <div class="actionBtns">
                    <button class="actionEdit" title="Edit" @click="openEdit(user)">
                      <span class="material-symbols-outlined">edit</span>
                    </button>
                    <button
                      class="actionDelete"
                      :disabled="deletingId === user.id"
                      title="Delete"
                      @click="confirmDelete(user.id)"
                    >
                      <span class="material-symbols-outlined">delete</span>
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
      <form class="formModal" @submit.prevent="submitCreate">
        <div class="formGroup">
          <label for="user-name">Name</label>
          <input id="user-name" v-model="form.name" required type="text" placeholder="John Doe" />
        </div>
        <div class="formGroup">
          <label for="user-email">Email</label>
          <input id="user-email" v-model="form.email" required type="email" placeholder="john@example.com" />
        </div>
        <div class="formGroup">
          <label for="user-password">Password</label>
          <input id="user-password" v-model="form.password" required type="password" />
        </div>
        <div class="formGroup">
          <label for="user-role">Role</label>
          <select id="user-role" v-model="form.role">
            <option value="User">User</option>
            <option value="Manager">Manager</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <div class="formGroup">
          <label for="user-avatar">Avatar URL</label>
          <input id="user-avatar" v-model="form.avatarUrl" type="url" placeholder="https://..." />
        </div>
        <div class="formActions">
          <button type="button" class="btnSecondary" @click="showCreateModal = false">Cancel</button>
          <button type="submit" class="btnPrimary">Create</button>
        </div>
      </form>
    </AppModal>

    <!-- Edit User Modal -->
    <AppModal :show="!!editingUser" title="Edit User" @close="closeEdit">
      <form v-if="editingUser" class="formModal" @submit.prevent="submitEdit">
        <div class="formGroup">
          <label for="user-edit-name">Name</label>
          <input id="user-edit-name" v-model="form.name" required type="text" />
        </div>
        <div class="formGroup">
          <label for="user-edit-email">Email</label>
          <input id="user-edit-email" v-model="form.email" required type="email" />
        </div>
        <div class="formGroup">
          <label for="user-edit-password">Password (leave blank to keep)</label>
          <input id="user-edit-password" v-model="form.password" type="password" placeholder="••••••••" />
        </div>
        <div class="formGroup">
          <label for="user-edit-role">Role</label>
          <select id="user-edit-role" v-model="form.role">
            <option value="User">User</option>
            <option value="Manager">Manager</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <div class="formGroup">
          <label for="user-edit-avatar">Avatar URL</label>
          <input id="user-edit-avatar" v-model="form.avatarUrl" type="url" />
        </div>
        <div class="formActions">
          <button type="button" class="btnSecondary" @click="closeEdit">Cancel</button>
          <button type="submit" class="btnPrimary">Save</button>
        </div>
      </form>
    </AppModal>
  </div>
</template>

<style scoped>
.pageLayout {
  display: flex;
  min-height: 100vh;
  background: var(--bg-base);
}

.pageMain {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow-y: auto;
}

.pageContent {
  padding: var(--spacing-xl);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

/* ---- Stat Cards ---- */
.statsRow {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-lg);
}

@media (min-width: 768px) {
  .statsRow {
    grid-template-columns: repeat(3, 1fr);
  }
}

.userStatCard {
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-default);
  background: var(--bg-base);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  transition: border-color 0.2s;
}

.userStatCard:hover {
  border-color: rgba(45, 212, 191, 0.25);
}

.userStatCardAction {
  align-items: center;
  justify-content: center;
}

.btnPrimary {
  padding: 10px 20px;
  border-radius: var(--radius-lg);
  background: var(--color-primary);
  color: var(--bg-base);
  font-weight: 700;
  font-size: var(--text-sm);
  border: none;
  white-space: nowrap;
  transition: filter 0.2s;
}

.btnPrimary:hover {
  filter: brightness(1.1);
}

.userStatLabel {
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.userStatValue {
  font-size: var(--text-2xl);
  font-weight: 700;
  margin-top: 4px;
}

.userStatIcon {
  padding: 8px;
  background: rgba(45, 212, 191, 0.15);
  border-radius: var(--radius-md);
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
}

.userStatIcon .material-symbols-outlined {
  font-size: 22px;
}

/* ---- Table ---- */
.tableCard {
  background: var(--bg-base);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.dataTable {
  width: 100%;
  text-align: left;
  border-collapse: collapse;
}

.dataTable thead {
  background: var(--bg-elevated);
}

.dataTable th {
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: var(--text-xs);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-muted);
}

.thRight {
  text-align: right;
}

.dataTable td {
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: var(--text-sm);
}

.tableRow {
  border-bottom: 1px solid var(--border-subtle);
  transition: background 0.15s;
}

.tableRow:hover {
  background: rgba(45, 212, 191, 0.04);
}

/* ---- User cell ---- */
.userCell {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.userCellAvatar {
  width: 40px;
  height: 40px;
  border-radius: 9999px;
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
}

.userCellName {
  font-size: var(--text-sm);
  font-weight: 700;
}

.userCellEmail {
  font-size: var(--text-xs);
  color: var(--text-secondary);
}

/* ---- Role ---- */
.roleCell {
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--color-primary);
}

/* ---- Actions ---- */
.actionsCell {
  text-align: right;
}

.actionBtns {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
}

.actionEdit,
.actionDelete {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  transition: background 0.15s, color 0.15s;
  color: var(--text-secondary);
  background: transparent;
  border: none;
}

.actionEdit .material-symbols-outlined,
.actionDelete .material-symbols-outlined {
  font-size: 18px;
}

.actionEdit:hover {
  background: rgba(45, 212, 191, 0.15);
  color: var(--color-primary);
}

.actionDelete:hover:not(:disabled) {
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
}

.actionDelete:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ---- Form modal ---- */
.formModal {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.formGroup {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.formGroup label {
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--text-secondary);
}

.formGroup input,
.formGroup select {
  padding: 10px 12px;
  background: var(--bg-elevated);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: var(--text-sm);
}

.formGroup input:focus,
.formGroup select:focus {
  outline: none;
  border-color: var(--color-primary);
}

.formActions {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);
}

.btnSecondary {
  padding: 10px 18px;
  border-radius: var(--radius-lg);
  background: var(--bg-elevated);
  color: var(--text-secondary);
  font-weight: 600;
  font-size: var(--text-sm);
  border: 1px solid var(--border-default);
  transition: border-color 0.2s, color 0.2s;
}

.btnSecondary:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}
</style>
