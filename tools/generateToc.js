// ...existing code...
"use strict";

import fs from "fs";
import path from "path";
import Slugger from "github-slugger";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// try multiple possible markdown filenames
const possibleDirs = [
  path.join(__dirname, "..", "content"),
  path.join(__dirname, "..", "src", "content"),
];

const possibleNames = ["thereact.md", "React.md", "react.md", "Thereact.md"];

let mdPath = null;
for (const dir of possibleDirs) {
  for (const name of possibleNames) {
    const p = path.join(dir, name);
    if (fs.existsSync(p)) {
      mdPath = p;
      break;
    }
  }
  if (mdPath) break;
}

if (!mdPath) {
  const checked = possibleDirs
    .map((d) => possibleNames.map((n) => path.join(d, n)).join("\n"))
    .join("\n");
  console.error("No markdown file found. Checked:\n" + checked);
  process.exit(1);
}

const outDir = path.join(__dirname, "..", "src", "data");
const outPath = path.join(outDir, "thereact-toc.json");

const md = fs.readFileSync(mdPath, "utf8");
const regex = /^(#{1,6})\s+(.*)$/gm;
const headings = [];
const slugger = new Slugger();
let match;

const seenIds = new Set();
const skipTexts = [/^table of contents$/i]; // skip these headings

while ((match = regex.exec(md)) !== null) {
  const level = match[1].length;
  const text = match[2].trim();

  // skip explicit Table of Contents headings (case-insensitive)
  if (skipTexts.some((r) => r.test(text))) continue;

  const id = slugger.slug(text);

  // skip duplicate ids (if same heading text appears multiple times)
  if (seenIds.has(id)) continue;
  seenIds.add(id);

  headings.push({ level, text, id });
}

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(headings, null, 2), "utf8");

console.log("TOC written to", outPath);
