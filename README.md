# Unscaled

**The observer's freedom. Beyond the scale.**

A personal navigation hub for podcast, AI experiments, GitHub projects, and essays. Built on the philosophy that in an era obsessed with scale and parameters, true power lies in the freedom to observe from outside the metrics.

## What is Unscaled?

Unscaled is a rejection of the "bigger is better" narrative in AI and hardware. As a hardware founder, I could talk about process nodes and throughput. Instead, I choose to talk about what lies beyond the benchmark—the art, the philosophy, the human element that no metric can capture.

This site is my signal in the void: a space to share thoughts on intelligence, hardware limits, and the space between signal and noise.

## Features

- **Signal Field** — An interactive particle network that responds to your touch. Drag the nodes to feel the physics of connection.
- **Dynamic Navigation** — Four entry points (Github, Podcast, AI, Info) that grow into a curated collection of thoughts and work.
- **Responsive Design** — Seamlessly adapts from desktop to mobile, maintaining the aesthetic across all scales.
- **Database-Driven** — Navigation nodes and content are managed through a simple admin interface, allowing for easy expansion.

## Tech Stack

- **Frontend:** React 19 + Tailwind CSS 4 + Canvas (particle rendering)
- **Backend:** Express 4 + tRPC 11
- **Database:** MySQL with Drizzle ORM
- **Deployment:** Manus (built-in hosting with custom domains)

## Getting Started

### Prerequisites

- Node.js 22+
- pnpm 10+

### Installation

```bash
git clone https://github.com/massif-01/unscaled.git
cd unscaled
pnpm install
```

### Development

```bash
pnpm dev
```

The dev server runs on `http://localhost:3000`.

### Database Setup

```bash
pnpm db:push
```

This generates and applies database migrations using Drizzle Kit.

### Testing

```bash
pnpm test
```

Runs Vitest suite to verify backend logic.

## Project Structure

```
client/
  src/
    pages/        ← Page components (Home, AI, Info, Admin)
    components/   ← Reusable UI (SignalField, DashboardLayout)
    lib/          ← tRPC client setup
server/
  db.ts           ← Database query helpers
  routers.ts      ← tRPC procedure definitions
  storage.ts      ← S3 file storage helpers
drizzle/
  schema.ts       ← Database table definitions
shared/
  const.ts        ← Shared constants
```

## Admin Panel

Access `/admin` to manage:
- **Navigation Nodes** — Add, edit, or remove the four main entry points
- **Content Items** — Organize articles, podcast episodes, or AI experiments by category

Authentication is required; only the site owner can access the admin panel.

## Deployment

The site is deployed on Manus with automatic GitHub sync. To publish changes:

1. Commit and push to GitHub
2. Click **Publish** in the Manus Management UI
3. Changes go live at `unscaled.me`

## Design Philosophy

- **Simplicity** — Large whitespace, restrained typography, no clutter
- **Physicality** — Interactions feel real: drag nodes, feel the repulsion, watch particles breathe
- **Meaning** — Every element is bound to the theme; no decorative noise
- **Scalability** — The design adapts gracefully from mobile to desktop without losing its essence

## License

MIT

---

**Unscaled** — A signal beyond the scale. Built with intention, deployed with care.
