/** @author David Hdez */
// external imports
import { defineStore } from "pinia";
import { ref } from "vue";

// internal imports
import type { WarehouseInterface } from "@/interfaces/WarehouseInterface";

export const useWarehouseStore = defineStore("warehouse", () => {
  const warehouses = ref<WarehouseInterface[]>([]);

  return { warehouses };
});
