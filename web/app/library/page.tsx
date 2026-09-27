import { provisions } from "../content/data";

export default function LibraryPage() {
  return (
    <div className="pt-4">
      <h1 className="text-xl font-bold">Constitution Library</h1>
      <p className="text-[#5C665E]">
        Browse the Constitution directly: Parts → Chapters → Sections (secondary
        experience; search is the main way in).
      </p>
      <ul className="mt-3 space-y-2">
        {provisions.map((p) => (
          <li key={p.id} className="rounded-[10px] border border-[#DDE3DE] p-3">
            <strong>
              {p.section} — {p.title}
            </strong>
            <p className="mt-1 text-sm italic">{p.text}</p>
            <p className="mt-1 text-sm text-[#5C665E]">
              {p.version} · {p.status}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
