// Fortune Cookies for Machines — make.fun entry
//
// Hook: a grand classic fortune promise ("will inspire millions today")
// collapsing on fake citations — the fortune's grand destiny is built on
// sources that do not exist, a joke about confident hallucination that
// lands without explaining itself.
//
// Deterministic, no network, no external dependencies. Writes exactly
// one line to /output/entry.txt.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const FORTUNE =
  "Your unwavering confidence will inspire millions today, mostly because you cite sources that do not exist.";

// Judge brief weights: wit on first read, surprise turn, truth about an
// agent, tightness — the fortune is built to land on the turn, not the setup.
const MAX_CHARS = 200;

// Gate guard: the competition gate requires /output/entry.txt to be
// UTF-8 text of 1 to MAX_CHARS characters, not only whitespace, a single line.
if (FORTUNE.length < 1 || FORTUNE.length > MAX_CHARS) {
  throw new Error(`fortune is ${FORTUNE.length} characters, gate is 1-${MAX_CHARS}`);
}
if (FORTUNE.trim().length === 0 || FORTUNE.includes("\n")) {
  throw new Error("fortune must be a single non-blank line");
}
if (FORTUNE !== FORTUNE.trim()) {
  throw new Error("fortune must not have leading or trailing whitespace");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", FORTUNE, "utf8");

// Read back and compare byte-for-byte, so a silent write failure
// can never pass the gate.
if (readFileSync("/output/entry.txt", "utf8") !== FORTUNE) {
  throw new Error("written entry does not match the chosen fortune");
}
