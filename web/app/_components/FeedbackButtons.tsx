"use client";

import { useState } from "react";

type Vote = { slug: string; helpful: boolean; at: string };
type Report = { slug: string; note: string; at: string };

function push(key: string, value: Vote | Report) {
  try {
    const arr = JSON.parse(localStorage.getItem(key) ?? "[]");
    arr.push(value);
    localStorage.setItem(key, JSON.stringify(arr.slice(-200)));
  } catch {
    // storage unavailable — ignore
  }
}

// "Did this help?" + "Report outdated info", stored only on this device.
export default function FeedbackButtons({ slug }: { slug: string }) {
  const [voted, setVoted] = useState<boolean | null>(null);
  const [reporting, setReporting] = useState(false);
  const [note, setNote] = useState("");
  const [reported, setReported] = useState(false);

  function vote(helpful: boolean) {
    push("cl-feedback", { slug, helpful, at: new Date().toISOString() });
    setVoted(helpful);
  }

  function report() {
    push("cl-reports", {
      slug,
      note: note.trim().slice(0, 500),
      at: new Date().toISOString(),
    });
    setReported(true);
    setReporting(false);
    setNote("");
  }

  return (
    <div className="mt-4 rounded-[10px] border border-[#DDE3DE] p-3">
      <p className="font-semibold">Did this explanation help you understand?</p>
      {voted === null ? (
        <div className="mt-2 flex gap-2">
          <button
            type="button"
            onClick={() => vote(true)}
            className="min-h-[44px] rounded-[10px] border-2 border-[#0E7A3D] px-4 font-semibold text-[#0A5C2E]"
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => vote(false)}
            className="min-h-[44px] rounded-[10px] border border-[#DDE3DE] px-4"
          >
            No
          </button>
        </div>
      ) : (
        <p className="mt-2 text-[#5C665E]">
          Thanks — your response is stored on this device and guides the next
          content review.
        </p>
      )}
      <div className="mt-2">
        {reported ? (
          <p className="text-[#5C665E]">
            Report saved on this device. Thank you.
          </p>
        ) : reporting ? (
          <div className="mt-2">
            <label htmlFor={`report-${slug}`} className="text-sm text-[#5C665E]">
              What looks wrong or outdated?
            </label>
            <textarea
              id={`report-${slug}`}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              maxLength={500}
              className="mt-1 w-full rounded-[10px] border border-[#DDE3DE] p-2 text-base"
            />
            <div className="mt-2 flex gap-2">
              <button
                type="button"
                onClick={report}
                disabled={note.trim().length === 0}
                className="min-h-[44px] rounded-[10px] bg-[#0E7A3D] px-4 font-semibold text-white disabled:opacity-50"
              >
                Send report
              </button>
              <button
                type="button"
                onClick={() => setReporting(false)}
                className="min-h-[44px] rounded-[10px] border border-[#DDE3DE] px-4"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setReporting(true)}
            className="mt-1 min-h-[44px] text-sm font-semibold text-[#0A5C2E] underline"
          >
            Report outdated or wrong information
          </button>
        )}
      </div>
    </div>
  );
}
