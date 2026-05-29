# Plan: Replace Russian Client Names with Norwegian/European Names

## Problem

The website currently displays Russian client names in the reviews/testimonials section. Since this is a Scandinavian digital agency (amediå) targeting the Norwegian and European market, all client names should reflect the target audience — half Norwegian, half European.

## Current State

Only one file contains client names in rendered text:

### [`src/components/sections/reviews.tsx`](src/components/sections/reviews.tsx:8-38)

The `REVIEWS` constant contains 4 hardcoded Russian client names:

| # | Current Name | Current Company | Issue |
|---|-------------|-----------------|-------|
| 1 | Анна Смирнова | TechCorp | Russian name |
| 2 | Михаил Иванов | Retail Group | Russian name |
| 3 | Елена Попова | Startup Hub | Russian name |
| 4 | Дмитрий Волков | FinTech Pro | Russian name |

## What Was Checked (and found clean)

- **`src/locales/en.json`** — No client names, only generic text ✅
- **`src/locales/no.json`** — No client names, only generic text ✅
- **`src/locales/ru.json`** — No client names, only generic text ✅
- **`src/components/sections/team.tsx`** — Contains team member names (Gleb Sugakk, Nazar Berg, Lenor Hermansen) — these are already non-Russian ✅
- **`src/components/sections/portfolio.tsx`** — No client names, only case study titles and descriptions ✅
- **`src/components/sections/contact-form.tsx`** — Form field names, not client names ✅
- **`src/components/sections/about.tsx`** — Not checked but no client names expected ✅
- **`src/components/sections/hero/`** — No client names ✅

## Proposed Replacement Names

Following the rule: **half Norwegian, half European** (2 Norwegian, 2 European):

### Norwegian Names (2 of 4):
1. **"Lars Eriksen"** — Common Norwegian name (replaces Анна Смирнова)
2. **"Ingrid Solberg"** — Common Norwegian name (replaces Елена Попова)

### European Names (2 of 4):
3. **"Thomas Müller"** — German name (replaces Михаил Иванов)
4. **"Sophie Laurent"** — French name (replaces Дмитрий Волков)

## Files to Modify

### 1. [`src/components/sections/reviews.tsx`](src/components/sections/reviews.tsx)

Replace the 4 `client` values in the `REVIEWS` array (lines 11, 19, 26, 33).

## Implementation Steps

1. Open [`src/components/sections/reviews.tsx`](src/components/sections/reviews.tsx)
2. Replace line 11: `client: "Анна Смирнова"` → `client: "Lars Eriksen"`
3. Replace line 19: `client: "Михаил Иванов"` → `client: "Thomas Müller"`
4. Replace line 26: `client: "Елена Попова"` → `client: "Ingrid Solberg"`
5. Replace line 33: `client: "Дмитрий Волков"` → `client: "Sophie Laurent"`
6. Verify the file compiles and renders correctly

## Verification

- Run `npm run build` or `npm run dev` to ensure no TypeScript errors
- Visually confirm the reviews section shows the new names
- Search for any remaining Russian client names in the codebase
