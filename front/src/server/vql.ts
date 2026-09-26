import { createMemoryValthera } from "@wxn0brp/db-core";
import VQLProcessor from "@wxn0brp/vql";
export const db = createMemoryValthera();
export const VQL = new VQLProcessor({
	local: db,
} as any);
