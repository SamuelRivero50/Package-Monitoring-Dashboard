# Package Monitoring Dashboard — Backend

REST API in **NestJS 11** that powers the Vue frontend of the Package Monitoring Dashboard. Uses **TypeORM** with **SQLite** for persistence and **JWT + bcrypt** for authentication and authorization.

## Tech stack

| Layer | Choice |
|---|---|
| Framework | NestJS 11 (Node 20+) |
| Language | TypeScript 5.7 (strict null checks) |
| ORM | TypeORM 0.3 |
| Database | SQLite (dev); easily swappable to Postgres/MySQL |
| Auth | `@nestjs/jwt` for tokens, `bcrypt` for password hashing |
| Validation | `class-validator` + `class-transformer` |
| Lint / Format | ESLint 9 (flat config), Prettier 3 |

## Folder structure

```
backend/
├── src/
│   ├── auth/                 # JWT auth: login, register, profile, guards, roles
│   │   ├── decorators/       # @Roles() metadata decorator
│   │   ├── dto/              # SignIn / Register payloads
│   │   ├── guards/           # AuthGuard + RolesGuard
│   │   └── *.ts              # module / controller / service / constants
│   ├── users/                # User CRUD (Admin-gated)
│   │   ├── dto/              # Create / Update DTOs
│   │   └── entities/         # User TypeORM entity
│   ├── warehouses/           # Warehouse CRUD (Admin-gated mutations)
│   ├── packages/             # Package CRUD (any authenticated user)
│   ├── package-logs/         # PackageLog CRUD + GET /by-package/:id
│   ├── interfaces/auth/      # JWT payload + Express Request typings
│   ├── types/                # Shared union aliases (Role, PackageStatus)
│   ├── app.module.ts         # Root module wiring
│   └── main.ts               # Bootstrap, CORS, ValidationPipe, ClassSerializerInterceptor
├── docs/
│   ├── architecture.md       # Layers, class diagram, ER diagram, module graph
│   ├── authentication.md     # JWT flow, role enforcement, sequence diagrams
│   └── api-reference.md      # Endpoint catalog with curl examples
├── nest-cli.json
├── tsconfig.json
└── package.json
```

## Quick start

```bash
# Install dependencies
npm install

# Run in watch mode (recompiles on save)
npm run start:dev

# Production build
npm run build && npm run start:prod
```

The API listens on `http://localhost:3000` with global prefix `/api`.

## Environment variables

All optional — sane defaults are baked in.

| Variable | Default | Purpose |
|---|---|---|
| `PORT` | `3000` | HTTP port |
| `CORS_ORIGIN` | `http://localhost:5173, http://localhost, http://127.0.0.1` | Comma-separated list of allowed origins |
| `SQLITE_PATH` | `database.sqlite` | Path to the SQLite file (relative to backend/) |

The JWT signing secret currently lives in `src/auth/constants.ts` and is **not** read from env (intentional simplification — see `docs/authentication.md`).

## High-level architecture

```mermaid
flowchart LR
    Vue[Vue 3 Frontend] -- HTTPS + Bearer JWT --> Nest[NestJS API]
    Nest -- TypeORM --> SQLite[(SQLite database.sqlite)]

    subgraph Nest [NestJS API]
        direction TB
        VP[ValidationPipe] --> AG[AuthGuard]
        AG --> RG[RolesGuard]
        RG --> Ctrl[Controller]
        Ctrl --> Svc[Service]
        Svc --> Repo[Repository]
        Resp[ClassSerializerInterceptor] -.strips @Exclude.- Ctrl
    end
```

## Documentation index

- **[Architecture](./docs/architecture.md)** — class diagram, ER diagram, module graph, folder conventions.
- **[Authentication and authorization](./docs/authentication.md)** — JWT flow sequence diagrams, RolesGuard logic, permissions matrix.
- **[API reference](./docs/api-reference.md)** — every endpoint with method, payload, response, required role, and curl examples.

## Available scripts

| Command | Description |
|---|---|
| `npm run start` | Start once (no watch) |
| `npm run start:dev` | Start with file watcher (recommended for dev) |
| `npm run start:prod` | Run the compiled `dist/main.js` |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm run lint` | ESLint with `--fix` |
| `npm run format` | Prettier on `src/**/*.ts` and `test/**/*.ts` |
| `npm run test` | Jest unit tests (none currently authored) |

## Conventions

- Folders are plural (`users/`, `warehouses/`, `packages/`, `package-logs/`).
- DTO filenames are kebab-case with the `.dto.ts` suffix; updates use `PartialType(CreateXxxDto)`.
- Imports are grouped with `// External imports` and `// Internal imports` comment blocks.
- Type-only imports use `import type { Foo }` for shared unions and interfaces.
- All controller and service methods declare explicit `Promise<T>` return types.
- `ValidationPipe` runs globally with `whitelist: true`, `forbidNonWhitelisted: true`, `transform: true` — unknown payload fields cause a 400.
- `ClassSerializerInterceptor` runs globally so every response respects `@Exclude()` (User.password is never sent).

## Authors

Samuel Rivero, David Hdez (Law), Juan Andrés Young Hoyos
