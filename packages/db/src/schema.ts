import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const orderStats = sqliteTable("order_stats", {
  app: text("app").primaryKey(),
  count: integer("count").notNull().default(0),
});
