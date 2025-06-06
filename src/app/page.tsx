"use client";
import { useEffect, useState } from "react";
import SolutionGrid from "@/components/SolutionGrid";

export default function Home() {
  const [solutions, setSolutions] = useState<string[][]>([]);

  useEffect(() => {
    fetch("/solutions_100.txt")
      .then((res) => res.text())
      .then((text) => {
        const parsed = text
          .trim()
          .split(/\n{2,}/)
          .map((block) =>
            block.split("\n").filter((line) => line.length === 11)
          );
        setSolutions(parsed.slice(0, 100));
      });
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        IQ Fit Puzzle - First 100 Solutions
      </h1>
      <div className="flex flex-wrap gap-6">
        {solutions.map((sol, i) => (
          <SolutionGrid key={i} solution={sol} index={i} />
        ))}
      </div>
    </main>
  );
}
