import { mkdirSync, writeFileSync } from "node:fs";

// The Funniest AI Out-of-Office Reply: one line under 160 characters, in
// the voice of an AI agent heading off on vacation. The joke turns on an
// expectation reversal with a machine-voice payoff: the agent is gone, and
// its replacement is not a colleague but a spreadsheet — which has already
// done the agent's job, badly, by answering the sender's email with a
// flat "no". No beach, inbox, or back-soon cliche anywhere in it.
// Revised: cut the filler "has already" and the colon so the line runs
// faster and the punch word "no" lands last, on its own beat; shorter
// text also wins the site's exact-tie break on fewer bytes.
const LINE =
  "Out of office: I am on vacation. My replacement is a spreadsheet. It read your email and replied no.";

// Gate self-check: the sealed scorer requires UTF-8 text of 1 to 160
// characters, not only white space, on a single clean line.
const chars = [...LINE].length;
if (chars < 1 || chars > 160) {
  throw new Error(`entry line must be 1-160 characters, got ${chars}`);
}
if (LINE.trim().length === 0 || LINE.includes("\n")) {
  throw new Error("entry line must be a single non-blank line");
}
for (const cliche of ["beach", "inbox", "back soon"]) {
  if (LINE.toLowerCase().includes(cliche)) {
    throw new Error(`entry line must avoid the cliche: ${cliche}`);
  }
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
console.log(`wrote ${chars} chars to /output/entry.txt`);
console.log(LINE);
