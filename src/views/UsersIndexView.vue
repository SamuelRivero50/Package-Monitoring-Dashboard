<!-- @author David Hdez -->
<script setup lang="ts">
// external imports
import { ref } from "vue";

// internal imports
import type { CreateUserDTO } from "@/dtos/CreateUserDTO";
import { UserService } from "@/services/UserService";

const users = UserService.getUsers();

// create form state
const showForm = ref(false);
const name = ref("");
const email = ref("");
const password = ref("");
const role = ref("User");
const successMessage = ref("");

// edit state
const editingUserId = ref<number | null>(null);
const editName = ref("");
const editEmail = ref("");
const editRole = ref("");
const editStatus = ref("");

function submitForm(): void {
  const newUser: CreateUserDTO = {
    name: name.value,
    email: email.value,
    password: password.value,
    role: role.value,
    status: "Active",
  };

  UserService.createUser(newUser);
  successMessage.value = "User created successfully!";
  name.value = "";
  email.value = "";
  password.value = "";
  role.value = "User";
  showForm.value = false;
}

function startEdit(userId: number): void {
  const user = users.find((u) => u.id === userId);
  if (!user) return;
  editName.value = user.name;
  editEmail.value = user.email;
  editRole.value = user.role;
  editStatus.value = user.status;
  editingUserId.value = userId;
}

function saveEdit(userId: number): void {
  UserService.updateUser(userId, {
    name: editName.value,
    email: editEmail.value,
    role: editRole.value,
    status: editStatus.value,
  });
  editingUserId.value = null;
}

function deleteUser(userId: number): void {
  UserService.deleteUser(userId);
}

</script>

