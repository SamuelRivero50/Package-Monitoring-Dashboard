/** @author David Hdez */
// internal imports
import type { WarehouseInterface } from "@/interfaces/WarehouseInterface";

export type CreateWarehouseDTO = Omit<WarehouseInterface, "id">;
