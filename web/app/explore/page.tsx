import Link from "next/link";
import { popularQuestions, provisions, situations } from "../content/data";

export default function ExplorePage() {
  return (
    <div className="pt-4">
      <h1 className="text-xl font-bold">Explore by situation</h1>
      <div className="mt-3 flex flex-wrap gap-2">
        {situations.map((s) => (
          <span
            key={s.slug}
            className="min-h-[44px] content-center rounded-full border border-[#DDE3DE] px-4 py-2 text-sm"
          >
            {s.title}
          </span>
        ))}
      </div>
      <h2 className="mt-6 text-[13px] font-bold uppercase tracking-wider text-[#5C665E]">
        Provisions covered so far
      </h2>
      <ul className="mt-2 space-y-2">
        {provisions.map((p) => (
          <li key={p.id} className="rounded-[10px] border border-[#DDE3DE] p-3">
            <strong>
              {p.section} — {p.title}
            </strong>
            <p className="text-sm text-[#5C665E]">{p.version}</p>
          </li>
        ))}
      </ul>
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
    </div>
  );
}
