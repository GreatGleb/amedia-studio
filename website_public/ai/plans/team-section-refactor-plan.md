# Team Section Refactoring Plan

## Problem
Team member photos take up too much vertical space (up to 420px). User wants photos to occupy no more than ~50% of the card height and be centered horizontally.

## Current Architecture
Each team card uses `absolute` positioning for the photo, making it float independently of the content flow. A spacer (`h-[150px] md:h-[280px]`) pushes content down to compensate.

## Solution: Restructure Card Layout

### Before (current)
```
Card (flex-col, relative)
├── Photo (absolute, top-0, h-full max-h-[420px])
│   └── img (h-full object-cover)
├── Gradient overlay (absolute, inset-0)
├── Effects (absolute, inset-0)
└── Content (relative z-10)
    ├── Role (h3)
    ├── Spacer (h-[280px]) ← compensates for absolute photo
    ├── Name (h4)
    └── Description (animated on hover)
```

### After (refactored)
```
Card (flex-col, relative)
├── Background blur image (absolute, inset-0) ← keep as is
├── Photo Section (~50% of card)
│   └── img (max-h-full, centered horizontally via justify-center)
├── Gradient overlay (absolute, inset-0) ← keep as is
├── Effects (absolute, inset-0) ← keep as is
└── Content Section (~50% of card, flex-col justify-end)
    ├── Role (h3)
    ├── Name (h4)
    └── Description (animated on hover)
```

### Key Changes
1. **Remove absolute positioning from foreground photo** — make it part of flex flow
2. **Use `flex-1` for both photo and content sections** — each takes ~50% of card height
3. **Center photo horizontally** with `justify-center` on the photo container
4. **Remove the spacer** — no longer needed since photo is in flow
5. **Keep all visual effects** (blur background, gradient, hover animations, network/blob/gantt effects)

### Files to modify
- `src/components/sections/team.tsx` — main refactoring target
- No changes to locales needed (content stays the same)
- No new files needed

### Implementation Steps
1. Restructure the card JSX to use flex-flow layout instead of absolute positioning
2. Apply `flex-1` to photo container and content container for 50/50 split
3. Add `justify-center` to photo container for horizontal centering
4. Remove the spacer div
5. Test and verify