<template>
  <section class="space-y-6">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h1 class="text-3xl font-black tracking-tight text-body">
          User Management
        </h1>
        <p class="text-soft mt-1">
          Manage system users and their roles.
        </p>
      </div>
      <button
        class="h-10 px-5 bg-primary text-base font-bold text-sm rounded-lg flex items-center gap-2 hover:bg-primary-dark transition-all w-fit"
        @click="showForm = !showForm"
      >
        <span class="material-symbols-outlined text-sm">{{
          showForm ? "close" : "person_add"
        }}</span>
        {{ showForm ? "Cancel" : "Add User" }}
      </button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="p-6 rounded-xl border border-wire bg-panel">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-soft text-sm">Total Users</p>
            <h3 class="text-3xl font-bold mt-1 text-body">
              {{ users.length }}
            </h3>
          </div>
          <div class="p-2 bg-users-icon/20 rounded-lg text-users-icon">
            <span class="material-symbols-outlined">groups</span>
          </div>
        </div>
      </div>
      <div class="p-6 rounded-xl border border-wire bg-panel">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-soft text-sm">Admins</p>
            <h3 class="text-3xl font-bold mt-1 text-body">
              {{ users.filter((u) => u.role === "Admin").length }}
            </h3>
          </div>
          <div class="p-2 bg-primary/20 rounded-lg text-primary">
            <span class="material-symbols-outlined">shield_person</span>
          </div>
        </div>
      </div>
      <div class="p-6 rounded-xl border border-wire bg-panel">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-soft text-sm">Active</p>
            <h3 class="text-3xl font-bold mt-1 text-body">
              {{ users.filter((u) => u.status === "Active").length }}
            </h3>
          </div>
          <div class="p-2 bg-users-icon/20 rounded-lg text-users-icon">
            <span class="material-symbols-outlined">verified_user</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Create user form -->
    <form
      v-if="showForm"
      class="bg-panel border border-wire rounded-xl p-6 space-y-4"
      @submit.prevent="submitForm"
    >
      <h3 class="text-lg font-bold text-body">New User</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            class="block text-sm font-semibold text-soft mb-2"
            for="userName"
            >Name</label
          >
          <input
            v-model="name"
            type="text"
            id="userName"
            class="w-full bg-sheet border border-wire rounded-lg p-3 text-sm text-body placeholder:text-faded focus:outline-none focus:ring-1 focus:ring-primary"
            required
            placeholder="Full name"
          />
        </div>
        <div>
          <label
            class="block text-sm font-semibold text-soft mb-2"
            for="userEmail"
            >Email</label
          >
          <input
            v-model="email"
            type="email"
            id="userEmail"
            class="w-full bg-sheet border border-wire rounded-lg p-3 text-sm text-body placeholder:text-faded focus:outline-none focus:ring-1 focus:ring-primary"
            required
            placeholder="user@packtrack.io"
          />
        </div>
        <div>
          <label
            class="block text-sm font-semibold text-soft mb-2"
            for="userPassword"
            >Password</label
          >
          <input
            v-model="password"
            type="password"
            id="userPassword"
            class="w-full bg-sheet border border-wire rounded-lg p-3 text-sm text-body placeholder:text-faded focus:outline-none focus:ring-1 focus:ring-primary"
            required
            placeholder="Password"
          />
        </div>
        <div>
          <label
            class="block text-sm font-semibold text-soft mb-2"
            for="userRole"
            >Role</label
          >
          <select
            v-model="role"
            id="userRole"
            class="select-control w-full bg-sheet border border-wire rounded-lg p-3 text-sm text-body focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
        </div>
      </div>
      <button
        type="submit"
        class="bg-primary text-base font-bold py-2.5 px-6 rounded-lg text-sm hover:bg-primary-dark transition-all"
      >
        Create User
      </button>
    </form>

    <p v-if="successMessage" class="text-users-icon font-medium text-sm">
      {{ successMessage }}
    </p>

    <!-- Users table -->
    <div
      class="bg-panel border border-wire rounded-xl overflow-hidden"
    >
      <table class="w-full text-left">
        <thead class="bg-sheet text-faded text-xs uppercase font-bold">
          <tr>
            <th class="px-6 py-4">User</th>
            <th class="px-6 py-4">Role</th>
            <th class="px-6 py-4">Status</th>
            <th class="px-6 py-4">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-wire-subtle">
          <template v-for="user in users" :key="user.id">
            <tr class="hover:bg-sheet/50 transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div
                    class="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm"
                  >
                    {{ user.name.charAt(0) }}
                  </div>
                  <div>
                    <p class="text-sm font-bold text-body">
                      {{ user.name }}
                    </p>
                    <p class="text-xs text-faded">{{ user.email }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-xs font-bold text-primary">
                {{ user.role }}
              </td>
              <td class="px-6 py-4">
                <span
                  class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase"
                  :class="
                    user.status === 'Active'
                      ? 'bg-users-icon/10 text-users-icon border border-users-icon/20'
                      : 'bg-red-500/10 text-red-400 border border-red-500/20'
                  "
                >
                  {{ user.status }}
                </span>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-2">
                  <button
                    class="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all bg-panel border border-wire text-soft hover:bg-sheet"
                    @click="startEdit(user.id)"
                    title="Edit user"
                  >
                    <span class="material-symbols-outlined text-sm">edit</span>
                  </button>
                  <button
                    class="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20"
                    @click="deleteUser(user.id)"
                    title="Delete user"
                  >
                    <span class="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
              </td>
            </tr>

            <!-- Inline edit row -->
            <tr v-if="editingUserId === user.id">
              <td colspan="4" class="px-6 py-0">
                <div class="py-4 space-y-3 border-t border-primary/20">
                  <h4 class="text-sm font-bold text-body">Edit User</h4>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-xs font-semibold text-soft mb-1">Name</label>
                      <input
                        v-model="editName"
                        type="text"
                        class="w-full bg-sheet border border-wire rounded-lg p-2.5 text-sm text-body focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label class="block text-xs font-semibold text-soft mb-1">Email</label>
                      <input
                        v-model="editEmail"
                        type="email"
                        class="w-full bg-sheet border border-wire rounded-lg p-2.5 text-sm text-body focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label class="block text-xs font-semibold text-soft mb-1">Role</label>
                      <select
                        v-model="editRole"
                        class="select-control w-full bg-sheet border border-wire rounded-lg p-2.5 text-sm text-body focus:outline-none focus:ring-1 focus:ring-primary"
                      >
                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
                      </select>
                    </div>
                    <div>
                      <label class="block text-xs font-semibold text-soft mb-1">Status</label>
                      <select
                        v-model="editStatus"
                        class="select-control w-full bg-sheet border border-wire rounded-lg p-2.5 text-sm text-body focus:outline-none focus:ring-1 focus:ring-primary"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                  <div class="flex gap-3">
                    <button
                      class="bg-primary text-base font-bold py-2 px-5 rounded-lg text-sm hover:bg-primary-dark transition-all"
                      @click="saveEdit(user.id)"
                    >
                      Save
                    </button>
                    <button
                      class="bg-panel border border-wire text-soft font-bold py-2 px-5 rounded-lg text-sm hover:bg-sheet transition-all"
                      @click="editingUserId = null"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </section>
</template>
