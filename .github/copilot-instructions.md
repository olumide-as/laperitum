# Copilot Instructions for La Peritum

## Project Overview
La Peritum is a Next.js 15 web application for managing and publishing articles. It features a public blog with content management capabilities, user authentication, and admin dashboard for publication creation/editing.

**Tech Stack**: Next.js 15 (App Router), TypeScript, Prisma ORM, MySQL, TailwindCSS 4, NextAuth.js, Tiptap rich text editor.

## Architecture & Data Flow

### Core Components
- **Publications System**: Articles with slug-based routing (`[slug]/page.tsx`), rich text content via Tiptap editor, image uploads to `/public/uploads/`
- **Authentication**: NextAuth.js with JWT strategy, credentials-based login (`src/lib/authOptions.ts`)
- **Admin Dashboard**: Protected routes via middleware (`src/middleware.ts` protects `/admin/*`)
- **Database**: MySQL with Prisma - key models are `Publication` and `User`

### Key Patterns
1. **Slug Generation**: Convert titles to URL-safe slugs using `titleToSlug()` (`src/utils/slugify.ts`). The `populateSlugs.js` script backfills missing slugs. Always generate slugs on publication creation.
2. **Client/Server Split**: Use `"use client"` in interactive components (`PublicationEditor.tsx`, `PublicationDetailsClient.tsx`). Server-render page shells, fetch data in page.tsx files.
3. **Protected Admin Routes**: All `/admin/*` paths blocked by middleware. Check `next-auth` session in components with `useSession()` from `@next-auth/react`.
4. **Image Handling**: Upload images via FormData to `/api/publications` (saves to `public/uploads/` with UUID prefix). Use Next.js `<Image>` component with `fill` layout for consistency.

## Development Workflows

### Build & Run
```bash
npm run dev              # Start with Turbopack (port 3000)
npm run build            # Prisma generate + Next build + sitemap generation
npm start                # Production server
npm run lint             # ESLint check
```

### Database
- Schema: `prisma/schema.prisma` (MySQL with custom table mappings)
- Migrations: `prisma/migrations/` - run `npx prisma migrate dev` after schema changes
- Generate client: `npx prisma generate` (auto-run during build)

### Key Scripts
- `populateSlugs.js`: Backfill missing slugs in publications. Run after adding new publications without slugs.
- Sitemap auto-generated post-build via `next-sitemap` config in `next-sitemap.config.js`

## Conventions & Patterns

### Session & Auth
- Extended NextAuth User type includes `id` and `username` fields (see `src/types/next-auth.d.ts` and callbacks in `authOptions.ts`)
- Session strategy: JWT (no database session storage)
- Redirect signIn page: `/login`

### File Organization
- API routes: `src/app/api/[feature]/route.ts` (e.g., `/publications`, `/auth/signup`)
- Dynamic routes: `[id]/` or `[slug]/` use bracket notation, fetch data in page component
- Shared components: `src/components/` (reusable UI, protect with `ProtectedRoute.tsx` if needed)
- Utilities: `src/utils/` (slugify, helpers)

### Styling
- TailwindCSS 4 (`postcss.config.mjs`, `src/app/globals.css`)
- Brand colors referenced in code: `#2F3545` (dark), `#C1A17C` (accent)
- Responsive classes: `md:`, `lg:` prefixes for tablet/desktop

## Integration Points & External Dependencies

- **NextAuth.js**: Handles auth logic. Check `authOptions.ts` for provider setup and callbacks
- **Prisma Client**: Auto-generated from schema. Initialize via `src/lib/prisma.ts` (singleton pattern)
- **Tiptap**: Rich text editor with StarterKit extensions. Config in `PublicationEditor.tsx`
- **CKEditor**: Imported but may not be actively used (check `package.json`)
- **MySQL**: Connection via `DATABASE_URL` env var (Prisma datasource)
- **Nodemailer**: Available for email features (setup in env, used in contact routes if implemented)

## Environment Variables Required
```
DATABASE_URL          # MySQL connection string
NEXTAUTH_SECRET       # JWT signing key (fallback: 'fallback_secret')
NEXTAUTH_URL          # For NextAuth callbacks (optional, defaults to localhost:3000)
NEXT_PUBLIC_BASE_URL  # Public base URL for share links (default: http://localhost:3000)
```

## Common Tasks

### Add New Publication API
1. Use POST `/api/publications` with FormData (title, content, datePublished, image file)
2. Server auto-generates slug via `slugify()` library
3. Image saved to `/public/uploads/` with UUID prefix

### Create Protected Admin Page
1. Add page in `src/app/admin/[feature]/page.tsx`
2. Middleware automatically protects `/admin/*` routes
3. Use `useSession()` in client components to verify access

### Update Publication Schema
1. Edit `prisma/schema.prisma`
2. Run `npx prisma migrate dev --name feature_name`
3. Run `npm run build` to regenerate Prisma client

## Debugging Tips
- Check NextAuth session: Log `useSession()` hook output in client components
- Verify slugs: Query `SELECT id, title, slug FROM publications` in MySQL
- Image uploads: Verify files exist in `public/uploads/` directory
- Build issues: Clear `.next/` and `node_modules/.prisma/` before rebuilding
