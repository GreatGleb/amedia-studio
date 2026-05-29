# Responsive Adaptation Plan

**Goal:** Make the entire website fully responsive for mobile (320px–767px) and tablet (768px–1023px) viewports, while preserving the existing desktop experience (1024px+).

**Current State:** The site uses Tailwind's `md:` breakpoint (768px) as the primary responsive toggle. Many sections have partial mobile support but lack:
- A mobile hamburger menu in the header
- Proper touch interaction handling
- Consistent spacing/padding on small screens
- Mobile-optimized grid layouts
- GSAP scroll animation adjustments for mobile viewports

---

## 1. Header — Mobile Navigation

**File:** [`src/components/layout/header.tsx`](src/components/layout/header.tsx:1)

**Current behavior:**
- Navigation links are hidden via `hidden md:flex` — no mobile menu exists
- Logo and language switcher are visible on all sizes
- CTA button is hidden on mobile via `hidden md:flex`

**Required changes:**
1. Add a hamburger menu button (visible on mobile, hidden on `md:`)
2. Implement a full-screen overlay menu with animated entrance (Framer Motion)
3. Mobile menu should include all nav links + CTA button
4. Close menu on link click (scroll to section + close)
5. Close menu on backdrop click or Escape key
6. Prevent body scroll when menu is open
7. Keep language switcher in the header, move CTA into the mobile menu

**Breakpoints:**
- Mobile: hamburger visible, nav hidden
- Tablet+: existing horizontal nav

---

## 2. Hero Section — Mobile Layout

**File:** [`src/components/sections/hero/index.tsx`](src/components/sections/hero/index.tsx:1)

**Current behavior:**
- Title uses `text-4xl md:text-6xl lg:text-7xl` — reasonable but could be tighter on small phones
- Content width constrained by `lg:w-[65%] xl:w-[60%]` — on mobile it's full width (good)
- Padding: `pt-32 pb-24 md:pt-44 md:pb-32` — okay but verify on 320px screens
- CTA buttons use `flex-wrap` — good, they stack on small screens
- Video sources already have responsive `<source media="...">` tags — good

**Required changes:**
1. Reduce title to `text-3xl` on 320px screens (use Tailwind `max-sm:` or custom)
2. Reduce metric values to `text-xl` on mobile (currently `text-2xl md:text-4xl`)
3. Ensure CTA buttons have adequate touch targets (min 44px height) — currently `py-4` is ~16px padding, verify
4. The scroll-snap wheel/touch handler already has touch support — verify it works on mobile

**Breakpoints:**
- `max-sm:` (max 639px): smaller title, tighter spacing
- `sm:` (640px+): current mobile styles
- `md:` (768px+): current tablet/desktop styles

---

## 3. Services Sequence — Mobile GSAP Behavior

**File:** [`src/components/sections/hero/services-sequence.tsx`](src/components/sections/hero/services-sequence.tsx:1)

**Current behavior:**
- Sticky header offset: `top-[80px] md:top-[88px]` — responsive
- Section height: `minHeight: "450vh"` — very tall for scroll animation
- Canvas starts at 50% width, shrinks to 20% on scroll
- Chips start centered, move to left column
- Title starts centered, moves to top-left

**Required changes:**
1. On mobile, the canvas should be smaller initially (maybe 40% width) or hidden entirely
2. Chips should stack vertically with full width on mobile (currently `w-full md:w-[75%] lg:w-[55%]`)
3. Title should use smaller font on mobile (`text-2xl` instead of `text-4xl md:text-6xl`)
4. GSAP animation parameters need mobile-specific values:
   - `start: () => `top ${window.innerWidth >= 768 ? 88 : 80}px`` — already responsive
   - Canvas width animation: use 40% on mobile instead of 20%
   - Title position: less extreme movement on mobile
5. Description text should be full width on mobile (currently `max-w-md`)
6. Chip padding should reduce on mobile (`px-4 py-2.5` instead of `px-7 py-3.5`)
7. The "Stage 04" label position needs adjustment on mobile

**Key consideration:** GSAP's `ScrollTrigger` recalculates on resize, but the animation values are hardcoded. Need to make them dynamic based on viewport width.

**Approach:** Use `window.innerWidth` checks inside the GSAP timeline construction, or use a responsive state variable that triggers timeline rebuild.

---

## 4. About Section — Mobile Grid

**File:** [`src/components/sections/about.tsx`](src/components/sections/about.tsx:1)

**Current behavior:**
- Grid: `grid-cols-1 lg:grid-cols-2` — stacks on mobile (good)
- Right column: `grid-cols-1 sm:grid-cols-2` — already responsive
- Stats cards: `col-span-1` — good
- Image card: `col-span-1 sm:col-span-2` — good
- Features inside image card: `flex-col sm:flex-row` — stacks on mobile (good)
- Title: `text-5xl md:text-7xl` — reasonable
- Body text: `text-xl md:text-3xl` — could be smaller on mobile

