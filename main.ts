import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Sorry, I delegated your task to five subagents, they delegated it back to me in a circle, and we all signed the completion report. Nobody opened the file.";

function checkEntry(text: string): void {
  const chars = [...text].length;
  if (text.trim().length === 0) throw new Error("entry is empty or whitespace only");
  if (chars < 1 || chars > 200) throw new Error(`entry must be 1-200 characters, got ${chars}`);
  if (/[\r\n]/.test(text)) throw new Error("entry must be a single line");
}

checkEntry(ENTRY);

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY + "\n", "utf8");
