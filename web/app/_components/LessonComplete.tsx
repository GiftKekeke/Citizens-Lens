"use client";

import { useEffect, useState } from "react";

const KEY = "cl-lessons-done";

export function readDone(): string[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

export default function LessonComplete({ slug }: { slug: string }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDone(readDone().includes(slug));
  }, [slug]);

  function toggle() {
    const next = readDone().includes(slug)
      ? readDone().filter((s) => s !== slug)
      : [...readDone(), slug];
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      // storage unavailable — ignore
    }
    setDone(next.includes(slug));
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={
        done
          ? "min-h-[48px] rounded-[10px] bg-[#0E7A3D] px-5 text-base font-semibold text-white"
          : "min-h-[48px] rounded-[10px] border-2 border-[#0E7A3D] px-5 text-base font-semibold text-[#0A5C2E]"
      }
    >
      {done ? "Completed — tap to undo" : "Mark lesson complete"}
    </button>
  );
}
