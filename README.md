# Flight Operations & Performance Analytics System

A full-stack SaaS platform for managing aviation operations, analyzing flight performance, and delivering real-time insights across multiple operational data streams.

---

## Overview

Airline operations typically rely on fragmented systems (Excel sheets, emails, logs). This project centralizes:

- Flight data
- Delay tracking
- Performance analytics
- Real-time insights
- Content management (blogs, landing pages)

Built using a modern **Next.js + Strapi + Event-driven architecture**.

---

---

## Tech Stack

### Frontend

- Next.js (App Router)
- React
- Tailwind CSS
- ShadCN UI

### Backend / API

- Next.js API Routes
- NextAuth.js (Authentication)

### CMS

- Strapi (Headless CMS)

### Database

- Sqlite (via Strapi)

### Auth

- Credentials Provider (NextAuth)
- JWT (Strapi-issued)

### DevOps

- Docker

---

## Authentication Flow

1. User logs in via UI
2. Credentials sent to NextAuth
3. NextAuth calls Strapi `/auth/local`
4. Strapi returns:
   - JWT
   - User object
5. JWT stored in session
6. Protected routes use session validation

---

---

## Data Fetching Strategy

### Public Content

```ts
fetchAPI();
```

ISR enabled (revalidate: 60)
Used for landing page, blogs

### Protected Content

```ts
fetchWithAuth();
```

Attaches JWT
Used for dashboard APIs

## Features

# Landing Page

Dynamic content from Strapi
Sections:
Hero
Problem
Solution
Features
Stats
Pricing

## Blog System

List page (/blog)
Dynamic detail page (/blog/[slug])
Rich text parsing support

## Authentication

Login / Register
NextAuth + Strapi integration
Protected dashboard

## Newsletter System

Email subscription API
Stored in Strapi collection
Dashboard shows total subscribers

## Dashboard

Protected route
Displays:
Stats (from Strapi)
Subscriber count

## Rendering Strategy

The application uses a hybrid rendering model:

### ISR (Incremental Static Regeneration)

- Landing page
- Blog listing
- Blog detail pages
- Revalidated every 60 seconds via Next.js caching

### SSR (Server-Side Rendering)

- Dashboard (protected routes)
- Session-based rendering using NextAuth

### CSR (Client-Side Rendering)

- Login / Register forms
- Newsletter subscription
- Interactive UI components

This approach ensures:

- Fast load times (ISR)
- Secure data access (SSR)
- Smooth user interactions (CSR)
