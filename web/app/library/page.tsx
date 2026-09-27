import Link from "next/link";
import { answersForProvision, provisions } from "../content/data";

export default function LibraryPage() {
  const chapters = [...new Set(provisions.map((p) => p.chapter))];

  return (
    <div className="pt-4">
      <h1 className="text-xl font-bold">Constitution Library</h1>
      <p className="text-[#5C665E]">
        Browse the Constitution directly: chapters → sections. Search remains
        the main way in.
      </p>
      {chapters.map((chapter) => (
        <section key={chapter} className="mt-4">
          <h2 className="text-[13px] font-bold uppercase tracking-wider text-[#5C665E]">
            {chapter}
          </h2>
          <ul className="mt-2 space-y-2">
            {provisions
              .filter((p) => p.chapter === chapter)
              .map((p) => {
                const answers = answersForProvision(p.id);
                return (
                  <li
                    key={p.id}
                    className="rounded-[10px] border border-[#DDE3DE] p-3"
                  >
                    <strong>
                      {p.section} — {p.title}
                    </strong>
                    <p className="mt-1 text-sm italic">{p.text}</p>
                    <p className="mt-1 text-sm text-[#5C665E]">
                      {p.version} · {p.status}
                    </p>
                    {answers.length > 0 && (
                      <p className="mt-1 text-sm">
                        Explained in:{" "}
                        {answers.map((a, i) => (
                          <span key={a.slug}>
                            {i > 0 && " · "}
                            <Link
                              href={`/a/${a.slug}`}
                              className="font-semibold text-[#0A5C2E]"
                            >
                              {a.question}
                            </Link>
                          </span>
                        ))}
                      </p>
                    )}
                  </li>
                );
              })}
          </ul>
        </section>
      ))}
    </div>
  );
}
