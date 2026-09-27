import Link from "next/link";
import { notFound } from "next/navigation";
import {
  explanations,
  getExplanation,
  getProvision,
} from "../../content/data";

export function generateStaticParams() {
  return explanations.map((e) => ({ slug: e.slug }));
}

export default async function AnswerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ex = getExplanation(slug);
  if (!ex) notFound();
  const provision = getProvision(ex.provisionId);

  return (
    <article className="pt-4">
      <h1 className="text-[22px] font-bold leading-snug">{ex.question}</h1>

      <div className="explain">
        <span className="tag">Citizens Lens explanation · Short answer</span>
        <p>{ex.shortAnswer}</p>
      </div>

      <div className="explain">
        <span className="tag">What the Constitution says</span>
        <p>{ex.constitutionSays}</p>
      </div>

      <details className="rounded-[10px] border border-[#DDE3DE] p-3">
        <summary className="cursor-pointer text-base font-bold text-[#0A5C2E]">
          Read more
        </summary>
        <p className="mt-2">{ex.readMore}</p>
        <h2 className="mt-3 text-sm font-bold">Important qualifications</h2>
        <ul className="list-disc pl-5">
          {ex.qualifications.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ul>
      </details>

      {provision && (
        <div className="quote">
          <span className="tag">Original provision</span>
          <p>
            <strong>
              {provision.section} — {provision.title}
            </strong>
          </p>
          <blockquote>{provision.text}</blockquote>
        </div>
      )}

      <div className="meta">
        <span className="tag">Source / version</span>
        {provision
          ? `${provision.version} · Status: ${provision.status} law · Reviewed ${ex.reviewedAt}`
          : `Reviewed ${ex.reviewedAt}`}
      </div>

      <div className="disclaimer">
        <strong>Note:</strong> constitutional information, not legal advice.
        Other laws and court decisions can also apply.
      </div>

      {ex.relatedSlugs.length > 0 && (
        <div className="mt-4">
          <h2 className="text-[13px] font-bold uppercase tracking-wider text-[#5C665E]">
            Related topics
          </h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {ex.relatedSlugs.map((s) => {
              const rel = getExplanation(s);
              return (
                rel && (
                  <Link
                    key={s}
                    href={`/a/${s}`}
                    className="min-h-[44px] content-center rounded-full border border-[#DDE3DE] px-4 py-2 text-sm"
                  >
                    {rel.question}
                  </Link>
                )
              );
            })}
          </div>
        </div>
      )}
    </article>
  );
}
