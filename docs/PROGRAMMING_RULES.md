# PackTracker Programming Rules

This document defines the mandatory technical rules for the Vue.js project. Unlike the Coding Style Guide, which defines how code should be written, this page defines architectural and functional constraints that must not be violated.

Any commit or pull request that breaks these rules may be rejected or reverted.

---

## 1. Routing Rules

- Every route must be associated with a view component.
- All views must be implemented as Vue Single File Components.
- Route guards must be used to restrict administrator-only pages.
- Navigation logic must not be implemented directly in components when it belongs in the router configuration.
- Use lazy loading for dashboard-area routes: `component: () => import('../views/XView.vue')`.

---

## 2. View Rules

- Views represent pages only.
- Views must not contain business logic.
- Views must compose reusable components rather than implement UI logic themselves.
- Each view must correspond to a functional page of the system.
- Naming: `*View.vue` (e.g. `PackagesView.vue`).

---

## 3. Component Rules

- Components must not access LocalStorage directly.
- Components must not perform data persistence logic.
- Components must communicate through props and emitted events.
- Components must remain reusable and independent of specific views.
- Reusable components (table, chart, selector) must be generic and configurable.

---

## 4. Store Rules

- Stores are responsible for global application state.
- Authentication state must be handled exclusively by a store.
- Only stores or services may interact with LocalStorage (via infrastructure layer).
- Stores must not contain UI rendering logic.
- Stores represent a clear domain; separate state, getters, and actions logically.

---

## 5. Service Rules

- Services handle data persistence and retrieval.
- All access to LocalStorage must be centralized in services (using `src/infrastructure/storage`).
- Services must abstract data access from the rest of the system.
- Views and components must not manipulate storage directly.
- One class per domain entity with static methods (e.g. `PackageService`, `WarehouseService`).

---

## 6. Domain Model Rules

- All domain entities defined in the class diagram must be implemented as interfaces in `src/interfaces/`.
- Models must be typed using TypeScript interfaces.
- Domain logic must not be implemented inside components.
- Classes from the diagram: User, Warehouse, Package, PackageLog. Auxiliary types (Carrier, Dashboard) live in `src/types/`.

---

## 7. CRUD Rules

- At least two domain entities must implement full CRUD operations (Create, Read, Update, Delete).
- CRUD logic must be handled in stores or services.
- Components may trigger CRUD actions but must not implement them.
- Data must be persisted in LocalStorage.

---

## 8. Authentication and Authorization Rules

- Authentication state must persist between reloads (token and user in LocalStorage).
- Admin-only routes must be protected using router guards.
- Role validation must be handled through the authentication store.

---

## 9. Data Initialization Rules

- The application must generate initial fake data on first load.
- Data initialization must be handled in `src/data/seed.ts`.
- Components must not generate mock data.

---

## 10. Environment Configuration Rules

- All environment variables must be defined in `.env` files.
- Use `import.meta.env.VITE_*` for Vite env vars.
- Hardcoded configuration values are not allowed.
- Never commit `.env`; it is in `.gitignore`.

---

## 11. Code Ownership Rules

- Each file must include author information at the top (`@author`, `@description`).
- Commits that violate these rules or the Coding Style Guide may be reverted.
