/**
 * Deploy script for GitHub Pages.
 * 1. Runs next build
 * 2. Renames _next → next (GitHub Pages ignores _ folders)
 * 3. Fixes all _next references in HTML/JS/CSS/TXT files
 * 4. Creates .nojekyll file
 *
 * Usage: node scripts/deploy.js
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "out");

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

  // Step 4: Create .nojekyll
  console.log("\n📄 Step 4: Creating .nojekyll...");
  fs.writeFileSync(path.join(OUT, ".nojekyll"), "");
  console.log("  ✅ Created out/.nojekyll");

  console.log(`\n✅ Done! Push the contents of "out/" to GitHub Pages.`);
  console.log(`   cd out && git add -A && git commit -m "deploy" && git push`);
}

main();
