/** @author David Hdez */
// external imports
import { defineStore } from "pinia";
import { ref } from "vue";

// internal imports
import type { PackageLogInterface } from "@/interfaces/PackageLogInterface";

export const usePackageLogStore = defineStore("packagelog", () => {
  const packageLogs = ref<PackageLogInterface[]>([]);

  return { packageLogs };
});
