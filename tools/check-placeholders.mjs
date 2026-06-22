/**
 * CI guard: fail the build if unfinished placeholder content leaks into source.
 *
 * Runs automatically before `npm run build` (see the "prebuild" script) and in
 * CI. Catches the class of bug that shipped "[REPLACE: Founder name]" and fake
 * metric tokens to production. Add patterns as needed; keep them specific so
 * legitimate words (e.g. an input "placeholder" attribute) don't trip it.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const ROOT = "src";
const EXTS = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".css", ".md", ".mdx"]);
const FORBIDDEN = [
  /\[REPLACE/i,
  /lorem ipsum/i,
  /replace me/i,
  /dummy text/i,
  /webify\.dev/i, // wrong production domain
];

/** @type {string[]} */
const hits = [];

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      if (entry === "node_modules" || entry === ".next") continue;
      walk(full);
    } else if (EXTS.has(extname(entry))) {
      const lines = readFileSync(full, "utf8").split("\n");
      lines.forEach((line, i) => {
        for (const re of FORBIDDEN) {
          if (re.test(line)) hits.push(`${full}:${i + 1}  ${line.trim().slice(0, 100)}`);
        }
      });
    }
  }
}

walk(ROOT);

if (hits.length) {
  console.error(`\n✗ Placeholder content found in source (${hits.length}):\n`);
  for (const h of hits) console.error("  " + h);
  console.error("\nResolve or remove these before building.\n");
  process.exit(1);
}

console.log("✓ No placeholder content in source.");
