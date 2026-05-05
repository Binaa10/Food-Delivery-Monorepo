"use client";

import { SharedButton } from "@repo/ui/button";
import { useCallback, useEffect, useState } from "react";

const APP_NAME = "Customer App";

type OrderRow = { app: string; count: number };

const apiBase =
  typeof process.env.NEXT_PUBLIC_API_URL === "string"
    ? process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "")
    : "http://localhost:3005/api";

export default function Page() {
  const [rows, setRows] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setError(null);
    try {
      const res = await fetch(`${apiBase}/orders`, { cache: "no-store" });
      if (!res.ok) throw new Error(await res.text());
      const data = (await res.json()) as OrderRow[];
      setRows(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load orders");
    }
  }, []);

  useEffect(() => {
    void refresh();
    const id = setInterval(() => void refresh(), 2500);
    return () => clearInterval(id);
  }, [refresh]);

  async function placeOrder() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${apiBase}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appName: APP_NAME }),
      });
      if (!res.ok) throw new Error(await res.text());
      await refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to place order");
    } finally {
      setLoading(false);
    }
  }

  const totalOrders = rows.reduce((sum, row) => sum + row.count, 0);
  const leaderboard = [...rows].sort((a, b) => b.count - a.count);
  const topApp = leaderboard[0];

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#082f49_0%,_#020617_45%,_#020617_100%)] px-6 py-10 text-zinc-50">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-7">
        <section className="rounded-3xl border border-sky-200/10 bg-white/[0.03] p-7 shadow-[0_20px_80px_rgba(2,132,199,0.2)] backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-300/90">
            Live food delivery demo
          </p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{APP_NAME}</h1>
              <p className="max-w-2xl text-zinc-300">
                Place orders and watch shared stats update instantly across customer and
                restaurant dashboards.
              </p>
            </div>
            <SharedButton disabled={loading} onClick={() => void placeOrder()}>
              {loading ? "Placing..." : "Place Order"}
            </SharedButton>
          </div>
          {error ? (
            <p className="mt-4 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm text-red-300">
              {error}
            </p>
          ) : null}
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          <article className="rounded-2xl border border-white/10 bg-zinc-900/60 p-4">
            <p className="text-xs uppercase tracking-wider text-zinc-400">Total orders</p>
            <p className="mt-1 text-3xl font-bold tabular-nums text-sky-300">{totalOrders}</p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-zinc-900/60 p-4">
            <p className="text-xs uppercase tracking-wider text-zinc-400">Active apps</p>
            <p className="mt-1 text-3xl font-bold tabular-nums text-violet-300">{rows.length}</p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-zinc-900/60 p-4">
            <p className="text-xs uppercase tracking-wider text-zinc-400">Top app</p>
            <p className="mt-1 truncate text-xl font-semibold text-emerald-300">
              {topApp ? topApp.app : "No data yet"}
            </p>
          </article>
        </section>

        <section className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/70 shadow-2xl">
          <div className="border-b border-white/10 px-5 py-4">
            <h2 className="text-lg font-semibold">Live order counts</h2>
            <p className="text-sm text-zinc-400">Synced from GET {apiBase}/orders</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-zinc-900/80 text-zinc-400">
                <tr>
                  <th className="px-5 py-3 font-medium">App</th>
                  <th className="px-5 py-3 font-medium">Count</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="px-5 py-8 text-center text-zinc-500">
                      No stats yet - place an order to seed the table.
                    </td>
                  </tr>
                ) : (
                  leaderboard.map((r) => (
                    <tr key={r.app} className="border-t border-white/5 hover:bg-white/[0.03]">
                      <td className="px-5 py-3 font-medium text-zinc-100">{r.app}</td>
                      <td className="px-5 py-3 tabular-nums text-zinc-200">{r.count}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