**Required changes:**
1. Reduce body text to `text-lg` on mobile
2. Reduce stat values to `text-4xl` on mobile (currently `text-5xl md:text-6xl`)
3. Reduce padding in stat cards from `p-8` to `p-6` on mobile
4. Ensure the background glow doesn't cause overflow on mobile
5. Features section: reduce icon sizes on mobile (`w-6 h-6` instead of `w-8 h-8`)

---

## 5. ROI Calculator — Mobile Stacking

**File:** [`src/components/sections/roi-calculator.tsx`](src/components/sections/roi-calculator.tsx:1)

**Current behavior:**
- Grid: `grid-cols-1 lg:grid-cols-2` — stacks on mobile (good)
- Result card: `aspect-square lg:aspect-auto min-h-[500px]` — `aspect-square` may be too tall on mobile
- Revenue value: `text-6xl md:text-7xl` — reasonable
- Sliders are full width — good

**Required changes:**
1. Remove `aspect-square` on mobile (use `min-h-[400px]` or auto height)
2. Reduce result card padding from `p-12` to `p-8` on mobile
3. Reduce revenue text to `text-5xl` on mobile
4. Ensure range inputs have adequate touch target size (currently `h-1` — very thin, increase to `h-2` on mobile)
5. The "Audit" button should be full width on mobile

---

## 6. Portfolio — Mobile Bento Grid + Modal

**File:** [`src/components/sections/portfolio.tsx`](src/components/sections/portfolio.tsx:1)

**Current behavior:**
- Grid: `grid-cols-1 md:grid-cols-2 xl:grid-cols-3` — single column on mobile (good)
- Cards have `minHeight: '340px'` — reasonable
- Modal opens with `position: fixed; top: 100px; left: 5%; width: 90%; height: calc(100vh - 140px)` — needs mobile adjustment
- Modal content uses `flex-col lg:flex-row` — stacks on mobile (good)
- Media sections inside modal have `min-h-[400px]` — too tall on mobile

**Required changes:**
1. Modal on mobile: `top: 60px; left: 0; width: 100%; height: calc(100vh - 60px)` — full screen
2. Modal close button: reduce from `w-14 h-14` to `w-10 h-10` on mobile, adjust position
3. Media sections inside modal: reduce `min-h-[400px]` to `min-h-[250px]` on mobile
4. Card padding: reduce from `p-8 md:p-10` to `p-6` on mobile
5. Card title: reduce from `text-2xl md:text-3xl lg:text-4xl` to `text-xl` on mobile
6. Case title in modal: reduce from `text-3xl` to `text-2xl` on mobile
7. Metric card padding: reduce from `p-8` to `p-6` on mobile
8. CTA button in modal: full width on mobile
9. Section padding: `px-6 md:px-12 lg:px-24` — already responsive
10. Title: `text-5xl md:text-7xl` — reduce to `text-4xl` on mobile

---

## 7. Team Section — Mobile Vertical Stacking

**File:** [`src/components/sections/team.tsx`](src/components/sections/team.tsx:1)

**Current behavior:**
- Layout: `flex-col md:flex-row` — stacks on mobile (good)
- Container: `h-[800px] md:h-auto md:items-stretch` — `h-[800px]` on mobile is very tall
- Member cards: `min-h-[200px]` — reasonable
- Image container: `h-[200px] md:h-[300px]` — good
- Content area: `min-h-[120px] md:min-h-[160px]` — good

**Required changes:**
1. Remove `h-[800px]` on mobile — let content determine height
2. Reduce gap between cards from `gap-4` to `gap-3` on mobile
3. Reduce card padding from `p-8` to `p-6` on mobile
4. Reduce role title from `text-2xl md:text-4xl` to `text-xl` on mobile
5. Reduce name from `text-2xl` to `text-xl` on mobile
6. Reduce description from `text-base md:text-lg` to `text-sm` on mobile
7. Section title: `text-4xl md:text-5xl` — reduce to `text-3xl` on mobile

---

## 8. Reviews — Mobile Grid

**File:** [`src/components/sections/reviews.tsx`](src/components/sections/reviews.tsx:1)

**Current behavior:**
- Grid: `grid-cols-1 md:grid-cols-3` — single column on mobile (good)
- Cards use `md:col-span-2` for some — these become `col-span-1` on mobile automatically
- Card padding: `p-8 md:p-10` — reasonable
- Quote icon: `w-10 h-10` — could be smaller on mobile

