import Link from "next/link";
import LearnProgress from "../_components/LearnProgress";
import { lessons } from "../content/data";

export default function LearnPage() {
  const basics = lessons.filter((l) => l.path === "basics").sort((a, b) => a.order - b.order);
  const scenarios = lessons.filter((l) => l.path === "scenarios").sort((a, b) => a.order - b.order);

  return (
    <div className="pt-4">
      <h1 className="text-xl font-bold">Learn</h1>
      <div className="mt-3">
        <LearnProgress lessons={lessons} />
      </div>

      <h2 className="mt-4 font-semibold">Understand the Constitution</h2>
      <ul className="mt-2 space-y-2">
        {basics.map((l) => (
          <li key={l.slug} className="rounded-[10px] border border-[#DDE3DE] p-3">
            <Link href={`/learn/${l.slug}`} className="font-medium text-[#0A5C2E]">
              {l.order}. {l.title}
            </Link>
          </li>
        ))}
      </ul>

      <h2 className="mt-4 font-semibold">Learn through real-life situations</h2>
      <ul className="mt-2 space-y-2">
        {scenarios.map((l) => (
          <li key={l.slug} className="rounded-[10px] border border-[#DDE3DE] p-3">
            <Link href={`/learn/${l.slug}`} className="font-medium text-[#0A5C2E]">
              {l.order}. {l.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
