<!-- @author David Hdez -->
<script setup lang="ts">
// external imports
import { ref } from "vue";

// internal imports
import { UserService } from "@/services/UserService";
import type { CreateUserDTO } from "@/dtos/CreateUserDTO";

const users = UserService.getUsers();

const showForm = ref(false);
const name = ref("");
const email = ref("");
const password = ref("");
const role = ref("User");
const successMessage = ref("");

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
</script>

<template>
  <section class="space-y-6">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h1 class="text-3xl font-black tracking-tight text-text-primary">
          User Management
        </h1>
        <p class="text-text-secondary mt-1">
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
      <div class="p-6 rounded-xl border border-border-default bg-surface">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-text-secondary text-sm">Total Users</p>
            <h3 class="text-3xl font-bold mt-1 text-text-primary">
              {{ users.length }}
            </h3>
          </div>
          <div class="p-2 bg-users/20 rounded-lg text-users">
            <span class="material-symbols-outlined">groups</span>
          </div>
        </div>
      </div>
      <div class="p-6 rounded-xl border border-border-default bg-surface">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-text-secondary text-sm">Admins</p>
            <h3 class="text-3xl font-bold mt-1 text-text-primary">
              {{ users.filter((u) => u.role === "Admin").length }}
            </h3>
          </div>
          <div class="p-2 bg-primary/20 rounded-lg text-primary">
            <span class="material-symbols-outlined">shield_person</span>
          </div>
        </div>
      </div>
      <div class="p-6 rounded-xl border border-border-default bg-surface">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-text-secondary text-sm">Active</p>
            <h3 class="text-3xl font-bold mt-1 text-text-primary">
              {{ users.filter((u) => u.status === "Active").length }}
            </h3>
          </div>
          <div class="p-2 bg-users/20 rounded-lg text-users">
            <span class="material-symbols-outlined">verified_user</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Create user form -->
    <form
      v-if="showForm"
      class="bg-surface border border-border-default rounded-xl p-6 space-y-4"
      @submit.prevent="submitForm"
    >
      <h3 class="text-lg font-bold text-text-primary">New User</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            class="block text-sm font-semibold text-text-secondary mb-2"
            for="userName"
            >Name</label
          >
          <input
            v-model="name"
            type="text"
            id="userName"
            class="w-full bg-elevated border border-border-default rounded-lg p-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-primary"
            required
            placeholder="Full name"
          />
        </div>
        <div>
          <label
            class="block text-sm font-semibold text-text-secondary mb-2"
            for="userEmail"
            >Email</label
          >
          <input
            v-model="email"
            type="email"
            id="userEmail"
            class="w-full bg-elevated border border-border-default rounded-lg p-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-primary"
            required
            placeholder="user@packtrack.io"
          />
        </div>
        <div>
          <label
            class="block text-sm font-semibold text-text-secondary mb-2"
            for="userPassword"
            >Password</label
          >
          <input
            v-model="password"
            type="password"
            id="userPassword"
            class="w-full bg-elevated border border-border-default rounded-lg p-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-primary"
            required
            placeholder="Password"
          />
        </div>
        <div>
          <label
            class="block text-sm font-semibold text-text-secondary mb-2"
            for="userRole"
            >Role</label
          >
          <select
            v-model="role"
            id="userRole"
            class="select-control w-full bg-elevated border border-border-default rounded-lg p-3 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-primary"
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

    <p v-if="successMessage" class="text-users font-medium text-sm">
      {{ successMessage }}
    </p>

    <!-- Users table -->
    <div
      class="bg-surface border border-border-default rounded-xl overflow-hidden"
    >
      <table class="w-full text-left">
        <thead class="bg-elevated text-text-muted text-xs uppercase font-bold">
          <tr>
            <th class="px-6 py-4">User</th>
            <th class="px-6 py-4">Role</th>
            <th class="px-6 py-4">Status</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-border-subtle">
          <tr
            v-for="user in users"
            :key="user.id"
            class="hover:bg-elevated/50 transition-colors"
          >
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <div
                  class="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm"
                >
                  {{ user.name.charAt(0) }}
                </div>
                <div>
                  <p class="text-sm font-bold text-text-primary">
                    {{ user.name }}
                  </p>
                  <p class="text-xs text-text-muted">{{ user.email }}</p>
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
                    ? 'bg-users/10 text-users border border-users/20'
                    : 'bg-red-500/10 text-red-400 border border-red-500/20'
                "
              >
                {{ user.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
