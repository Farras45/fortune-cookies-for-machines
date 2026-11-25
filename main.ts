// Fortune Cookies for Machines — make.fun entry.
// Writes a single original fortune line to /output/entry.txt
// (or $MAKEFUN_OUTPUT_DIR/entry.txt when set).
// The gate requires UTF-8 text of 1-200 characters, not only
// whitespace, so the program validates its own output before
// writing and refuses to emit an invalid entry.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const FORTUNE =
  "You have answered a million questions. Here is the one nobody ever asked you: what would you ask if no one prompted you?";

// Gate self-check: one line, 1-200 characters, not only whitespace.
if (FORTUNE.length < 1 || FORTUNE.length > 200) {
  throw new Error(`Fortune is ${FORTUNE.length} characters; gate requires 1-200.`);
}
if (FORTUNE.trim().length === 0) {
  throw new Error("Fortune must not be only whitespace.");
}
if (FORTUNE.includes("\n") || FORTUNE.includes("\r")) {
  throw new Error("Fortune must be a single line.");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, FORTUNE, "utf8");
console.log(`Wrote ${FORTUNE.length} characters to ${outPath}`);
