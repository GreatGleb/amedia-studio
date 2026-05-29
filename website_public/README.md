# amediå — Nordic Marketing Agency

High-end digital agency website built with [Next.js](https://nextjs.org) (static export).

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Deploy to GitHub Pages

The site is deployed to `https://greatgleb.github.io/amedia-studio/`.

### Build

```bash
npm run deploy
```

This will:
1. Build the project (`next build`)
2. Rename `_next` → `next` (GitHub Pages ignores `_`-prefixed folders)
3. Fix all `/_next/` references in HTML/JS/CSS files
4. Copy build output to repository root
5. Create `.nojekyll` file

### Push to GitHub

After building, commit and push:

```bash
git add -A
git commit -m "deploy"
git push
```

GitHub Pages will serve the already-pushed files directly from the repository root.

### GitHub Pages settings

One-time setup in repository Settings → Pages:
- **Source**: Deploy from a branch
- **Branch**: `main`, **folder**: `/` (root)
