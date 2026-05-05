import { eq, sql } from "drizzle-orm";
import { db, orderStats } from "@repo/db";

async function ensureOrderStatsTable() {
  await db.run(sql`
    CREATE TABLE IF NOT EXISTS order_stats (
      app TEXT PRIMARY KEY NOT NULL,
      count INTEGER NOT NULL DEFAULT 0
    )
  `);
}

export async function getAllOrderStats() {
  await ensureOrderStatsTable();
  return db.select().from(orderStats);
}

export async function incrementOrderCount(appName: string) {
  await ensureOrderStatsTable();
  await db
    .insert(orderStats)
    .values({ app: appName, count: 1 })
    .onConflictDoUpdate({
      target: orderStats.app,
      set: { count: sql`${orderStats.count} + 1` },
    });
  const [row] = await db
    .select()
    .from(orderStats)
    .where(eq(orderStats.app, appName));
  return row ?? { app: appName, count: 1 };
}
