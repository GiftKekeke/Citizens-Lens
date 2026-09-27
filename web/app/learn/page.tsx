import { lessons } from "../content/data";

export default function LearnPage() {
  return (
    <div className="pt-4">
      <h1 className="text-xl font-bold">Learn</h1>
      <h2 className="mt-4 font-semibold">Understand the Constitution</h2>
      <ul className="mt-2 space-y-2">
        {lessons
          .filter((l) => l.path === "basics")
          .map((l) => (
            <li key={l.slug} className="rounded-[10px] border border-[#DDE3DE] p-3">
              {l.order}. {l.title} <span className="text-sm text-[#5C665E]">(lesson content lands in Phase 4)</span>
            </li>
          ))}
      </ul>
      <h2 className="mt-4 font-semibold">Learn through real-life situations</h2>
      <ul className="mt-2 space-y-2">
        {lessons
          .filter((l) => l.path === "scenarios")
          .map((l) => (
            <li key={l.slug} className="rounded-[10px] border border-[#DDE3DE] p-3">
              {l.order}. {l.title} <span className="text-sm text-[#5C665E]">(lesson content lands in Phase 4)</span>
            </li>
          ))}
      </ul>
      <div className="meta mt-4">
        <span className="tag">Progress</span>
        Progress tracking (e.g. 4 of 10 lessons) arrives with Slice 3.
      </div>
    </div>
  );
}
