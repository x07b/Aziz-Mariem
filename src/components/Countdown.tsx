"use client";
import { TypedText } from "./TypedText";

import { useEffect, useState } from "react";
import { eventConfig, invitationCopy } from "@/config/event";
import { getCountdown } from "@/lib/date";
import { Flourish } from "./Ornaments";
import { Reveal } from "./Reveal";

export function Countdown() {
  const [countdown, setCountdown] = useState<ReturnType<typeof getCountdown>>(null);
  const t = invitationCopy.en;
  const labels = t.units;

  useEffect(() => {
    const update = () => setCountdown(getCountdown(eventConfig.event.date));
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="countdown section-pad" lang="en" dir="ltr" aria-labelledby="countdown-heading">
      <Reveal className="reading-surface">
        <h2 className="section-title" id="countdown-heading"><TypedText text={t.countdown}/></h2>
        <div
          className="countdown-grid"
          role="timer"
          aria-label={countdown ? `${countdown.days} ${labels.days}, ${countdown.hours} ${labels.hours}, ${countdown.minutes} ${labels.minutes}, ${countdown.seconds} ${labels.seconds} ${t.remaining}` : t.pending}
        >
          {(["days", "hours", "minutes", "seconds"] as const).map((unit) => (
            <div key={unit}>
              <span className="countdown-number">
                {countdown ? String(countdown[unit]).padStart(unit === "days" ? 3 : 2, "0") : "—"}
              </span>
              <span className="meta"><TypedText text={labels[unit]}/></span>
            </div>
          ))}
        </div>
        {countdown?.complete && <p className="countdown-note"><TypedText text={t.begun}/></p>}
        <Flourish />
      </Reveal>
    </section>
  );
}
