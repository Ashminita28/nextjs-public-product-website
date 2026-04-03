# Fligo Public Product Website

## Overview

This is a public product site for an aviation operations. It combines a marketing landing site, blog system, auth-protected analytics dashboard, and Strapi headless CMS content backend.

## Tech Stack

- Next.js 16.2.1 (App Router)
- React 19
- TailwindCSS + shadcn/ui
- NextAuth (credentials) + JWT session
- Strapi headless CMS
- Docker + Docker Compose
- Vitest + Testing Library

## Project Structure

- `app/`: Next.js App Router routes and layouts
  - `app/page.tsx`: home landing (CMS-driven)
  - `app/features/page.tsx`, `app/pricing/page.tsx`, `app/blog/*`, `app/dashboard/page.tsx`
  - `app/login`, `app/register` (auth flows)
  - `app/api/*`: custom server actions (`register`, `stats`, `subscribe`) and `api/auth/[...nextauth]`
  - `app/layout.tsx`: global layout with `Navbar`, `Footer`, `Providers`
- `components/`: reusable UI and page sections
  - `components/layout/*`, `components/landing/*`, `components/auth/*`, `components/ui/*`
- `lib/`: service layer
  - `lib/strapi.ts`: Strapi API wrappers
  - `lib/api.ts`: core fetch / response normalizer
  - `lib/auth.ts`: NextAuth options
  - `lib/routes.ts`: route constants
  - `lib/marketing-metadata.ts`: SEO metadata builder
  - `lib/site.ts`: site URL utility
  - `lib/security.ts`: origin/content-type guard, sanitization
- `strapi/`: Strapi application (CMS service config + content model support)
- `tests/`: unit and integration coverage

## Architecture

- `app/layout.tsx` wraps all pages with `Navbar`, `Footer`, `Providers` (NextAuth session provider).
- Landing and marketing pages are server components that fetch Strapi data via `lib/strapi` and render from CMS payload.
- `app/api` contains lightweight JSON endpoints with validation (`zod` style) and origin checks.
- Auth is handled by NextAuth credentials provider at `/api/auth/[...nextauth]`, using `lib/auth.ts` and `lib/strapi.loginUser` for Strapi login.
- Protected dashboard uses `getServerSession` in server component to enforce redirect to `/login`.
- Client interactions (`login`, `register`, `newsletter`) run in `use client` components with forms, `react-hook-form`, and `sonner` toast feedback.

### Data flow

1. Browser -> Route.
2. Server page component fetches CMS data (e.g., `getLandingPage`, `getBlogs`) through `lib/strapi`.
3. Strapi content is fetched via internal API layer `lib/api` (with `STRAPI_URL` base).
4. `next-auth` handles user identifying and token injection for auth-protected endpoints.
5. Client forms send payload to `/api/register` or `/api/subscribe`, validated and proxied to Strapi.

## Major routes & modules

- `/`: Homepage (CMS-driven)
- `/features`: Feature list
- `/pricing`: Pricing plans
- `/blog`: Blog list
- `/blog/[slug]`: Blog detail (dynamic route)
- `/login`: Login screen
- `/register`: Signup screen
- `/dashboard`: Protected analytics dashboard
- `/api/register`, `/api/subscribe`, `/api/stats`
- `lib/strapi.ts`, `lib/api.ts`, `lib/auth.ts`
- `components/landing/*`, `components/auth/*`, `components/layout/*`

## Rendering Strategy

| Page / Component | Path                                | Rendering Strategy                                | Why Used                                                  |
| ---------------- | ----------------------------------- | ------------------------------------------------- | --------------------------------------------------------- |
| Home             | `app/page.tsx`                      | Server Component (SSR, `dynamic='force-dynamic'`) | CMS content; revalidate via Strapi-cached endpoint.       |
| Features         | `app/features/page.tsx`             | Server Component (SSR, dynamic)                   | CMS-driven features for SEO and fresh content.            |
| Pricing          | `app/pricing/page.tsx`              | Server Component (SSR, dynamic)                   | Pricing managed in Strapi, needs latest data.             |
| Blog listing     | `app/blog/page.tsx`                 | Server Component (SSR, dynamic)                   | Fetch posts list; SEO and update freshness.               |
| Blog details     | `app/blog/[slug]/page.tsx`          | Dynamic Server Component (SSR)                    | route params + dynamic SEO metadata; not static prebuild. |
| Dashboard        | `app/dashboard/page.tsx`            | Server Component (SSR, auth guard)                | secure data; `getServerSession` + Strapi auth.            |
| Login            | `app/login/page.tsx`                | Server Component + dynamic client form            | redirect logic on session; client login form.             |
| Register         | `app/register/page.tsx`             | Server Component + dynamic client form            | redirect logic; client signup form.                       |
| Navbar           | `components/layout/navbar.tsx`      | Client Component                                  | NextAuth session hook, user state toggling.               |
| NewsletterForm   | `components/newsletter.tsx`         | Client Component                                  | form interaction, useEffect, useState, fetch POST.        |
| LoginForm        | `components/auth/login-form.tsx`    | Client Component                                  | react-hook-form, signIn (NextAuth).                       |
| SignupForm       | `components/auth/register-form.tsx` | Client Component                                  | react-hook-form, API register, auto sign-in.              |

## Installation

Using pnpm:

```bash
cd nextjs-public-product-website
pnpm install
pnpm dev
pnpm build
pnpm start
```

## Environment Variables

Required for app and Strapi integration:

- `STRAPI_URL` (e.g. `http://localhost:1337`)
- `NEXTAUTH_SECRET` (secure key for NextAuth JWT)
- `NEXT_PUBLIC_SITE_URL` (example: `http://localhost:3000`)

Also set in Strapi config (in `strapi/.env`) for CMS runtime:

- `DATABASE_CLIENT` / `DATABASE_URL` / `DATABASE_HOST` / `DATABASE_NAME` / `DATABASE_USERNAME` / `DATABASE_PASSWORD`
- `APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `ENCRYPTION_KEY` (Strapi security fields)

## Key Features

- CMS-driven marketing content via Strapi APIs
- SEO metadata for main marketing pages
- Authentication with NextAuth credentials and Strapi JWT
- Protected dashboard with live stats+subscriber counts
- Client-side forms with validation and accessible error focus
- API validations and CORS origin filtering for server endpoints
- Dockerized app + Strapi setup via `docker-compose.yml`

## Performance & SEO

- Server components for SEO-critical pages.
- `dynamic='force-dynamic'` ensures latest CMS content on each request while using caching hints in `lib/strapi`.
- `fetch` caching with `next.revalidate` and tags (300s in Strapi layer).
- `Blog/[slug]` uses dynamic metadata generation from CMS.
- Client components limited to interactive forms and authenticated UI pieces.

## Deployment

### Docker (Local)

```bash
docker compose up --build
```

- `web` service build arg: `STRAPI_URL`
- `STRAPI_URL` should match internal network container path, e.g. `http://strapi:1337`
- Frontend exposed on `3000`, Strapi on `1337`
