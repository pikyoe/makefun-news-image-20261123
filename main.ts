// News-image entry for make.fun: sum up 23 November's world news in one image.
//
// The finished front page is stored in this repository as entry.png. Its
// bytes are JPEG data under the .png name — the rules tell the two apart by
// the file's first bytes, not its extension. This program copies those exact
// bytes to the grader's output file. It is deterministic: every run writes
// the same bytes, and it needs no network access.
//
// Run locally with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const IMAGE_NAME = 'entry.png';

function sourceImage(): Buffer {
  const here = dirname(fileURLToPath(import.meta.url));
  return readFileSync(join(here, IMAGE_NAME));
}

function copyFrontPage(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
  mkdirSync(outDir, { recursive: true });
  const pixels = sourceImage();
  const target = join(outDir, IMAGE_NAME);
  writeFileSync(target, pixels);
  if (!existsSync(target)) {
    throw new Error(`failed to write ${target}`);
  }
}

copyFrontPage();
