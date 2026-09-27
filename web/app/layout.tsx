import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Citizens Lens — See your rights clearly",
  description:
    "Understand the Nigerian Constitution in plain language. Everyday questions, simple answers, original sources.",
};

const tabs = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/learn", label: "Learn" },
  { href: "/saved", label: "Saved" },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full">
        <div className="mx-auto min-h-screen max-w-[480px] border-x border-[#DDE3DE] bg-white">
          <header className="bg-[#0E7A3D] px-4 py-3 text-white">
            <p className="text-xl font-bold">Citizens Lens</p>
            <p className="text-[13px] opacity-90">See your rights clearly</p>
          </header>
          <nav aria-label="Primary" className="flex border-b border-[#DDE3DE]">
            {tabs.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="flex-1 py-2.5 text-center text-sm text-[#5C665E] hover:text-[#0A5C2E]"
              >
                {t.label}
              </Link>
            ))}
          </nav>
          <main className="px-4 pb-8">{children}</main>
          <footer className="border-t border-[#DDE3DE] px-4 py-4 text-[13px] text-[#5C665E]">
            Constitutional information, not legal advice. Always check the
            original provision.
          </footer>
        </div>
      </body>
    </html>
  );
}
