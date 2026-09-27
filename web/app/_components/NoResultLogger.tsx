"use client";

import { useEffect } from "react";

// Stores unanswered queries on-device (max 100) for the weekly content sprint.
export default function NoResultLogger({ query }: { query: string }) {
  useEffect(() => {
    try {
      const key = "cl-no-results";
      const arr = JSON.parse(localStorage.getItem(key) ?? "[]") as {
        q: string;
        at: string;
      }[];
      arr.push({ q: query, at: new Date().toISOString() });
      localStorage.setItem(key, JSON.stringify(arr.slice(-100)));
    } catch {
      // storage unavailable — ignore
    }
  }, [query]);
  return null;
}
