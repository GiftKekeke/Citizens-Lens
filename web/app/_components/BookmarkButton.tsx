"use client";

import { useEffect, useState } from "react";

export type SavedItem = { type: "answer" | "lesson" | "topic"; slug: string };

const KEY = "cl-saved";

export function readSaved(): SavedItem[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

export default function BookmarkButton({
  type,
  slug,
}: {
  type: SavedItem["type"];
  slug: string;
}) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(readSaved().some((s) => s.type === type && s.slug === slug));
  }, [type, slug]);

  function toggle() {
    const current = readSaved();
    const next = current.some((s) => s.type === type && s.slug === slug)
      ? current.filter((s) => !(s.type === type && s.slug === slug))
      : [...current, { type, slug }];
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      // storage unavailable — ignore
    }
    setSaved(next.some((s) => s.type === type && s.slug === slug));
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={saved}
      className={
        saved
          ? "min-h-[44px] rounded-[10px] bg-[#0E7A3D] px-4 text-base font-semibold text-white"
          : "min-h-[44px] rounded-[10px] border-2 border-[#0E7A3D] px-4 text-base font-semibold text-[#0A5C2E]"
      }
    >
      {saved ? "Saved" : "Save"}
    </button>
  );
}
