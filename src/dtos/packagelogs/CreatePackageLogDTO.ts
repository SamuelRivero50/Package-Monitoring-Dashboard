/** @author David Hdez */
// internal imports
import type { PackageLogInterface } from "@/interfaces/PackageLogInterface";

export type CreatePackageLogDTO = Omit<PackageLogInterface, "id" | "timestamp">;
