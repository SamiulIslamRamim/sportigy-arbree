#!/usr/bin/env node

/**
 * nexstruct cleanup — removes example/demo files and unused artifacts.
 *
 * Run:   npm run cleanup
 *
 * Each step asks for your permission before making any changes.
 */

import { existsSync, readFileSync, unlinkSync, rmSync, readdirSync, statSync, writeFileSync } from 'fs';
import { resolve, join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createInterface } from 'readline';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const rl = createInterface({ input: process.stdin, output: process.stdout });

function ask(query) {
  return new Promise((resolve) => {
    rl.question(query + ' (y/N) ', (answer) => {
      resolve(answer.toLowerCase().startsWith('y'));
    });
  });
}

function removeDir(dirPath) {
  if (existsSync(dirPath)) {
    rmSync(dirPath, { recursive: true, force: true });
    console.log('  ✗ Removed:', dirPath.replace(ROOT, '.'));
  }
}

function removeFile(filePath) {
  if (existsSync(filePath)) {
    unlinkSync(filePath);
    console.log('  ✗ Deleted:', filePath.replace(ROOT, '.'));
  }
}

/** Recursively find files matching a name */
function findFiles(dir, targetName, results = []) {
  if (!existsSync(dir)) return results;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (entry === targetName) results.push(full);
    if (statSync(full).isDirectory()) findFiles(full, targetName, results);
  }
  return results;
}

/** Remove empty parent directories upward */
function removeEmptyParents(dirPath) {
  let current = dirPath;
  while (current.startsWith(ROOT)) {
    try {
      const entries = readdirSync(current);
      if (entries.length === 0) {
        rmSync(current);
        console.log('  ✗ Removed empty dir:', current.replace(ROOT, '.'));
      } else break;
    } catch { break; }
    current = join(current, '..');
  }
}

async function cleanup() {
  console.log('
  🧹 Nexstruct Cleanup');
  console.log('  ─────────────────────');
  console.log('  This removes example/demo files and unused artifacts.');
  console.log('  Each step requires your permission.
');

  let nothingToDo = true;

  // ── 1. Examples directory ──
  const examplesDir = join(ROOT, 'src', 'app', 'examples');
  if (existsSync(examplesDir)) {
    nothingToDo = false;
    const yes = await ask('  Remove src/app/examples/ (all demo pages)?');
    if (yes) {
      removeDir(examplesDir);
      removeEmptyParents(examplesDir);
      console.log('  ✓ Examples directory removed
');
    }
  }

  // ── 2. Remove examples link from navbar ──
  const navbarPath = join(ROOT, 'src', 'components', 'common', 'navbar.component.tsx');
  if (existsSync(navbarPath)) {
    let navbar = readFileSync(navbarPath, 'utf-8');
    if (navbar.includes("'/examples'")) {
      nothingToDo = false;
      const yes = await ask('  Remove /examples link from the navbar?');
      if (yes) {
        navbar = navbar.replace(
          /const NAV_LINKS: Array<{ href: string; label: string }> = \[[\s\S]*?\];/,
          'const NAV_LINKS: Array<{ href: string; label: string }> = [\n];'
        );
        writeFileSync(navbarPath, navbar);
        console.log('  ✓ Examples link removed from navbar
');
      }
    }
  }

  // ── 3. COMPONENT_GUIDE.md files ──
  const guideFiles = findFiles(join(ROOT, 'src'), 'COMPONENT_GUIDE.md');
  if (guideFiles.length > 0) {
    nothingToDo = false;
    const yes = await ask('  Remove ' + guideFiles.length + ' COMPONENT_GUIDE.md file(s)?');
    if (yes) {
      for (const f of guideFiles) removeFile(f);
      // Clean up empty parent dirs
      for (const f of guideFiles) removeEmptyParents(join(f, '..'));
      console.log('  ✓ ' + guideFiles.length + ' guide file(s) removed
');
    }
  }

  // ── 4. Update package.json (remove dev-only deps if examples gone) ──
  const pkgPath = join(ROOT, 'package.json');
  if (existsSync(pkgPath)) {
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
    const examplesDepPrefixes = ['react-phone-input-2', 'input-otp', '@radix-ui/'];
    const foundDeps = Object.keys(pkg.dependencies || {}).filter(d =>
      examplesDepPrefixes.some(prefix => d.startsWith(prefix))
    );
    if (foundDeps.length > 0) {
      nothingToDo = false;
      const yes = await ask('  Remove ' + foundDeps.length + ' unused dependency/ies?
    - ' + foundDeps.join('
    - '));
      if (yes) {
        for (const dep of foundDeps) {
          delete pkg.dependencies[dep];
        }
        writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '
');
        console.log('  ✓ ' + foundDeps.length + ' unused dep(s) removed
');
      }
    }
  }

  // ── 5. Self-destruct ──
  const selfPath = join(ROOT, 'scripts', 'cleanup.mjs');
  if (existsSync(selfPath)) {
    nothingToDo = false;
    const yes = await ask('  Remove the cleanup script itself?');
    if (yes) {
      removeFile(selfPath);
      removeEmptyParents(join(ROOT, 'scripts'));
      // Remove cleanup from package.json scripts
      if (existsSync(pkgPath)) {
        const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
        if (pkg.scripts?.cleanup) {
          delete pkg.scripts.cleanup;
          writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '
');
        }
      }
      console.log('  ✓ Cleanup script removed
');
    }
  }

  if (nothingToDo) {
    console.log('  ✨ Nothing to clean up — everything is already tidy!
');
  } else {
    console.log('  ✓ Cleanup complete!
');
  }

  rl.close();
}

cleanup().catch((err) => {
  console.error('  ✗ Error:', err.message);
  process.exit(1);
});
