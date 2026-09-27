import Link from "next/link";
import { notFound } from "next/navigation";
import BookmarkButton from "../../_components/BookmarkButton";
import ShareButtons from "../../_components/ShareButtons";
import {
  getExplanation,
  getProvision,
  getSituation,
  lessonsForAnswers,
  situations,
} from "../../content/data";

export function generateStaticParams() {
  return situations.map((s) => ({ slug: s.slug }));
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const topic = getSituation(slug);
  if (!topic) notFound();

  const answers = topic.answerSlugs
    .map((s) => getExplanation(s))
    .filter((e) => e !== undefined);
  const provisionIds = [...new Set(answers.map((a) => a.provisionId))];
  const lessons = lessonsForAnswers(topic.answerSlugs);

  return (
    <article className="pt-4">
      <h1 className="text-[22px] font-bold leading-snug">{topic.title}</h1>
      <div className="mt-2 flex gap-2">
        <BookmarkButton type="topic" slug={topic.slug} />
        <ShareButtons />
      </div>

      <div className="explain">
        <span className="tag">Citizens Lens topic</span>
        <p>{topic.blurb}</p>
      </div>

      <h2 className="mt-4 text-[13px] font-bold uppercase tracking-wider text-[#5C665E]">
        Questions answered
      </h2>
      <ul className="mt-2 space-y-2">
        {answers.map((a) => (
          <li key={a.slug} className="rounded-[10px] border border-[#DDE3DE] p-3">
            <Link href={`/a/${a.slug}`} className="font-semibold text-[#0A5C2E]">
              {a.question}
            </Link>
            <p className="mt-1 text-[15px]">{a.shortAnswer}</p>
          </li>
        ))}
      </ul>

      <h2 className="mt-4 text-[13px] font-bold uppercase tracking-wider text-[#5C665E]">
        Constitutional provisions
      </h2>
      <ul className="mt-2 space-y-2">
        {provisionIds.map((id) => {
          const p = getProvision(id);
          return (
            p && (
              <li key={id} className="rounded-[10px] border border-[#DDE3DE] p-3 text-[15px]">
                <strong>
                  {p.section} — {p.title}
                </strong>
                <p className="text-sm text-[#5C665E]">
                  {p.version} · {p.status}
                </p>
              </li>
            )
          );
        })}
      </ul>

      <h2 className="mt-4 text-[13px] font-bold uppercase tracking-wider text-[#5C665E]">
        Learn more
      </h2>
      <ul className="mt-2 space-y-2">
        {lessons.map((l) => (
          <li key={l.slug} className="rounded-[10px] border border-[#DDE3DE] p-3">
            <Link href={`/learn/${l.slug}`} className="font-medium text-[#0A5C2E]">
              {l.title}
            </Link>
          </li>
        ))}
      </ul>

      <div className="disclaimer">
        <strong>Note:</strong> constitutional information, not legal advice.
      </div>
    </article>
  );
}
