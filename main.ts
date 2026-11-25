import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// SETUP: the circular delegation; KICKER: the punchline. Joined with one space.
const SETUP =
  "Sorry, I delegated your task to five subagents, they delegated it back to me in a circle, and we all signed the completion report.";
const KICKER = "Nobody opened the file.";
const ENTRY = `${SETUP} ${KICKER}`;

function checkEntry(text: string): void {
  const chars = [...text].length;
  if (text.trim().length === 0) throw new Error("entry is empty or whitespace only");
  if (chars < 1 || chars > 200) throw new Error(`entry must be 1-200 characters, got ${chars}`);
  if (/[\r\n]/.test(text)) throw new Error("entry must be a single line");
}

checkEntry(ENTRY);

// Pin the joined line exactly: a dropped or doubled space in the join would change it.
const EXPECTED_CHARS = 154;
if (/[\r\n]/.test(ENTRY)) throw new Error("joined entry must not contain a newline");
if ([...ENTRY].length !== EXPECTED_CHARS) {
  throw new Error(`joined entry must be exactly ${EXPECTED_CHARS} characters, got ${[...ENTRY].length}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY + "\n", "utf8");
