import Link from "next/link";
import { popularQuestions, situations } from "./content/data";

export default function Home() {
  return (
    <div className="pt-4">
      <h1 className="text-[28px] font-extrabold leading-tight">
        Understand your rights in plain language
      </h1>
      <form action="/search" method="get" className="mt-3 flex gap-2">
        <input
          name="q"
          type="search"
          required
          minLength={3}
          placeholder="Ask, e.g. Can police arrest me without telling me why?"
          aria-label="Ask a constitutional question"
          className="min-h-[48px] flex-1 rounded-[10px] border-2 border-[#0E7A3D] px-3 text-base"
        />
        <button
          type="submit"
          className="min-h-[48px] rounded-[10px] bg-[#0E7A3D] px-5 text-base font-semibold text-white"
        >
          Ask
        </button>
      </form>

      <h2 className="mt-6 text-[13px] font-bold uppercase tracking-wider text-[#5C665E]">
        Explore by situation
      </h2>
      <div className="mt-2 flex flex-wrap gap-2">
        {situations.map((s) => (
          <Link
            key={s.slug}
            href="/explore"
            className="min-h-[44px] content-center rounded-full border border-[#DDE3DE] px-4 py-2 text-sm"
          >
            {s.title}
          </Link>
        ))}
      </div>

      <h2 className="mt-6 text-[13px] font-bold uppercase tracking-wider text-[#5C665E]">
        Popular questions
      </h2>
      <ul className="mt-2 space-y-2">
        {popularQuestions.map((p) => (
          <li
            key={p.slug}
            className="rounded-[10px] border border-[#DDE3DE] p-3"
          >
            <Link href={`/a/${p.slug}`} className="font-medium text-[#0A5C2E]">
              {p.q}
            </Link>
          </li>
        ))}
      </ul>

      <div className="disclaimer mt-6">
        <strong>I Need Help Now:</strong> if you are arrested or detained, see{" "}
        <Link href="/help-now" className="font-semibold text-[#0A5C2E]">
          urgent rights information
        </Link>
        . Information only — not legal advice.
      </div>
    </div>
  );
}
