# PackTrack — Logistics & Warehouse Management

A logistics and warehouse management platform built with Vue 3, TypeScript, Pinia, and Vue Router. It supports real-time package tracking, warehouse capacity monitoring, carrier management, and user administration.

## Tech Stack

| Layer      | Technology                  |
|------------|-----------------------------|
| Framework  | Vue 3 (Composition API)     |
| Language   | TypeScript                  |
| State      | Pinia                       |
| Routing    | Vue Router 5                |
| Build      | Vite                        |
| Testing    | Vitest + Playwright (e2e)   |
| Linting    | ESLint + oxlint + Prettier  |

## Project Structure

```
src/
├── models/        Domain interfaces and DTOs
├── services/      HTTP service layer (API client + per-entity services)
├── viewmodels/    Composables that own page-level business logic
├── stores/        Pinia stores (global shared state)
├── views/         Page components (presentational)
├── components/    Shared UI components
├── router/        Route definitions
└── assets/        Global CSS and static files
```

## Getting Started

```bash
# Install dependencies
npm install

# Copy the environment file and fill in your backend URL
cp .env.example .env

# Start the dev server
npm run dev
```

## Connecting a Backend

All services live in `src/services/`. Each method has a `// TODO:` comment showing the `apiFetch()` call to uncomment once the API is running. Set `VITE_API_BASE_URL` in your `.env` file and remove the mock data arrays.

## Available Scripts

| Script             | Description                         |
|--------------------|-------------------------------------|
| `npm run dev`      | Start the dev server                |
| `npm run build`    | Production build                    |
| `npm run preview`  | Preview the production build        |
| `npm run test:unit`| Run unit tests with Vitest          |
| `npm run test:e2e` | Run end-to-end tests with Playwright|
| `npm run lint`     | Lint and auto-fix the source files  |
| `npm run format`   | Format source files with Prettier   |
