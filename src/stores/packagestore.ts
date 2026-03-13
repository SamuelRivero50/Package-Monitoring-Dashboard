/** @author David Hdez */
// external imports
import { defineStore } from "pinia";
import { ref } from "vue";

// internal imports
import type { PackageInterface } from "@/interfaces/PackageInterface";

export const usePackageStore = defineStore("package", () => {
  const packages = ref<PackageInterface[]>([]);

  return { packages };
});
