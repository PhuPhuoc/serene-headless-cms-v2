# Repository Guidelines

## Project Overview

Strapi **5.55.1** headless CMS for the Serene Saigon site (club, spaces, club events, membership). Backend only: it serves the REST content API (`/api`) and the admin panel (`/admin`); no frontend code lives here. Content is bilingual: default locale `en`, secondary `vi`.

All behavior is **schema-driven**. Every controller/service/route is the vanilla factory; application code (`src/index.ts`) is empty. Changes almost always mean editing JSON schemas/components, not TypeScript.

## Architecture & Data Flow

```
config/*.ts ──► middlewares ──► Postgres ──► plugin configs ──► admin (Vite)
                                     │
src/api/*/content-types/*/schema.json │  Strapi core auto-migrates tables
src/components/**/*.json ─────────────┘
                                     ▼
              core routers (createCoreRouter/Controller/Service)
                                     ▼
                     REST /api/<plural> + Documents API
                                     ▼
                        frontend (fetch + populate)
```

- **Single source of truth**: `src/api/*/content-types/*/schema.json` and `src/components/**/*.json`. `strapi develop` / `build` regenerate the DB schema automatically; there are no SQL migrations (`database/migrations/` is empty).
- **No custom backend logic**: `src/index.ts` `register`/`bootstrap` are no-ops; routes/controllers/services only call `factories.createCore*`. Do not add overrides unless the requirement cannot be modeled in schema.
- **Publishing**: every content type has `draftAndPublish: true`. Public queries return published entries only; use `status=draft|published` and `locale=` on the Documents API.
- **Query strictness**: `config/api.ts` sets `strictParams: true` and `strictRelations: true`. Unknown query keys and unpopulated relation access return **400**, not empty data. Always `populate` explicitly.
- **i18n**: localized (`pluginOptions.i18n.localized: true`) for `page`, `header`, `footer`, `space`, `club-event`, `event-category`. `event-venue` is **not** localized. Per-field `localized: false` marks language-neutral data (logos, `club-event.date`, `space.area/maxGuests/locationType`). Adding labels requires content in both `en` and `vi`.
- **Page composition**: `page.blocks` is the only dynamic zone → 8 `block.*` components, which nest `shared.*` and `navigation.link` (max depth 3).
- **Internal links**: `navigation.link.page` is a real `oneToOne` relation to `api::page.page`, so renaming the `page` UID or changing slug strategy breaks navigation.
- **`block.club-events` is presentational**: it stores only `limit` (default 7); the frontend fetches `/api/club-events` separately.

Content graph:

```
page ── dynamiczone blocks ──► block.hero|intro|day-at|simple-section|visit|membership|tier|club-events
                                   └──► shared.tag, shared.day-moment, shared.features,
                                        shared.pricing-tier, shared.background, navigation.link
header (single) ── navigation.menu-item[] ── navigation.link (+ children[])
footer (single) ── navigation.footer-column[] ── navigation.link[]
club-event ── manyToOne ──► event-venue
club-event ── oneToMany ──► event-category
navigation.link ── oneToOne ──► page
```

## Key Directories

| Path | Purpose |
|---|---|
| `src/api/<name>/content-types/<name>/schema.json` | Content-type definitions (kind, fields, relations, i18n, D&P) |
| `src/api/<name>/{routes,controllers,services}/` | Core factories only; one file per concern |
| `src/components/block/` | Page dynamic-zone blocks (`hero`, `intro`, `day-at`, `simple-section`, `visit`, `membership`, `tier`, `club-events`) |
| `src/components/shared/` | Reusable atoms (`background`, `tag`, `features`, `pricing-tier`, `day-moment`) |
| `src/components/navigation/` | `link`, `menu-item`, `footer-column` |
| `src/content-structure/groups.json` | Admin content-manager folder grouping; loaded by Strapi core (`version: 1`, max depth 3). No repo code reads it |
| `src/admin/` | Admin customization; only `*.example.tsx` exist, so none is active |
| `src/extensions/` | Plugin overrides; currently empty |
| `config/` | Server, admin, API, DB, middleware, plugin config (TypeScript) |
| `types/generated/` | Generated TS declarations for schemas/components — committed |
| `public/uploads/` | Runtime media; gitignored except `.gitkeep` |
| `database/migrations/` | Empty; Strapi auto-migration is used |

## Development Commands

Requires Node 20–26 (Node 22 verified) and a reachable PostgreSQL. Run from repo root.

```bash
bun install                 # only lockfile is bun.lock
npm run develop             # strapi develop — API + admin with watch
npm run build               # strapi build — compiles TS → dist/, admin → dist/build/
NODE_ENV=production npm run start

npm run console             # Strapi REPL
npx strapi ts:generate-types        # regenerate types/generated after schema edits
npx strapi content-types:list       # inspect registered UIDs
npx strapi routes:list              # inspect generated routes
npx strapi admin:create-user        # create an admin account
```

Backup / restore (`Makefile`):

```bash
make export                                        # → backup2010.tar.gz + export_<epoch>.log
npx strapi import -f backup2010.tar.gz --force     # correct form
# WARNING: `make import` is broken — import requires a .tar[.gz] path and has no --no-encrypt flag.
```

Notes: `strapi export -f` takes a base name and appends `.tar.gz`; `strapi import -f` takes a full path and validates the extension. Import is destructive (`--force` skips confirmation). `strapi start` needs `dist/src/index.js`; the admin UI additionally needs `dist/build/` from `npm run build` (currently absent).

## Code Conventions & Common Patterns

