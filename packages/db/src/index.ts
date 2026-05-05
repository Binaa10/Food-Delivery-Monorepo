import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as schema from "./schema";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(__dirname, "..");
/** Monorepo root: `../../orders.db` relative to `packages/db/` */
const dbPath = path.resolve(packageRoot, "../../orders.db");

const sqlite = new Database(dbPath);
export const db = drizzle(sqlite, { schema });
export * from "./schema.js";
