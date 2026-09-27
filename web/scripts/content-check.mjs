// npm run content:check — every explanation must link to a real provision
// with a version, carry qualifications, and resolve its related links.
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "content");
const provisions = JSON.parse(readFileSync(join(root, "provisions.json"), "utf8"));
const explanations = JSON.parse(readFileSync(join(root, "explanations.json"), "utf8"));
const lessons = JSON.parse(readFileSync(join(root, "lessons.json"), "utf8"));
const meta = JSON.parse(readFileSync(join(root, "meta.json"), "utf8"));

const errors = [];
const provisionIds = new Set(provisions.map((p) => p.id));
const slugs = new Set(explanations.map((e) => e.slug));

for (const p of provisions) {
  if (!p.version || !p.status) errors.push(`provision ${p.id}: missing version/status`);
}
for (const e of explanations) {
  if (!provisionIds.has(e.provisionId))
    errors.push(`${e.slug}: unknown provisionId ${e.provisionId}`);
  if (!e.qualifications?.length)
    errors.push(`${e.slug}: missing qualifications`);
  if (!e.reviewedAt) errors.push(`${e.slug}: missing reviewedAt`);
  for (const r of e.relatedSlugs ?? [])
    if (!slugs.has(r)) errors.push(`${e.slug}: unknown relatedSlug ${r}`);
}
for (const q of meta.popularQuestions ?? [])
  if (!slugs.has(q.slug)) errors.push(`popularQuestion "${q.q}": unknown slug ${q.slug}`);
for (const s of meta.situations ?? []) {
  if (!s.blurb) errors.push(`situation ${s.slug}: missing blurb`);
  for (const a of s.answerSlugs ?? [])
    if (!slugs.has(a)) errors.push(`situation ${s.slug}: unknown answerSlug ${a}`);
}
for (const l of lessons ?? []) {
  if (!l.bodyMd) errors.push(`lesson ${l.slug}: missing bodyMd`);
  for (const a of l.answerSlugs ?? [])
    if (!slugs.has(a)) errors.push(`lesson ${l.slug}: unknown answerSlug ${a}`);
}

if (errors.length) {
  console.error(`content:check FAILED (${errors.length}):\n- ${errors.join("\n- ")}`);
  process.exit(1);
}
console.log(
  `content:check OK — ${provisions.length} provisions, ${explanations.length} explanations, ${lessons.length} lessons, ${meta.popularQuestions.length} popular questions.`
);
