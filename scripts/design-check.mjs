import { readdir, readFile } from 'node:fs/promises';
import { isDeepStrictEqual } from 'node:util';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { lint } from '@google/design.md/linter';
import { parseDocument } from 'yaml';

const root = fileURLToPath(new URL('../', import.meta.url));
const appRoot = path.join(root, 'apps');
const entries = (await readdir(appRoot, { withFileTypes: true }))
  .filter(entry => entry.isDirectory())
  .sort((left, right) => left.name.localeCompare(right.name));

/** Mirror all supported token blocks, preserving their original unresolved values. */
function tokenBlocks(markdown) {
  const chunks = [];
  const frontmatter = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (frontmatter) chunks.push(frontmatter[1]);
  const body = frontmatter ? markdown.slice(frontmatter[0].length) : markdown;
  for (const match of body.matchAll(/^```ya?ml\s*\r?\n([\s\S]*?)^```\s*$/gm)) chunks.push(match[1]);
  const merged = {};
  for (const chunk of chunks) {
    const document = parseDocument(chunk, { uniqueKeys: true });
    if (document.errors.length) throw new Error(document.errors.map(error => error.message).join('; '));
    const data = document.toJS();
    if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('A design token block must be a YAML mapping.');
    for (const [key, value] of Object.entries(data)) {
      if (Object.hasOwn(merged, key)) throw new Error(`Duplicate top-level token group: ${key}`);
      merged[key] = value;
    }
  }
  if (!chunks.length) throw new Error('No design tokens found in DESIGN.md.');
  return merged;
}

let totalErrors = 0;
let totalWarnings = 0;
let appCount = 0;
for (const entry of entries) {
  const appPath = path.join(appRoot, entry.name);
  try { await readFile(path.join(appPath, 'package.json'), 'utf8'); }
  catch (error) { if (error.code === 'ENOENT') continue; throw error; }
  appCount++;
  try {
    const [markdown, rawTokens] = await Promise.all([
      readFile(path.join(appPath, 'DESIGN.md'), 'utf8'),
      readFile(path.join(appPath, 'tokens.json'), 'utf8'),
    ]);
    const report = lint(markdown);
    const mirror = tokenBlocks(markdown);
    const tokens = JSON.parse(rawTokens);
    const matching = isDeepStrictEqual(mirror, tokens);
    const errors = report.summary.errors + (matching ? 0 : 1);
    totalErrors += errors;
    totalWarnings += report.summary.warnings;
    console.log(`${errors ? 'FAIL' : 'PASS'} ${entry.name}: ${report.summary.errors} spec errors, ${report.summary.warnings} warnings; tokens.json ${matching ? 'matches' : 'differs from'} DESIGN.md`);
    for (const finding of report.findings.filter(item => item.severity !== 'info')) {
      console.log(`  ${finding.severity}: ${finding.path ? `${finding.path}: ` : ''}${finding.message}`);
    }
    if (!matching) console.log('  error: Regenerate tokens.json from the complete DESIGN.md YAML token blocks.');
  } catch (error) {
    totalErrors++;
    console.log(`FAIL ${entry.name}: ${error.message}`);
  }
}
if (!appCount) {
  totalErrors++;
  console.error('No application packages found under apps/.');
}
console.log(`\nDesign check: ${appCount} apps, ${totalErrors} errors, ${totalWarnings} warnings.`);
process.exitCode = totalErrors ? 1 : 0;
