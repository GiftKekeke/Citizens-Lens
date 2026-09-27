import Link from "next/link";

const cards = [
  { title: "I've been arrested", slug: "arrest-reasons" },
  { title: "I'm being detained", slug: "arrest-reasons" },
  { title: "I want to protest peacefully", slug: "peaceful-assembly" },
  { title: "I have a court case", slug: "fair-hearing-meaning" },
];

export default function HelpNowPage() {
  return (
    <div className="pt-4">
      <h1 className="text-xl font-bold">I Need Help Now</h1>
      <p className="text-[#5C665E]">
        Relevant constitutional information for urgent situations.
      </p>
      <div className="mt-3 space-y-2">
        {cards.map((c) => (
          <Link
            key={c.title}
            href={`/a/${c.slug}`}
            className="block min-h-[48px] rounded-[10px] border border-[#DDE3DE] p-3 font-medium text-[#0A5C2E]"
          >
            {c.title}
          </Link>
        ))}
      </div>
      <div className="disclaimer">
        <strong>Important:</strong> this is constitutional information, not
        legal advice and not emergency help. Contact a lawyer or the
        appropriate authorities for your situation.
      </div>
    </div>
  );
}
