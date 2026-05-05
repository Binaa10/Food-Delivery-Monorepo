import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { defineConfig } from "drizzle-kit";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbFile = path.join(__dirname, "../../orders.db");

export default defineConfig({
  schema: "./src/schema.ts",
  out: "./drizzle",
  dialect: "sqlite",
  dbCredentials: {
    url: pathToFileURL(dbFile).href,
  },
});
