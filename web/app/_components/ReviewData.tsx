"use client";

import { useEffect, useState } from "react";

type NoResult = { q: string; at: string };
type Vote = { slug: string; helpful: boolean; at: string };
type Report = { slug: string; note: string; at: string };
type SavedItem = { type: string; slug: string };

function read<T>(key: string): T[] {
  try {
    return JSON.parse(localStorage.getItem(key) ?? "[]");
  } catch {
    return [];
  }
}

// Local-only metrics review: everything Citizens Lens records on this device.
export default function ReviewData() {
  const [loaded, setLoaded] = useState(false);
  const [noResults, setNoResults] = useState<NoResult[]>([]);
  const [votes, setVotes] = useState<Vote[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [saved, setSaved] = useState<SavedItem[]>([]);
  const [lessonsDone, setLessonsDone] = useState<string[]>([]);

  function reload() {
    setNoResults(read<NoResult>("cl-no-results"));
    setVotes(read<Vote>("cl-feedback"));
    setReports(read<Report>("cl-reports"));
    setSaved(read<SavedItem>("cl-saved"));
    setLessonsDone(read<string>("cl-lessons-done"));
    setLoaded(true);
  }

  useEffect(reload, []);

  function clearAll() {
    for (const k of [
      "cl-no-results",
      "cl-feedback",
      "cl-reports",
      "cl-saved",
      "cl-lessons-done",
    ]) {
      try {
        localStorage.removeItem(k);
      } catch {
        // ignore
      }
    }
    reload();
  }

  if (!loaded) return <p className="text-[#5C665E]">Loading…</p>;

  const yes = votes.filter((v) => v.helpful).length;
  const no = votes.filter((v) => !v.helpful).length;

  return (
    <div>
      <div className="meta">
        <span className="tag">Summary</span>
        <p>
          {noResults.length} unanswered searches · {yes} helpful / {no} not
          helpful · {reports.length} reports · {saved.length} saved ·{" "}
          {lessonsDone.length} lessons done
        </p>
      </div>

      <h2 className="mt-4 font-semibold">
        Unanswered searches (write answers for these first)
      </h2>
      {noResults.length === 0 ? (
        <p className="text-[#5C665E]">None yet.</p>
      ) : (
        <ul className="mt-2 space-y-1">
          {noResults
            .slice()
            .reverse()
            .slice(0, 20)
            .map((r, i) => (
              <li key={i} className="rounded-[10px] border border-[#DDE3DE] p-2 text-[15px]">
                “{r.q}”{" "}
                <span className="text-sm text-[#5C665E]">
                  {new Date(r.at).toLocaleString()}
                </span>
              </li>
            ))}
        </ul>
      )}

      <h2 className="mt-4 font-semibold">Feedback votes</h2>
      {votes.length === 0 ? (
        <p className="text-[#5C665E]">None yet.</p>
      ) : (
        <ul className="mt-2 space-y-1">
          {votes
            .slice()
            .reverse()
            .slice(0, 20)
            .map((v, i) => (
              <li key={i} className="rounded-[10px] border border-[#DDE3DE] p-2 text-[15px]">
                {v.helpful ? "Helpful" : "Not helpful"} — {v.slug}
              </li>
            ))}
        </ul>
      )}

      <h2 className="mt-4 font-semibold">Reports</h2>
      {reports.length === 0 ? (
        <p className="text-[#5C665E]">None yet.</p>
      ) : (
        <ul className="mt-2 space-y-1">
          {reports
            .slice()
            .reverse()
            .map((r, i) => (
              <li key={i} className="rounded-[10px] border border-[#DDE3DE] p-2 text-[15px]">
                <strong>{r.slug}:</strong> {r.note || "(no note)"}
              </li>
            ))}
        </ul>
      )}

      <button
        type="button"
        onClick={clearAll}
        className="mt-4 min-h-[44px] rounded-[10px] border border-[#DDE3DE] px-4"
      >
        Clear all device data
      </button>
    </div>
  );
}
