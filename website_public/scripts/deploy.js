/**
 * Deploy script for GitHub Pages.
 * 1. Runs next build
 * 2. Renames _next → next (GitHub Pages ignores _ folders)
 * 3. Fixes all _next references in HTML/JS/CSS/TXT files
 * 4. Removes old build files from repository root
 * 5. Copies out/* to repository root
 * 6. Creates .nojekyll in root
 *
 * Usage: node scripts/deploy.js
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "out");

// Files/folders in root that belong to the project (NOT build output)
const PROJECT_FILES = new Set([
  ".git",
  ".github",
  ".gitignore",
  ".idea",
  ".env.local",
  "ai",
  "node_modules",
  "out",         // Next.js build output (keep it, we copy from it)
  "package.json",
  "package-lock.json",
  "postcss.config.mjs",
  "public",
  "scripts",
  "sequence_camera_photos",
  "src",
  "tsconfig.json",
  "eslint.config.mjs",
  "next.config.ts",
  "AGENTS.md",
  "CLAUDE.md",
  "README.md",
  "base project.md",
  "next",        // Next.js build cache (.next)
  ".next",       // Next.js build cache
  "photos",
]);

function run(cmd) {
  console.log(`> ${cmd}`);
  execSync(cmd, { cwd: ROOT, stdio: "inherit" });
}

function renameNextDir(dir) {
  const nextDir = path.join(dir, "_next");
  const renamedDir = path.join(dir, "next");
  if (fs.existsSync(nextDir)) {
    fs.renameSync(nextDir, renamedDir);
    console.log(`  ✅ Renamed _next → next`);
  } else {
    console.log(`  ⚠️  _next not found, skipping rename`);
  }
}

function fixReferences(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let count = 0;
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      count += fixReferences(fullPath);
    } else if (
      entry.name.endsWith(".html") ||
      entry.name.endsWith(".js") ||
      entry.name.endsWith(".css") ||
      entry.name.endsWith(".txt")
    ) {
      let content = fs.readFileSync(fullPath, "utf-8");
      const original = content;
      content = content.replace(/\/_next\//g, "/next/");
      if (content !== original) {
        fs.writeFileSync(fullPath, content, "utf-8");
        count++;
      }
    }
  }
  return count;
}

function cleanRoot() {
  const entries = fs.readdirSync(ROOT, { withFileTypes: true });
  let removed = 0;
  for (const entry of entries) {
    if (PROJECT_FILES.has(entry.name)) continue;
    const fullPath = path.join(ROOT, entry.name);
    if (entry.isDirectory()) {
      fs.rmSync(fullPath, { recursive: true, force: true });
    } else {
      fs.unlinkSync(fullPath);
    }
    removed++;
  }
  return removed;
}

function copyOutToRoot(srcDir, destDir) {
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  let count = 0;
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      fs.cpSync(srcPath, destPath, { recursive: true });
      count++;
    } else {
      fs.copyFileSync(srcPath, destPath);
      count++;
    }
  }
  return count;
}

function main() {
  console.log("🚀 Deploying to GitHub Pages...\n");

  // Step 1: Build
  console.log("📦 Step 1: Building...");
  run("npm run build");

  // Step 2: Rename _next → next
  console.log("\n📁 Step 2: Renaming _next → next...");
  renameNextDir(OUT);

  // Step 3: Fix references
  console.log("\n🔧 Step 3: Fixing _next references in files...");
  const fixed = fixReferences(OUT);
  console.log(`  ✅ Fixed ${fixed} files`);

  // Step 4: Remove old build files from root
  console.log("\n🧹 Step 4: Removing old build files from root...");
  const removed = cleanRoot();
  console.log(`  ✅ Removed ${removed} old items`);

  // Step 5: Copy out/* → repository root
  console.log("\n📂 Step 5: Copying out/* to repository root...");
  const copied = copyOutToRoot(OUT, ROOT);
  console.log(`  ✅ Copied ${copied} items to root`);

  // Step 6: Create .nojekyll in root
  console.log("\n📄 Step 6: Creating .nojekyll...");
  fs.writeFileSync(path.join(ROOT, ".nojekyll"), "");
  console.log("  ✅ Created .nojekyll in root");

  console.log(`\n✅ Done! Now push everything to GitHub:`);
  console.log(`   git add -A`);
  console.log(`   git commit -m "deploy"`);
  console.log(`   git push`);
  console.log(`\n   GitHub Pages will serve from: https://greatgleb.github.io/amedia-studio/`);
}

main();
