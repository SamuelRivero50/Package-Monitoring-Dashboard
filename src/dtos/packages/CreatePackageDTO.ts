/** @author David Hdez */
// internal imports
import type { PackageInterface } from "@/interfaces/PackageInterface";

export type CreatePackageDTO = Omit<PackageInterface, "id" | "createdAt" | "updatedAt">;
