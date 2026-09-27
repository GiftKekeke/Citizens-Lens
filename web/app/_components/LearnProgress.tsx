"use client";

import { useEffect, useState } from "react";
import type { Lesson } from "../content/data";
import { readDone } from "./LessonComplete";

export default function LearnProgress({ lessons }: { lessons: Lesson[] }) {
  const [done, setDone] = useState<string[]>([]);

  useEffect(() => {
    setDone(readDone());
    function onStorage(e: StorageEvent) {
      if (e.key === "cl-lessons-done") setDone(readDone());
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const pct =
    lessons.length === 0
      ? 0
      : Math.round(
          (lessons.filter((l) => done.includes(l.slug)).length / lessons.length) * 100
        );

  return (
    <div className="meta">
      <span className="tag">Your progress</span>
      <p>
        {lessons.filter((l) => done.includes(l.slug)).length} of {lessons.length}{" "}
        lessons completed.
      </p>
      <div
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        className="mt-2 h-3 overflow-hidden rounded-full bg-[#DDE3DE]"
      >
        <div className="h-full bg-[#0E7A3D]" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
