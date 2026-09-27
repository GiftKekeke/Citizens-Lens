import Link from "next/link";
import { popularQuestions, situations } from "../content/data";

export default function ExplorePage() {
  return (
    <div className="pt-4">
      <h1 className="text-xl font-bold">Explore by situation</h1>
      <p className="text-[#5C665E]">
        Pick a situation to see plain-language answers and the provisions
        behind them.
      </p>
      <div className="mt-3 grid grid-cols-1 gap-2">
        {situations.map((s) => (
          <Link
            key={s.slug}
            href={`/t/${s.slug}`}
            className="min-h-[48px] rounded-[10px] border border-[#DDE3DE] p-3"
          >
            <span className="font-semibold text-[#0A5C2E]">{s.title}</span>
            <span className="block text-sm text-[#5C665E]">
              {s.answerSlugs.length} answer{s.answerSlugs.length === 1 ? "" : "s"}
            </span>
          </Link>
        ))}
      </div>

      <h2 className="mt-6 text-[13px] font-bold uppercase tracking-wider text-[#5C665E]">
        Common questions
      </h2>
      <ul className="mt-2 space-y-2">
        {popularQuestions.map((q) => (
          <li key={q.slug} className="rounded-[10px] border border-[#DDE3DE] p-3">
            <Link href={`/a/${q.slug}`} className="font-medium text-[#0A5C2E]">
              {q.q}
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-sm text-[#5C665E]">
        Prefer the source text?{" "}
        <Link href="/library" className="font-semibold text-[#0A5C2E]">
          Browse the Constitution Library
        </Link>
        .
      </p>
    </div>
  );
}
