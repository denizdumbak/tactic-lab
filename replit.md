# Tactic Lab

## Overview

Tactic Lab is a Turkish football analytics blog platform built as a full-stack application. It features a public-facing editorial-style blog with categorized posts (Scouting, Taktik, Maç Analizi) and a hidden admin panel for content management. The platform supports rich text content creation via Editor.js and includes specialized scout profile data for player analysis posts.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **UI Components**: Shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom editorial theme (serif fonts, muted colors, newspaper aesthetic)
- **Rich Text Editor**: Editor.js with plugins (Header, Paragraph, Quote, List, Image)

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Design**: RESTful endpoints defined in `shared/routes.ts` with Zod validation
- **File Uploads**: Multer for image handling, stored in `/uploads` directory
- **Build System**: Vite for frontend, esbuild for server bundling

### Data Layer
- **Database**: PostgreSQL with Drizzle ORM
- **Schema Location**: `shared/schema.ts` contains all table definitions
- **Content Storage**: JSONB format for Editor.js structured content
- **Key Tables**:
  - `posts`: Blog posts with slug, title, summary, content (JSONB), category, imageUrl
  - `scoutProfiles`: Player scouting data linked to posts (playerName, age, position, strengths, risks)

### Content Rendering
- **EditorRenderer Component**: Located at `client/src/components/EditorRenderer.tsx`
- **Sanitization**: DOMPurify with strict whitelist (b, i, u, strong, em, a, br, mark, code)
- **HTML Parsing**: html-react-parser for safe React element conversion
- **Link Security**: Only http/https/mailto protocols allowed, automatic rel="noopener noreferrer"
- **Supported Blocks**: paragraph, header (h2-h4), quote, list (ordered/unordered), image with captions
- **Typography**: Tailwind Typography prose classes for enhanced reading experience

### Project Structure
```
client/src/          # React frontend
  components/        # UI components including Layout, Navigation, PostPreview
  pages/             # Route pages (Home, PostDetail, Category, AdminPanel)
  hooks/             # Custom hooks for posts CRUD operations
  lib/               # Utilities and constants (category mappings)
server/              # Express backend
  routes.ts          # API endpoint handlers
  storage.ts         # Database operations layer
  db.ts              # Drizzle database connection
shared/              # Shared code between frontend/backend
  schema.ts          # Drizzle table schemas and types
  routes.ts          # API route definitions with Zod schemas
```

### Bilingual System
- **Translation Files**: `client/src/lib/i18n.ts` contains all UI text in Turkish (tr) and English (en)
- **Language Context**: `client/src/lib/language-context.tsx` provides LanguageProvider and useLanguage hook
- **Language Toggle**: TR/EN buttons in header via `client/src/components/LanguageToggle.tsx`
- **Persistence**: Language preference stored in localStorage with key 'tactic-lab-language'
- **Detection**: Browser locale detection on first visit, defaults to Turkish
- **Translation Access**: Use `t('key.subkey')` function from useLanguage hook
- **Category Labels**: Language-aware helpers (getCategoryLabel, getCategoryTitle, getCategoryDescription) in `lib/constants.ts`
- **Note**: Only UI text is translated; post content remains single-language

### Key Design Decisions

1. **Hidden Admin Route**: Admin panel is at `/studio-x7k9m` (non-guessable) with no public links
2. **Category Slug Mapping**: Categories stored as ASCII slugs, displayed with proper Turkish characters via mapping in `lib/constants.ts`
3. **Featured Images**: Posts without imageUrl fall back to category-specific placeholder images
4. **Shared Types**: TypeScript types derived from Drizzle schemas ensure frontend/backend type safety
5. **Bilingual UI**: All UI text uses translation keys via centralized i18n system, while post content stays single-language

## External Dependencies

### Database
- PostgreSQL database (connection via `DATABASE_URL` environment variable)
- Drizzle ORM for database operations
- Drizzle Kit for migrations (`npm run db:push`)

### Third-Party Services
- No external API integrations currently
- Image uploads stored locally in `/uploads` directory

### Key NPM Packages
- `@tanstack/react-query`: Server state management
- `@editorjs/*`: Rich text editor components
- `@radix-ui/*`: Accessible UI primitives
- `drizzle-orm` / `drizzle-zod`: Database ORM with schema validation
- `date-fns`: Date formatting
- `multer`: File upload handling