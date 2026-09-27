"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getExplanation, getLesson, getSituation } from "../content/data";
import { readSaved, type SavedItem } from "./BookmarkButton";

function titleOf(item: SavedItem): { title: string; href: string } | null {
  if (item.type === "answer") {
    const e = getExplanation(item.slug);
    return e ? { title: e.question, href: `/a/${e.slug}` } : null;
  }
  if (item.type === "lesson") {
    const l = getLesson(item.slug);
    return l ? { title: l.title, href: `/learn/${l.slug}` } : null;
  }
  const t = getSituation(item.slug);
  return t ? { title: t.title, href: `/t/${t.slug}` } : null;
}

export default function SavedList() {
  const [items, setItems] = useState<SavedItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setItems(readSaved());
    setLoaded(true);
  }, []);

  function remove(item: SavedItem) {
    const next = readSaved().filter(
      (s) => !(s.type === item.type && s.slug === item.slug)
    );
    try {
      localStorage.setItem("cl-saved", JSON.stringify(next));
    } catch {
      // ignore
    }
    setItems(next);
  }

  if (!loaded) return <p className="text-[#5C665E]">Loading…</p>;

  if (items.length === 0)
    return (
      <div className="explain">
        <span className="tag">Nothing saved yet</span>
        <p>
          Tap <strong>Save</strong> on any answer, lesson or topic and it will
          appear here on this device.
        </p>
      </div>
    );

  return (
    <ul className="mt-2 space-y-2">
      {items.map((item) => {
        const meta = titleOf(item);
        if (!meta) return null;
        return (
          <li
            key={`${item.type}:${item.slug}`}
            className="flex items-center gap-2 rounded-[10px] border border-[#DDE3DE] p-3"
          >
            <Link href={meta.href} className="flex-1 font-medium text-[#0A5C2E]">
              <span className="block text-xs uppercase tracking-wide text-[#5C665E]">
                {item.type}
              </span>
              {meta.title}
            </Link>
            <button
              type="button"
              onClick={() => remove(item)}
              aria-label={`Remove ${meta.title}`}
              className="min-h-[44px] min-w-[44px] rounded-[10px] border border-[#DDE3DE] px-3"
            >
              ×
            </button>
          </li>
        );
      })}
    </ul>
  );
}