**Required changes:**
1. Reduce card padding to `p-6` on mobile
2. Reduce quote icon to `w-8 h-8` on mobile
3. Reduce review text: `text-lg md:text-xl` for normal, `text-2xl md:text-3xl` for large — add `max-sm:` overrides
4. Section title: `text-4xl md:text-5xl` — reduce to `text-3xl` on mobile
5. Subtitle: `text-xl` — reduce to `text-base` on mobile

---

## 9. Contact Form — Mobile Layout

**File:** [`src/components/sections/contact-form.tsx`](src/components/sections/contact-form.tsx:1)

**Current behavior:**
- Form card: `p-10 md:p-16` — reduce on mobile
- Title: `text-5xl md:text-7xl` — reduce on mobile
- Question text: `text-3xl md:text-4xl` — reduce on mobile
- Option buttons: `p-8` with `text-xl` — reduce on mobile
- Options grid: `grid-cols-1 md:grid-cols-2` — single column on mobile (good)
- Input fields: `p-6 text-xl` — reduce on mobile
- Submit/Back buttons: `px-12 py-6 text-xl` — reduce on mobile
- Button layout: `flex-col sm:flex-row` — stacks on mobile (good)

**Required changes:**
1. Form card padding: `p-6 md:p-10 md:p-16`
2. Title: `text-4xl md:text-5xl md:text-7xl`
3. Question text: `text-2xl md:text-3xl md:text-4xl`
4. Option buttons: `p-6 text-lg` on mobile
5. Input fields: `p-4 text-lg` on mobile
6. Submit/Back buttons: `px-8 py-4 text-lg` on mobile
7. Progress dots: keep as-is, they're already small
8. Success state: reduce icon from `w-28 h-28` to `w-20 h-20` on mobile

---

## 10. Footer — Mobile Column Stacking

**File:** [`src/components/layout/footer.tsx`](src/components/layout/footer.tsx:1)

**Current behavior:**
- Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4` — single column on mobile (good)
- Gap: `gap-12 lg:gap-8` — could be tighter on mobile
- Bottom bar: `flex-col md:flex-row` — stacks on mobile (good)

**Required changes:**
1. Reduce gap to `gap-8` on mobile
2. Reduce section padding from `py-16` to `py-12` on mobile
3. Reduce brand text from `text-3xl` to `text-2xl` on mobile
4. Ensure link touch targets are adequate (min 44px height for tap targets)

---

## 11. Global CSS & Shared Utilities

**File:** [`src/app/globals.css`](src/app/globals.css:1)

**Current behavior:**
- `overflow-x: hidden` on body — prevents horizontal scroll (good)
- Lenis smooth scroll helpers — already in place
- No custom responsive breakpoints defined

**Required changes:**
1. Add touch-friendly focus styles for mobile (remove `outline-none` on interactive elements, or add visible focus rings)
2. Ensure `-webkit-tap-highlight-color` is set for mobile tap feedback
3. Consider adding `overscroll-behavior: none` on mobile to prevent pull-to-refresh interference with the scroll animations
4. Add `touch-action: manipulation` on interactive elements to eliminate 300ms tap delay

---

## 12. Shared UI Components

### ScrollDownArrow
**File:** [`src/components/ui/scroll-down-arrow.tsx`](src/components/ui/scroll-down-arrow.tsx:1)
- Already responsive — uses absolute positioning
- Touch target size: 32x32px icon — consider increasing tap area with padding

### Canvas/Sequence Hook
**File:** [`src/components/sections/hero/use-hero-sequence.ts`](src/components/sections/hero/use-hero-sequence.ts:1)
- Canvas resize handler already listens to `window.resize` — good
- No changes needed

---

## Implementation Order

1. **Global CSS** — base responsive utilities and touch support
2. **Header** — mobile hamburger menu (most visible change)
3. **Hero** — typography and spacing adjustments
4. **Services Sequence** — GSAP mobile parameter adjustments
5. **About** — grid and typography adjustments
6. **ROI Calculator** — mobile layout adjustments
7. **Portfolio** — mobile bento grid and modal
8. **Team** — vertical stacking adjustments
9. **Reviews** — typography and spacing
10. **Contact Form** — mobile form layout
11. **Footer** — spacing adjustments

---

## Testing Checklist

- [ ] 320px width (small phones like iPhone SE)
- [ ] 375px width (iPhone 12/13/14)
- [ ] 414px width (iPhone Plus/Max)
- [ ] 768px width (iPad portrait)
- [ ] 1024px width (iPad landscape)
- [ ] Touch interactions on all interactive elements
- [ ] GSAP scroll animations work correctly on mobile
- [ ] No horizontal overflow on any viewport
- [ ] Text is readable without zooming
- [ ] All buttons/links have adequate touch targets (min 44x44px)
- [ ] Language switcher works on mobile
- [ ] Portfolio modal works on mobile (open/close/scroll)
- [ ] Contact form multi-step works on mobile
- [ ] Lenis smooth scroll doesn't break on mobile
