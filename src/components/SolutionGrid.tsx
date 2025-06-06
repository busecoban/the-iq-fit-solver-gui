"use client";
import React from "react";

interface SolutionGridProps {
  solution: string[];
  index: number;
}

const colors: Record<string, string> = {
  A: "bg-red-500",
  B: "bg-orange-400",
  C: "bg-yellow-400",
  D: "bg-green-500",
  E: "bg-teal-400",
  F: "bg-blue-500",
  G: "bg-indigo-500",
  H: "bg-purple-500",
  I: "bg-pink-400",
  J: "bg-rose-400",
  K: "bg-amber-500",
  L: "bg-lime-500",
};

export default function SolutionGrid({ solution, index }: SolutionGridProps) {
  return (
    <div className="mb-8 p-4 border rounded shadow w-fit">
      <h2 className="text-lg font-semibold mb-2">Solution #{index + 1}</h2>
      <div className="grid grid-cols-11 gap-[2px]">
        {solution.flatMap((row, i) =>
          row.split("").map((char, j) => (
            <div
              key={`${i}-${j}`}
              className={`w-5 h-5 text-xs flex items-center justify-center text-white ${
                colors[char] ?? "bg-black"
              }`}
            >
              {char}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
