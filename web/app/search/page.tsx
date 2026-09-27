import Link from "next/link";
import { getProvision, searchExplanations } from "../content/data";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();
  const results = searchExplanations(query);

  return (
    <div className="pt-4">
      <h1 className="text-xl font-bold">Results</h1>
      <p className="text-[#5C665E]">{query ? `“${query}”` : "Type a question on the Home page."}</p>

      {query && results.length === 0 && (
        <div className="explain mt-4">
          <span className="tag">No confident answer</span>
          <p>
            Citizens Lens has no curated answer for this yet. Your question has
            been noted for the next content sprint. Try related topics instead:
          </p>
          <p className="mt-2">
            <Link href="/explore" className="font-semibold text-[#0A5C2E]">
              Browse situations
            </Link>
          </p>
        </div>
      )}

      <ul className="mt-3 space-y-3">
        {results.map((r) => {
          const provision = getProvision(r.provisionId);
          return (
            <li key={r.slug} className="rounded-[10px] border border-[#DDE3DE] p-3">
              <Link href={`/a/${r.slug}`} className="font-semibold text-[#0A5C2E]">
                {r.question}
              </Link>
              <p className="mt-1">{r.shortAnswer}</p>
              {provision && (
                <p className="mt-1 text-sm text-[#5C665E]">
                  {provision.section} · {provision.title}
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
