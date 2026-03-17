# PackTracker Coding Style Guide

This document defines the coding standards for the Vue.js project. It is divided into two sections: permanent project standards and requirements specific to the current academic deliverable. All contributors must follow both when applicable.

---

# Part I – Permanent Project Standards

These standards apply throughout the entire lifecycle of the system.

## 1. General Principles

- DRY (Don't Repeat Yourself)
- ETC (Easier to Change)
- Clean Code practices
- Separation of concerns
- Predictable architecture

Code must prioritize readability, maintainability, and scalability.

## 2. Technologies

- Vue.js 3 with TypeScript
- Pinia for global state management
- Vue Router for navigation

The architecture must remain modular and layered.

## 3. Project Structure

| Layer | Location | Responsibility |
|-------|----------|----------------|
| Views | `src/views/` | Application pages (`*View.vue`) |
| Components | `src/components/` | Reusable UI units |
| Stores | `src/stores/` | Global state (Pinia) |
| Services | `src/services/` | Data access logic |
| Interfaces | `src/interfaces/` | Domain entities from class diagram |
| Types | `src/types/` | Auxiliary types not in diagram |
| DTOs | `src/dtos/` | Data transfer objects |
| Infrastructure | `src/infrastructure/` | Persistence utilities |
| Data | `src/data/` | Seed data and initialization |

Business logic must not be embedded inside components.

## 4. Naming Conventions

- Components and views: PascalCase (`PackagesView.vue`, `AppSidebar.vue`)
- Stores, services, utilities: camelCase
- Folder names: lowercase

## 5. TypeScript Standards

- All functions must declare parameter and return types
- Domain entities must use interfaces
- Avoid `any`; use `unknown` when the type is truly unknown

## 6. Vue Component Design

- Use `<script setup>` and Composition API (no Options API)
- Single responsibility; reusable where possible
- Communicate via props and events
- Define props with `defineProps<Props>()` and emits with `defineEmits<Emits>()`
- Use Pinia stores for shared state; `ref`/`reactive` only for local state

## 7. State Management

Pinia stores must:

- Represent a clear domain
- Separate state, getters, and actions logically
- Avoid UI-specific logic

## 8. File Header

Every source file must include:

```
/**
 * @author Full Name
 * @description Brief description of the file purpose
 */
```

## 9. Commits

- Small and focused
- Written in English
- Use Conventional Commits: `type(scope): subject` (e.g. `feat(packages): add warehouse filter`)

---

# Part II – Requirements for the Current Deliverable

These rules apply specifically to the current academic submission.

## 1. Data Layer

- **Database**: LocalStorage. No backend API for this deliverable.
- **Seed data**: Create fictional data on first application load.
- Centralize access through services; avoid direct LocalStorage access in components.

## 2. Pages

- **7–9 pages** total: Home, Login, and at least five system pages (Dashboard, Packages, Warehouses, Carriers, Users, Settings).
- **2+ admin-only pages**: Protect with route guards; check user role.

## 3. Visualization

- **Chart.js** is required.
- At least one additional visualization library (Leaflet, D3, etc.).
- At least two pages must include: dropdown selectors, table format, and Chart.js charts.
- Create reusable components for table, chart, and selector.

## 4. CRUDs

- **2 full CRUDs** for 2 classes from the class diagram. All operations: Create, Read, Update, Delete.
- Data persisted in LocalStorage.
- Services and views must support all four operations.

## 5. Domain Model

- All 4 classes from the class diagram (User, Warehouse, Package, PackageLog) must be implemented as interfaces in `src/interfaces/`.
- Carrier and Dashboard are not in the diagram; they live in `src/types/`.

## 6. Documentation

- **README.md**: How to run the application, main route to invoke, setup instructions.
- Updated wiki documentation.
- Screenshots of key sections of the application.
