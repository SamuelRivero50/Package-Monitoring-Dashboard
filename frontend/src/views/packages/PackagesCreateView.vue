<!-- @author David Hdez, Juan Andrés Young -->
<script setup lang="ts">
// External imports
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// Internal imports
import type { CreatePackageDTO } from '@/dtos/packages/CreatePackageDTO';
import { PackageService } from '@/services/PackageService';
import type { PackageStatus } from '@/interfaces/PackageInterface';
import type { WarehouseInterface } from '@/interfaces/WarehouseInterface';
import { WarehouseService } from '@/services/WarehouseService';
import { useAuthStore } from '@/stores/authstore';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const STATUS_OPTIONS: PackageStatus[] = [
  'Pending',
  'In Transit',
  'At Warehouse',
  'Delivered',
  'Exception',
];

const warehouses = ref<WarehouseInterface[]>([]);
const description = ref<string>('');
const status = ref<PackageStatus>('Pending');
const price = ref<number>(0);
const warehouseId = ref<string>('');
const successMessage = ref<string>('');
const errorMessage = ref<string>('');
const submitting = ref<boolean>(false);

function closeCreateView(): void {
  const fromQuery = route.query.from;

  if (typeof fromQuery === 'string' && fromQuery.startsWith('/')) {
    router.push(fromQuery);
    return;
  }

  if (window.history.length > 1) {
    router.back();
    return;
  }

  router.push({ name: 'packages' });
}

async function submitForm(): Promise<void> {
  errorMessage.value = '';
  successMessage.value = '';

  const userId = authStore.currentUser?.id;
  if (!userId) {
    errorMessage.value = 'You must be signed in to create a package.';
    return;
  }

  if (!warehouseId.value) {
    errorMessage.value = 'Please select a warehouse.';
    return;
  }

  const payload: CreatePackageDTO = {
    description: description.value,
    status: status.value,
    price: price.value,
    userId,
    warehouseId: warehouseId.value,
  };

  submitting.value = true;
  try {
    await PackageService.createPackage(payload);
    successMessage.value = 'Package created successfully!';
    description.value = '';
    status.value = 'Pending';
    price.value = 0;
    warehouseId.value = warehouses.value[0]?.id ?? '';
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response) {
      const data = err.response.data as { message?: string | string[] };
      const message = Array.isArray(data.message)
        ? data.message.join(' ')
        : data.message;
      errorMessage.value = message ?? 'Unable to create package.';
    } else if (err instanceof Error) {
      errorMessage.value = err.message;
    } else {
      errorMessage.value = 'Unable to create package.';
    }
  } finally {
    submitting.value = false;
  }
}

onMounted(async () => {
  warehouses.value = await WarehouseService.getWarehouses();
  warehouseId.value = warehouses.value[0]?.id ?? '';
});
</script>

<template>
  <section class="max-w-2xl mx-auto py-4">
    <div class="flex items-center justify-between mb-8">
      <h2 class="text-2xl font-black text-body">Register New Package</h2>
      <button
        type="button"
        class="size-10 rounded-lg bg-panel border border-wire text-soft hover:text-primary hover:border-primary/40 transition-colors flex items-center justify-center"
        title="Close and go back"
        @click="closeCreateView"
      >
        <span class="material-symbols-outlined text-base">close</span>
      </button>
    </div>

    <form
      class="bg-panel border border-wire rounded-xl p-8 space-y-6"
      @submit.prevent="submitForm"
    >
      <div>
        <label
          class="block text-sm font-semibold text-soft mb-2"
          for="description"
          >Description</label
        >
        <input
          v-model="description"
          type="text"
          id="description"
          class="w-full bg-sheet border border-wire rounded-lg p-3 text-sm text-body placeholder:text-faded focus:outline-none focus:ring-1 focus:ring-primary"
          required
          placeholder="Package contents"
        />
      </div>

      <div>
        <label
          class="block text-sm font-semibold text-soft mb-2"
          for="warehouseId"
          >Warehouse</label
        >
        <select
          v-model="warehouseId"
          id="warehouseId"
          class="select-control w-full bg-sheet border border-wire rounded-lg p-3 text-sm text-body focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option
            v-for="warehouse in warehouses"
            :key="warehouse.id"
            :value="warehouse.id"
          >
            {{ warehouse.name }}
          </option>
        </select>
      </div>

      <div>
        <label
          class="block text-sm font-semibold text-soft mb-2"
          for="price"
          >Price (USD)</label
        >
        <input
          v-model.number="price"
          type="number"
          min="0"
          step="0.01"
          id="price"
          class="w-full bg-sheet border border-wire rounded-lg p-3 text-sm text-body placeholder:text-faded focus:outline-none focus:ring-1 focus:ring-primary"
          required
          placeholder="0.00"
        />
      </div>

      <div>
        <label
          class="block text-sm font-semibold text-soft mb-2"
          for="status"
          >Status</label
        >
        <select
          v-model="status"
          id="status"
          class="select-control w-full bg-sheet border border-wire rounded-lg p-3 text-sm text-body focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option v-for="opt in STATUS_OPTIONS" :key="opt" :value="opt">
            {{ opt }}
          </option>
        </select>
      </div>

      <div class="pt-4">
        <button
          type="submit"
          :disabled="submitting"
          class="w-full bg-primary text-base font-black py-3 rounded-xl hover:bg-primary-dark transition-all disabled:opacity-60"
        >
          {{ submitting ? 'Creating...' : 'Create Package' }}
        </button>
      </div>

      <p v-if="successMessage" class="text-emerald-400 mt-4 font-medium">
        {{ successMessage }}
      </p>
      <p v-if="errorMessage" class="text-rose-400 mt-4 font-medium">
        {{ errorMessage }}
      </p>
    </form>
  </section>
</template>
