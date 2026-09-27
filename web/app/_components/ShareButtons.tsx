"use client";

import { useState } from "react";

export default function ShareButtons() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="mt-2 flex gap-2">
      <button
        type="button"
        onClick={copy}
        className="min-h-[44px] rounded-[10px] border-2 border-[#0E7A3D] px-4 text-base font-semibold text-[#0A5C2E]"
      >
        {copied ? "Link copied" : "Copy link"}
      </button>
    </div>
  );
}
