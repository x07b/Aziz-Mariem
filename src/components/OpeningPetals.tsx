"use client";
import { useEffect, useState, type CSSProperties } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/** Opening shower followed by sparse, delayed petals; never intercepts interaction. */
export function OpeningPetals({ started }: { started: boolean }) {
  const reduced = useReducedMotion();
  const [finished, setFinished] = useState(false);
  useEffect(() => {
    if (!started) return;
    const timer = setTimeout(() => setFinished(true), 9500);
    return () => clearTimeout(timer);
  }, [started]);
  if (!started || reduced) return null;
  if (finished) return <div className="ambient-petals" aria-hidden="true">
    {Array.from({ length: 7 }, (_, index) => <span key={index} className="ambient-petal" style={{
      left: `${7 + (index * 31) % 86}%`,
      "--petal-size": `${7 + index % 3 * 2}px`,
      "--petal-drift": `${(index % 2 ? 1 : -1) * (30 + index * 7)}px`,
      "--petal-turn": `${100 + index * 43}deg`,
      "--petal-delay": `${12 + index * 1.8}s`,
    } as CSSProperties}/>)}
  </div>;
  return <div className="opening-petals" aria-hidden="true">
    {Array.from({ length: 14 }, (_, index) => <span key={index} className="opening-petal" style={{
      left: `${4 + (index * 29) % 92}%`,
      "--petal-size": `${9 + index % 5 * 2}px`,
      "--petal-drift": `${(index % 2 ? 1 : -1) * (24 + index * 3)}px`,
      "--petal-turn": `${120 + index * 37}deg`,
      "--petal-delay": `${index % 6 * .32}s`,
      "--petal-duration": `${6.6 + index % 4 * .35}s`,
    } as CSSProperties}/>)}
  </div>;
}
