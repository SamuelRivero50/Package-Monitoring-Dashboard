# PackTrack — Package Monitoring Dashboard

A Vue 3 single-page application for real-time package and warehouse monitoring.

## Authors

Samuel Rivero, Law, Juan Andrés Young Hoyos

## Tech Stack

- **Vue 3** + Composition API (`<script setup>`)
- **Vite** — build tool and dev server
- **TypeScript**
- **Pinia** — state management
- **Vue Router** — client-side routing
- **Chart.js** — data visualizations (bar and pie charts)
- **Leaflet** — interactive maps
- **Tailwind CSS** — utility-first styling
- **LocalStorage** — data persistence (no backend required)

## Prerequisites

- Node.js ≥ 18
- npm ≥ 9

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

## Main Route

`/` — Home page (public landing)

Log in with one of the seeded accounts (auto-created on first load):

| Email | Password | Role |
|---|---|---|
| alex@packtrack.io | admin123 | Admin |
| maria@packtrack.io | maria123 | User |
| john@packtrack.io | john123 | User |

## Other Commands

```bash
# Type-check + production build
npm run build

# Preview the production build locally
npm run preview

# Lint
npm run lint
```

## Pages

| Route | Description | Access |
|---|---|---|
| `/` | Home | Public |
| `/login` | Login | Public |
| `/signup` | Sign up | Public |
| `/dashboard` | Overview with charts | Auth |
| `/packages` | Package list with filters and chart | Auth |
| `/packages/create` | Create a new package | Auth |
| `/packages/:id` | Package detail and tracking timeline | Auth |
| `/warehouses` | Warehouse list with capacity chart | Auth |
| `/users` | User management | Admin only |
| `/settings` | Settings | Admin only |
