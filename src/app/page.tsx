// src/app/page.tsx
"use client";

import React, { useEffect, useState } from "react";

const COLORS: { [key: string]: string } = {
  A: "bg-red-400",
  B: "bg-orange-400",
  C: "bg-yellow-400",
  D: "bg-lime-400",
  E: "bg-teal-400",
  F: "bg-sky-400",
  G: "bg-blue-500",
  H: "bg-purple-400",
  I: "bg-pink-400",
  J: "bg-rose-400",
  K: "bg-green-500",
  L: "bg-fuchsia-500",
};

const Page = () => {
  const [solutions, setSolutions] = useState<string[][]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch("/solutions_100.txt")
      .then((res) => res.text())
      .then((text) => {
        const raw = text.trim().split("\n\n");
        const parsed = raw.map((sol) => sol.split("\n"));
        setSolutions(parsed);
      });
  }, []);

  const handlePrev = () => {
    setIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setIndex((prev) => (prev < solutions.length - 1 ? prev + 1 : prev));
  };

  const current = solutions[index];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-4">
      <h1 className="text-2xl font-bold">
        IQ Fit Puzzle - First 100 Solutions
      </h1>
      {current && (
        <div className="flex flex-col gap-2 items-center">
          <h2 className="text-lg font-semibold">Solution #{index + 1}</h2>
          <div className="grid grid-cols-11 gap-1">
            {current.map((row, rIdx) =>
              row.split("").map((char, cIdx) => (
                <div
                  key={`${rIdx}-${cIdx}`}
                  className={`w-6 h-6 text-sm font-semibold text-white flex items-center justify-center rounded ${
                    COLORS[char] || "bg-gray-800"
                  }`}
                >
                  {char}
                </div>
              ))
            )}
          </div>
          <div className="flex gap-4 mt-4">
            <button
              onClick={handlePrev}
              disabled={index === 0}
              className="bg-gray-700 hover:bg-gray-600 px-4 py-1 text-white rounded disabled:opacity-40"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={index === solutions.length - 1}
              className="bg-gray-700 hover:bg-gray-600 px-4 py-1 text-white rounded disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Page;
