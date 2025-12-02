# Cheetset Project Context

## 1. Project Overview
**Name**: Cheetset (Cheat Key + Set)
**Description**: A global utility tool platform providing essential tools for developers, investors, and general users.
**Goal**:
- Attract global traffic via multilingual support (KO, EN, JA).
- Achieve Google AdSense approval and monetization.
- Provide high-quality, "premium-feel" tools and related content.

## 2. Technology Stack
- **Framework**: Next.js 16.0.5 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Library**: React 19, Lucide React (Icons)
- **Deployment**: Vercel (with Vercel Analytics)
- **i18n**: Custom dictionary-based implementation (No external i18n library)

## 3. Key Features & Tools
The project is divided into three main categories:

### 👨‍💻 Developer Tools
- **JSON Formatter**: Validate, format (pretty print), and minify JSON.
- **Base64 Converter**: Image to Base64 & Base64 to Image.
- **Word Counter**: Real-time character/word counting (supports Korean/English/Japanese specific logic).

### 💰 Finance Tools
- **Salary Calculator**: 2025 Korean tax rates applied. Calculates take-home pay.
- **Stock Average Calculator**: "Watering down" (Averaging down) strategy calculator.

### 📅 Daily Utilities
- **Server Time Checker**: Millisecond-precision server time for ticketing.
- **Lotto Number Generator**: Random number generation.

### 📝 Blog System
- SEO-focused articles linked to specific tools.
- Multilingual content (KO, EN, JA).
- Hardcoded content structure in `src/app/[lang]/blog/[slug]/page.tsx` (Refactoring planned).

## 4. Project Structure
```
src/
├── app/
│   ├── [lang]/           # Localized routes (en, ko, ja)
│   │   ├── blog/         # Blog post pages
│   │   ├── tools/        # Utility tool pages
│   │   ├── about/        # About page
│   │   └── page.tsx      # Landing page
│   └── api/              # API routes (e.g., server-time)
├── config/
│   └── tools.ts          # Central registry for all tools (metadata, categories)
├── data/
│   └── posts.ts          # Blog post metadata (slug, title, date)
├── dictionaries/         # Translation files (ko.json, en.json, ja.json)
└── middleware.ts         # Locale detection and redirection
```

## 5. Development Conventions
- **Adding Tools**:
    1. Create page in `src/app/[lang]/tools/[slug]`.
    2. Add translations to `src/dictionaries/*.json`.
    3. Register in `src/config/tools.ts`.
- **Adding Blog Posts**:
    1. Add metadata to `src/data/posts.ts`.
    2. Add content logic to `src/app/[lang]/blog/[slug]/page.tsx`.
    3. Update `validSlugs` array.

## 6. Current Status & Roadmap
- **Phase**: Phase 2 (Content Expansion & SEO)
- **Recent Updates**: Added Base64 tools, updated About page, added "Base64 Guide" blog post.
- **Immediate Tasks**:
    - Refactor blog structure (split huge `page.tsx` file).
    - Continue adding high-demand tools.
    - Monitor AdSense approval status.
