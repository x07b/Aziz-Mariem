"use client";

import { useEffect, useState } from "react";
import { eventConfig } from "@/config/event";
import { getCountdown } from "@/lib/date";
import { Flourish } from "./Ornaments";
import { Reveal } from "./Reveal";

export function Countdown() {
  const [countdown, setCountdown] = useState<ReturnType<typeof getCountdown>>(null);
  const labels = { days: "أيام", hours: "ساعات", minutes: "دقائق", seconds: "ثوانٍ" };

  useEffect(() => {
    const update = () => setCountdown(getCountdown(eventConfig.event.date));
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="countdown section-pad" aria-labelledby="countdown-heading">
      <Reveal>
        <Flourish />
        <h2 className="arabic-ui section-title" id="countdown-heading" lang="ar" dir="rtl">العدّ التنازلي</h2>
        <div
          className="countdown-grid"
          role="timer"
          aria-label={countdown ? `${countdown.days} أيام، ${countdown.hours} ساعات، ${countdown.minutes} دقائق، ${countdown.seconds} ثوانٍ متبقية` : "العدّ التنازلي غير متاح"}
        >
          {(["days", "hours", "minutes", "seconds"] as const).map((unit) => (
            <div key={unit}>
              <span className="countdown-number">
                {countdown ? String(countdown[unit]).padStart(unit === "days" ? 3 : 2, "0") : "—"}
              </span>
              <span className="meta arabic-ui" lang="ar" dir="rtl">{labels[unit]}</span>
            </div>
          ))}
        </div>
        <Flourish />
      </Reveal>
    </section>
  );
}
