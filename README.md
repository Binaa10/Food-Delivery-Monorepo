# Food Delivery Monorepo

A Turbo + pnpm monorepo with two Next.js frontends and a shared Express API backed by SQLite.

## Overview

This project demonstrates a simple real-time style workflow:

- `customer` app places orders
- `restaurant` app marks orders as ready
- both apps read the same shared order stats from the API

## Tech Stack

- TurboRepo
- pnpm workspaces
- Next.js 15 (App Router)
- React 19
- Express 5
- Drizzle ORM + better-sqlite3
- Tailwind CSS v4

## Monorepo Structure

```text
apps/
  customer/      # Next.js app on :3000
  restaurant/    # Next.js app on :3001
packages/
  api/           # Express API on :3005
  db/            # Drizzle schema + SQLite connection
  ui/            # Shared UI components + global styles
orders.db        # SQLite database file (created at runtime)
```

## Prerequisites

- Node.js 20+ (Node 22 recommended)
- Corepack enabled
- pnpm `9.15.0` (defined in root `package.json`)

## Quick Start

1. From project root:

```bash
cd /home/bini/food-delivery
```

2. Enable and prepare pnpm with Corepack:

```bash
corepack prepare pnpm@9.15.0 --activate
```

3. Install dependencies:

```bash
corepack pnpm install
```

4. Run all apps and packages in dev mode:

```bash
corepack pnpm dev
```

5. Open:

- Customer: <http://localhost:3000>
- Restaurant: <http://localhost:3001>
- API: <http://localhost:3005>

## Environment Variables

Create `.env.local` at repo root:

```env
NEXT_PUBLIC_API_URL=http://localhost:3005/api
```

This value is used by both frontend apps.

## Available Commands

From repo root:

- `corepack pnpm dev` - run all workspace `dev` scripts via Turbo
- `corepack pnpm build` - build all packages/apps
- `corepack pnpm lint` - run lint tasks

Useful filtered commands:

- `corepack pnpm --filter customer dev`
- `corepack pnpm --filter restaurant dev`
- `corepack pnpm --filter @repo/api dev`
- `corepack pnpm --filter @repo/db db:push`

## API Endpoints

Base URL: `http://localhost:3005/api`

### `GET /orders`

Returns all app counters.

Example response:

```json
[
  { "app": "Customer App", "count": 2 },
  { "app": "Restaurant App", "count": 1 }
]
```

### `POST /orders`

Increments counter for an app name.

Example request body:

```json
{ "appName": "Customer App" }
```

Example response:

```json
{ "app": "Customer App", "count": 3 }
```

## Development Notes

- The API ensures the `order_stats` table exists on startup/use.
- Data is stored in `orders.db` in the repo root.
- Both frontends poll the API to keep counts in sync.

## Troubleshooting

### `pnpm: command not found`

Use Corepack directly:

```bash
corepack prepare pnpm@9.15.0 --activate
corepack pnpm -v
```

If your system blocks global shims, run commands with `corepack pnpm ...`.

### `npm i` fails in this repo

This workspace is pnpm-first. Use:

```bash
corepack pnpm install
```

### API returns `Internal server error`

Make sure API is running:

```bash
corepack pnpm --filter @repo/api dev
```

Then verify:

```bash
curl http://localhost:3005/api/orders
```

## License

Private project for learning/demo purposes.
