"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { searchExplanations } from "../content/data";

export default function SearchBox() {
  const [q, setQ] = useState("");
  const router = useRouter();
  const suggestions = useMemo(
    () => (q.trim().length >= 2 ? searchExplanations(q).slice(0, 5) : []),
    [q]
  );

  return (
    <div>
      <form
        className="mt-3 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (q.trim().length >= 3)
            router.push(`/search?q=${encodeURIComponent(q.trim())}`);
        }}
      >
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          type="search"
          required
          minLength={3}
          placeholder="Ask, e.g. Can police arrest me without telling me why?"
          aria-label="Ask a constitutional question"
          autoComplete="off"
          className="min-h-[48px] flex-1 rounded-[10px] border-2 border-[#0E7A3D] px-3 text-base"
        />
        <button
          type="submit"
          className="min-h-[48px] rounded-[10px] bg-[#0E7A3D] px-5 text-base font-semibold text-white"
        >
          Ask
        </button>
      </form>
      {suggestions.length > 0 && (
        <ul
          aria-label="Suggestions"
          className="mt-2 divide-y divide-[#DDE3DE] rounded-[10px] border border-[#DDE3DE]"
        >
          {suggestions.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/a/${s.slug}`}
                className="block min-h-[44px] content-center px-3 py-2 text-[#0A5C2E]"
              >
                {s.question}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
