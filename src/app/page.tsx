"use client";

import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

  const handlePrev = () => setIndex((prev) => (prev > 0 ? prev - 1 : prev));
  const handleNext = () =>
    setIndex((prev) => (prev < solutions.length - 1 ? prev + 1 : prev));

  const current = solutions[index];

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        IQ Fit Puzzle Viewer
      </h1>

      {current && (
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center gap-6 w-full max-w-5xl">
          {/* Çözüm numarası */}
          <span className="text-sm font-medium bg-gray-100 px-4 py-1 rounded-full text-gray-700">
            Solution #{index + 1} / {solutions.length}
          </span>

          {/* Puzzle grid */}
          <div className="p-3 border border-gray-300 rounded-lg bg-gray-50">
            <div className="grid grid-cols-11 gap-[3px]">
              {current.map((row, rIdx) =>
                row.split("").map((char, cIdx) => (
                  <div
                    key={`${rIdx}-${cIdx}`}
                    className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded text-white font-semibold text-sm ${
                      COLORS[char] || "bg-gray-800"
                    }`}
                  >
                    {char}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Önceki / Sonraki düğmeleri */}
          <div className="flex gap-6">
            <button
              onClick={handlePrev}
              disabled={index === 0}
              className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-5 py-2 rounded-lg transition disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>

            <button
              onClick={handleNext}
              disabled={index === solutions.length - 1}
              className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-5 py-2 rounded-lg transition disabled:opacity-40"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Legend */}
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-gray-600 mb-2 text-center">
              Color Legend
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {Object.entries(COLORS).map(([key, bg]) => (
                <div
                  key={key}
                  className={`flex items-center gap-1 px-2 py-1 rounded ${bg} text-white text-xs font-medium`}
                >
                  {key}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Page;
