# Studio-V: Project Bible

> **Single Source of Truth** — All LLMs and developers must reference this document before making changes.

---

## 1. Project Overview

**Studio-V** is a digital marketing agency pipeline tool for managing product photoshoots and AI-powered image generation.

### Core Purpose

Transform raw product photos into professional AI-generated marketing images by:

1. Collecting product details from sellers (name, description, variants, images)
2. Analyzing images with AI to generate structured JSON prompts
3. Using prompts for AI image generation
4. Storing and managing all media (original + generated)

### Target Users

- **Agency Staff**: Manage sellers, products, and run the image pipeline
- **Future**: Seller portal for self-service uploads

---

## 2. Tech Stack

| Layer       | Technology                              |
| ----------- | --------------------------------------- |
| Framework   | Next.js 16 (App Router, Turbopack)      |
| Language    | TypeScript                              |
| Styling     | Tailwind CSS (dark theme, Vercel-style) |
| State       | Zustand                                 |
| Database    | Supabase (PostgreSQL)                   |
| Code Editor | Monaco Editor                           |
| AI Vision   | Gemini 3 Flash / GPT-5.2 Flash          |
| Icons       | Lucide React                            |

### Design System

- **Theme**: Dark mode only
- **Colors**: Black (#000), White (#FFF), Gray (#333, #888)
- **Typography**: Geist Sans, Geist Mono
- **Style**: Minimalist, Vercel-inspired

---

## 3. Data Model

### Entities

```
┌─────────────┐       ┌─────────────────┐       ┌──────────────────┐
│   Seller    │──────<│     Product     │──────<│  ProductVariant  │
└─────────────┘       └─────────────────┘       └──────────────────┘
                              │
                              │
                      ┌───────┴───────┐
                      │     Media     │
                      └───────────────┘
```

### Seller

| Field      | Type      | Description        |
| ---------- | --------- | ------------------ |
| id         | UUID      | Primary key        |
| name       | string    | Contact name       |
| email      | string    | Email address      |
| phone      | string    | Phone number       |
| company    | string    | Company/brand name |
| notes      | text      | Internal notes     |
| created_at | timestamp | When created       |

### Product

| Field       | Type      | Description                       |
| ----------- | --------- | --------------------------------- |
| id          | UUID      | Primary key                       |
| seller_id   | UUID      | FK to Seller                      |
| name        | string    | Product name                      |
| description | text      | Product description               |
| status      | enum      | pending / in_progress / completed |
| created_at  | timestamp | When created                      |

### ProductVariant

| Field      | Type   | Description                         |
| ---------- | ------ | ----------------------------------- |
| id         | UUID   | Primary key                         |
| product_id | UUID   | FK to Product                       |
| name       | string | Variant name (e.g., "Red", "Large") |
| sku        | string | Optional SKU                        |

### Media

| Field       | Type      | Description                          |
| ----------- | --------- | ------------------------------------ |
| id          | UUID      | Primary key                          |
| product_id  | UUID      | FK to Product                        |
| variant_id  | UUID      | FK to ProductVariant (optional)      |
| type        | enum      | original / generated                 |
| url         | string    | Storage URL                          |
| json_prompt | jsonb     | The JSON prompt used (for generated) |
| created_at  | timestamp | When created                         |

---

## 4. Application Flow

### Pipeline Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                        STUDIO-V PIPELINE                        │
└─────────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
   ┌─────────┐          ┌──────────┐          ┌──────────┐
   │ SELLERS │ ──────>  │ PRODUCTS │ ──────>  │ PIPELINE │
   │  CRUD   │          │   CRUD   │          │  PROCESS │
   └─────────┘          └──────────┘          └──────────┘
                              │                     │
                              ▼                     ▼
                        ┌──────────┐          ┌──────────┐
                        │ VARIANTS │          │  MEDIA   │
                        │  CRUD    │          │ GALLERY  │
                        └──────────┘          └──────────┘
```

### Pipeline Process (Step by Step)

1. **Select Product** — Choose product and variant to process
2. **Upload/Select Images** — Add original product photos
3. **AI Vision Analysis** — Click "Analyze" to generate JSON prompt
4. **Edit JSON** — Refine prompt in Monaco editor
5. **Select Vibe** — Apply preset environment/camera settings
6. **Generate Image** — Send to image generation API
7. **Review & Save** — Preview result, save to media gallery
8. **Complete** — Mark product as processed

---

## 5. Page Structure

```
/                     → Dashboard (overview stats)
/sellers              → Seller list
/sellers/new          → Create seller
/sellers/[id]         → Edit seller
/products             → Product list (filterable by seller)
/products/new         → Create product
/products/[id]        → Edit product + manage variants
/pipeline             → Main pipeline workflow
/pipeline/[productId] → Process specific product
/media                → Media gallery (all images)
```

---

## 6. Components

### Shared Components

- `Sidebar` — Navigation sidebar
- `DataTable` — Reusable table with sorting, filtering, pagination
- `Modal` — Dialog/modal wrapper
- `Form` — Form components (Input, Select, Textarea, Button)

### Feature Components

- `UploadZone` — Drag & drop image upload
- `JsonEditor` — Monaco editor for JSON prompts
- `ControlPanel` — Provider & vibe selection, action buttons
- `MediaGrid` — Gallery grid for displaying images
- `BeforeAfter` — Side-by-side comparison view

---

## 7. JSON Prompt Schema

The AI generates this structure for image generation:

```typescript
interface StudioVPrompt {
  meta: {
    target_tool: string; // "Studio-V"
    image_dna: {
      type: string; // e.g., "Cinematic Editorial Product Photography"
      orientation_lock: string; // e.g., "LOCKED 1:1"
      sensor_emulation: string; // e.g., "Canon EOS R5"
    };
    aspect_ratio: string; // e.g., "1:1"
  };
  spatial_orientation_engine: {
    subject_facing: string; // Subject positioning description
  };
  camera_optics: {
    lens: string; // e.g., "50mm prime f/2.8"
    flaws: string[]; // Optical imperfections
  };
  environment: {
    lighting: string; // Lighting setup description
    objects: string[]; // Background elements
    setting: string; // Scene description
    sample: string; // Image reference
  };
  subject: {
    pose: string; // Pose description
    clothing: string; // Product description
    identity: string; // Model/product identity
    sample_clothing: string; // Reference
  };
  generation_keywords: {
    positive: string; // Positive prompts
    negative: string; // Negative prompts
  };
}
```

---

## 8. Smart Presets (Vibes)

| ID                   | Name               | Description                                    |
| -------------------- | ------------------ | ---------------------------------------------- |
| `dark-mode-neon`     | Dark Mode Neon     | Cinematic dark lighting, reflective highlights |
| `soft-pastel-studio` | Soft Pastel Studio | Bright studio, soft shadows, commercial        |
| `outdoor-nature`     | Outdoor Nature     | Golden hour, natural organic textures          |
| `minimalist-white`   | Minimalist White   | Ultra-clean white-on-white aesthetic           |

---

## 9. API Endpoints

### Existing

- `POST /api/analyze` — Analyze images with AI, return JSON prompt

### To Build

- `GET/POST /api/sellers` — Seller CRUD
- `GET/POST /api/products` — Product CRUD
- `GET/POST /api/products/[id]/variants` — Variant CRUD
- `GET/POST /api/media` — Media CRUD
- `POST /api/generate` — Trigger image generation (future)

---

## 10. Environment Variables

```bash
# Required: At least one LLM provider
GOOGLE_API_KEY=           # For Gemini 3 Flash
OPENAI_API_KEY=           # For GPT-5.2 Flash

# Required: Database
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Optional: Image storage (future)
CLOUDFLARE_R2_ENDPOINT=
CLOUDFLARE_R2_ACCESS_KEY=
CLOUDFLARE_R2_SECRET_KEY=
```

---

## 11. Coding Conventions

### File Naming

- Components: `kebab-case.tsx` (e.g., `upload-zone.tsx`)
- Lib/Utils: `kebab-case.ts` (e.g., `store.ts`)
- Routes: `route.ts` in `app/api/[endpoint]/`

### Component Structure

```tsx
'use client';  // If using hooks/state

import { ... } from 'react';
import { ... } from '@/lib/...';
import { ... } from '@/components/...';

interface Props { ... }

export function ComponentName({ ... }: Props) {
  // hooks first
  // handlers
  // render
}
```

### Styling

- Use Tailwind classes
- Use CSS variables from `globals.css` for theme colors
- Use `.btn`, `.card`, `.input`, `.label` utility classes

---

## 12. Task Management

We use **Beads** (`bd`) for task tracking. Tasks are stored in `.beads/`.

```bash
bd ready          # See available tasks
bd start <id>     # Start working on a task
bd close <id>     # Mark task complete
bd show <id>      # View task details
bdui start        # Open web UI
```

---

## 13. Git Workflow

1. Pull latest: `git pull --rebase`
2. Work on task: `bd start <id>`
3. Commit often: `git add -A && git commit -m "..."`
4. Push: `git push`
5. Close task: `bd close <id>`

---

## 14. Current Status

- ✅ Project initialized (Next.js 16)
- ✅ Dark theme implemented
- ✅ AI vision analysis working
- ✅ JSON editor with Monaco
- ✅ Beads task tracking set up
- ⏳ Rename to Studio-V
- ⏳ Database schema
- ⏳ Seller/Product/Media CRUD
- ⏳ Navigation structure
- ⏳ Pipeline workflow

---

## 15. References

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- [Beads](https://github.com/steveyegge/beads)

---

> **Note to LLMs**: Always read this file before starting work. Check `bd ready` for available tasks. Update this document if you make architectural changes.