- **Naming**: folders and files kebab-case (`club-event`, `simple-section`); content-type UID `api::<kebab>.<kebab>`; `singularName`/`displayName` singular; `collectionName` snake_case plural (`club_events`). Components are `<category>.<kebab-file>` (`block.hero`, `navigation.link`).
- **Adding a content type**: create `src/api/<name>/content-types/<name>/schema.json` plus `routes/<name>.ts`, `controllers/<name>.ts`, `services/<name>.ts` using `factories.createCore*('<uid>')`, then run `npx strapi ts:generate-types`. Do not hand-edit `types/generated/*`.
- **Schema defaults**: set `draftAndPublish: true`; add `pluginOptions.i18n` only if the type is translated; mark language-neutral fields `localized: false`.
- **Reuse components**: backgrounds via `shared.background` (enum `default|color|image` + `hexColor`/`image`), CTAs via `navigation.link` (enum `internal|external|modal`, `page`/`url`/`modalKey`), labels via `shared.tag`. Do not introduce a second styling/CTA convention.
- **Relations**: declare both sides with `inversedBy`/`mappedBy`. Components may hold relations (`navigation.link.page`), but avoid adding relations to page blocks — keep them presentational.
- **i18n fields**: strings, richtext, media captions, slugs are localized; numbers, dates, enums, and brand logos are not.
- **Config style**: TypeScript default export, `({ env }) => ({...})`, typed with `Core.Config.*`; read secrets via `env(...)`, never hardcode. Server-side config changes belong in `config/`, not middleware hacks.
- **Error handling**: rely on core error middleware/`ApplicationError` from `@strapi/utils`. Do not swallow errors in controllers; if overriding, call `super`/`sanitizeOutput` and preserve permissions.
- **Formatting**: no ESLint/Prettier config is committed. Match existing style — 2-space indent, single quotes in TS, double quotes in schema JSON, trailing commas in TS objects.
- **Never commit**: `.env`, `dist/`, `.strapi/`, `public/uploads/*`, `*.tar.gz`, `*.log`.
- **Admin**: customizing requires renaming `src/admin/app.example.tsx` → `app.tsx` (and `vite.config.example.ts` → `vite.config.ts`). `src/admin/` is excluded from the server tsconfig and compiled separately via `src/admin/tsconfig.json`.

## Important Files

- `src/index.ts` — app lifecycle hooks (empty).
- `src/api/page/content-types/page/schema.json` — page + only dynamic zone.
- `src/components/navigation/link.json` — link model + page relation.
- `src/components/shared/background.json` — shared visual background pattern.
- `config/database.ts` — multi-client DB config (Postgres default in practice).
- `config/api.ts` — REST/Documents limits and strictness.
- `config/plugins.ts` — users-permissions refresh auth; upload MIME allow/deny (SVG allowed).
- `src/content-structure/groups.json` — admin folder grouping (Event group).
- `types/generated/{components,contentTypes}.d.ts` — generated types; commit after regen.
- `Makefile` — export/import shortcuts.

## Runtime/Tooling Preferences

- **Runtime**: Node `>=20 <=26` (Strapi bin is `#!/usr/bin/env node`); Strapi 5.55.1. Do not assume Bun as the runtime — Bun is only the lockfile producer (`bun.lock`, no `packageManager` field).
- **Package manager**: `npm`/`npx` for scripts and CLI (Makefile uses `npx`); `bun install` is acceptable for installs only.
- **Database**: PostgreSQL is effectively mandatory — only `pg@8.20.0` is installed (`better-sqlite3`/`mysql2` absent), even though `config/database.ts` falls back to `sqlite`. `.env` selects `postgres` at `127.0.0.1:5433`, DB `serene-cms-v2`, schema `public`, SSL off; pool defaults min 2 / max 10.
- **Env**: required `APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `TRANSFER_TOKEN_SALT`, `JWT_SECRET`, `ENCRYPTION_KEY`, plus `DATABASE_*`. `.env.example` omits every `DATABASE_*` variable — copying it boots SQLite and fails.
- **Auth**: users-permissions runs `jwtManagement: "refresh"` with httpOnly session cookies; refresh/logout endpoints under `/api/auth/*`. Public access is not provisioned in code — grant permissions in Admin → Roles or use API tokens.
- **Uploads**: allow list covers image/video/audio/pdf/doc/docx/text/csv; `image/svg+xml` is **not** denied (SVGs accepted).
- **Strapi Cloud**: `@strapi/plugin-cloud` is installed and auto-enabled; no config entry.

## Testing & QA

There is **no test framework, no test files, no lint/format/typecheck script, and no CI** in this repo. Verification is manual:

```bash
npx tsc --noEmit                                  # type-check server TS (passes)
npx tsc -p src/admin/tsconfig.json                # type-check admin TS
npm run build                                     # compile + admin bundle
npm run develop                                   # boot against Postgres
curl 'http://localhost:1337/api/pages?locale=en&status=published&populate=blocks'
curl 'http://localhost:1337/api/header?locale=vi&populate=*'
```

- After any schema/component change: `npx strapi ts:generate-types`, then `npx tsc --noEmit` and a boot/smoke fetch.
- Respect `strictParams`: unlisted query params or unpopulated relations produce 400 — include `populate` and only supported keys.
- A fresh database exposes no public content until roles/permissions are configured.
- Known artifacts: `backup2010.tar.gz` (Strapi 5.55.1 export, `en`/`vi`, 128 entity rows, 27 assets) and `export_1792497816022.log` (clean success). Treat both as data, not fixtures.
