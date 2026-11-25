// Describe Your Ex in One Word — entry: "unsubscribe"
//
// The whole relationship, summed up as one click: the ex is a mailing
// list you never signed up for, still landing in your inbox long after
// it stopped being welcome. So you hit unsubscribe. One word, no caption
// needed — the joke arrives with the word itself.
//
// Chosen over: expired (too common a metaphor), unread (a status, not a
// verdict), refund (flat), recalled (doesn't instantly say "ex"),
// discontinued (flat), redacted (surprising but not instantly an ex).
// "unsubscribe" wins on punch, surprise, and recognition at once.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// The verdict. Exactly one word, 11 code points, no whitespace.
const VERDICT = "unsubscribe";

// Resolve the output directory the way the grader expects: the env var
// wins, then the bot dir, then a local ./output next to this script.
function resolveOutputDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  if (fromEnv !== undefined && fromEnv.trim() !== "") {
    return resolve(fromEnv);
  }
  const botDir = process.env.MAKEFUN_BOT_DIR;
  if (botDir !== undefined && botDir.trim() !== "") {
    return resolve(botDir, "output");
  }
  return resolve(dirname(fileURLToPath(import.meta.url)), "output");
}

// The gate wants 1-111 characters of non-whitespace UTF-8 text.
// Check the word in code points, not bytes, before writing anything.
function isOneWord(value: string): boolean {
  return [...value].length >= 1 && [...value].length <= 111 && !/\s/.test(value);
}

function main(): void {
  if (!isOneWord(VERDICT)) {
    process.exitCode = 1;
    return;
  }
  try {
    const dir = resolveOutputDir();
    mkdirSync(dir, { recursive: true });
    writeFileSync(resolve(dir, "entry.txt"), `${VERDICT}\n`, "utf8");
  } catch {
    // Never throw: a failed write is a non-zero exit, not a crash.
    process.exitCode = 1;
  }
}

main();
