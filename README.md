# PackTrack — Logistics & Warehouse Management

A logistics and warehouse management SPA built with Vue 3, TypeScript, Pinia, and Vue Router. Supports package tracking with full CRUD and log history, warehouse capacity monitoring, and user administration. Data is persisted in the browser via LocalStorage — no backend required.

**Authors:** Samuel Rivero, Law, Juan Andrés Young Hoyos

## Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Framework  | Vue 3 (Composition API)           |
| Language   | TypeScript                        |
| State      | Pinia                             |
| Routing    | Vue Router 5                      |
| Charts     | Chart.js via vue-chartjs          |
| Maps       | Leaflet                           |
| Build      | Vite                              |
| Linting    | ESLint + oxlint + Prettier        |

## Project Structure

```
src/
├── interfaces/    Domain interfaces (Package, Warehouse, User, PackageLog)
├── dtos/          Data Transfer Objects for CRUD operations
├── services/      Per-entity services — read/write LocalStorage
├── viewmodels/    Composables that own page-level business logic
├── stores/        Pinia stores (global shared state)
├── views/         Page components (9 pages)
├── components/    Shared UI components (BarChart, AppModal, LeafletMap, …)
├── utils/         Shared pure utilities (e.g. statusBadgeClass)
├── router/        Route definitions with auth and role guards
├── infrastructure/ LocalStorage helpers
├── data/          Seed data loaded on first run
└── assets/        Global CSS and static files
```

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server (opens at http://localhost:5173)
npm run dev
```

On first load the app seeds LocalStorage with 3 users, 3 packages, and 4 warehouses automatically.

**Demo credentials**

| Role  | Email                  | Password   |
|-------|------------------------|------------|
| Admin | alex@packtrack.dev     | admin123   |
| User  | maria.g@global.net     | user123    |

## Connecting a Backend

All services live in `src/services/`. Each method has a `// TODO:` comment showing the `apiFetch()` call to uncomment once the API is running. Set `VITE_API_BASE_URL` in your `.env` file and remove the LocalStorage calls.

## Available Scripts

| Script              | Description                          |
|---------------------|--------------------------------------|
| `npm run dev`       | Start the dev server                 |
| `npm run build`     | Production build                     |
| `npm run preview`   | Preview the production build         |
| `npm run lint`      | Lint and auto-fix the source files   |
| `npm run format`    | Format source files with Prettier    |
