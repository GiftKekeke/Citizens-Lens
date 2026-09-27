// npm test — search behaviour contract for Citizens Lens.
// Run with: node --test tests/
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const explanations = JSON.parse(
  readFileSync(join(root, "content", "explanations.json"), "utf8")
);

// Mirror of the matcher in app/content/data.ts (single source of behaviour).
function norm(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
function withinOneTypo(a, b) {
  if (a === b) return true;
  const m = a.length;
  const n = b.length;
  if (m < 4 || n < 4 || Math.abs(m - n) > 1) return false;
  if (m === n) {
    const diffs = [];
    for (let i = 0; i < m; i++) if (a[i] !== b[i]) diffs.push(i);
    if (diffs.length === 1) return true;
    if (
      diffs.length === 2 &&
      diffs[1] === diffs[0] + 1 &&
      a[diffs[0]] === b[diffs[1]] &&
      a[diffs[1]] === b[diffs[0]]
    )
      return true;
    return false;
  }
  const longer = m > n ? a : b;
  const shorter = m > n ? b : a;
  let i = 0;
  let j = 0;
  let skipped = false;
  while (i < longer.length && j < shorter.length) {
    if (longer[i] === shorter[j]) {
      i++;
      j++;
      continue;
    }
    if (skipped) return false;
    skipped = true;
    i++;
  }
  return true;
}
function search(query) {
  const STOP = new Set([
    "what", "does", "mean", "meaning", "example", "examples", "how",
    "can", "you", "your", "yours", "they", "them", "their", "there",
    "with", "from", "that", "this", "have", "has", "had", "will",
    "would", "should", "about", "into", "under", "over", "such",
    "than", "then", "also", "are", "was", "were", "been", "being",
  ]);
  const tokens = norm(query)
    .split(" ")
    .filter((t) => t.length >= 3 && !STOP.has(t));
  if (tokens.length === 0) return [];
  const scored = explanations.map((e) => {
    const hayWords = norm(
      `${e.question} ${e.shortAnswer} ${e.keywords.join(" ")}`
    )
      .split(" ")
      .filter((w) => w.length >= 3 && !STOP.has(w));
    let score = 0;
    for (const t of tokens) {
      if (t.length < 3) continue;
      for (const w of hayWords) {
        if (w.length < 3) continue;
        if (w === t) score += 3;
        else if (Math.min(w.length, t.length) >= 4 && (w.startsWith(t) || t.startsWith(w)))
          score += 2;
        else if (withinOneTypo(t, w)) score += 1;
      }
    }
    return { e, score };
  });
  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.e);
}

describe("search", () => {
  it("finds the arrest answer for a plain question", () => {
    const top = search("Can the police arrest me?")[0];
    assert.equal(top?.slug, "arrest-reasons");
  });
  it("tolerates a transposition typo (arerst)", () => {
    const top = search("arerst")[0];
    assert.equal(top?.slug, "arrest-reasons");
  });
  it("tolerates an insertion typo (pollice)", () => {
    const slugs = search("pollice").map((e) => e.slug);
    assert.ok(slugs.includes("arrest-reasons"));
  });
  it("ranks the arrest answer first for a double-typo query", () => {
    const top = search("arerst pollice")[0];
    assert.equal(top?.slug, "arrest-reasons");
  });
  it("matches everyday synonyms (protest -> assembly)", () => {
    const slugs = search("protest march").map((e) => e.slug);
    assert.ok(slugs.includes("peaceful-assembly"));
  });
  it("returns nothing for an empty query", () => {
    assert.deepEqual(search("   "), []);
  });
  it("returns nothing for unrelated queries (no hallucination path)", () => {
    assert.deepEqual(search("quantum physics exam"), []);
  });
  it("every explanation is reachable by at least one keyword", () => {
    for (const e of explanations) {
      const found = search(e.keywords[0]).map((x) => x.slug);
      assert.ok(
        found.includes(e.slug),
        `${e.slug} not reachable via keyword "${e.keywords[0]}"`
      );
    }
  });
});
