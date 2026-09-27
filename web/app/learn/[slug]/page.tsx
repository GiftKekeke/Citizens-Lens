import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import LessonComplete from "../../_components/LessonComplete";
import BookmarkButton from "../../_components/BookmarkButton";
import ShareButtons from "../../_components/ShareButtons";
import { getExplanation, getLesson, lessons } from "../../content/data";

export function generateStaticParams() {
  return lessons.map((l) => ({ slug: l.slug }));
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) notFound();

  const answers = lesson.answerSlugs
    .map((s) => getExplanation(s))
    .filter((e) => e !== undefined);

  return (
    <article className="pt-4">
      <p className="text-sm text-[#5C665E]">
        {lesson.path === "basics" ? "Understand the Constitution" : "Real-life situation"} · Lesson {lesson.order}
      </p>
      <h1 className="text-[22px] font-bold leading-snug">{lesson.title}</h1>
      <div className="mt-2 flex gap-2">
        <BookmarkButton type="lesson" slug={lesson.slug} />
        <ShareButtons />
      </div>

      <div className="explain">
        <span className="tag">Citizens Lens lesson</span>
        <div className="[&>h2]:mt-3 [&>h2]:text-lg [&>h2]:font-bold [&>p]:mt-2 [&>ul]:mt-2 [&>ul]:list-disc [&>ul]:pl-5">
          <ReactMarkdown>{lesson.bodyMd}</ReactMarkdown>
        </div>
      </div>

      {answers.length > 0 && (
        <>
          <h2 className="mt-4 text-[13px] font-bold uppercase tracking-wider text-[#5C665E]">
            Related answers
          </h2>
          <ul className="mt-2 space-y-2">
            {answers.map((a) => (
              <li key={a.slug} className="rounded-[10px] border border-[#DDE3DE] p-3">
                <Link href={`/a/${a.slug}`} className="font-semibold text-[#0A5C2E]">
                  {a.question}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}

      <div className="mt-4">
        <LessonComplete slug={lesson.slug} />
      </div>

      <div className="disclaimer">
        <strong>Note:</strong> constitutional information, not legal advice.
      </div>
    </article>
  );
}
