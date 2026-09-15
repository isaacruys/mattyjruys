"use client";

import { useEffect, useState } from "react";

const TARGET_DATE = new Date("2026-11-06T00:00:00");

function getTimeLeft() {
  const now = new Date();
  const diff = Math.max(TARGET_DATE.getTime() - now.getTime(), 0);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
}

export default function Countdown() {
  const [time, setTime] = useState<ReturnType<typeof getTimeLeft> | null>(null);

  useEffect(() => {
    setTime(getTimeLeft());
    const interval = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!time) return null;

  const units = [
    { label: "Days", value: time.days },
    { label: "Hrs", value: time.hours },
    { label: "Min", value: time.minutes },
    { label: "Sec", value: time.seconds },
  ];

  return (
    <section className="relative px-6 pt-32 pb-20 text-center overflow-hidden">
      <span
        data-text="Beautiful Mess Soon"
        className="countdown-glitch inline-block text-sm md:text-base uppercase tracking-[0.3em] text-accent mb-8"
      >
        Beautiful Mess Soon
      </span>

      <div className="flex justify-center gap-6 sm:gap-12 md:gap-16">
        {units.map((unit) => (
          <div key={unit.label} className="flex flex-col items-center">
            <span
              key={`${unit.label}-${unit.value}`}
              data-text={String(unit.value).padStart(2, "0")}
              className="countdown-glitch font-display text-7xl sm:text-8xl md:text-9xl text-accent tabular-nums"
            >
              {String(unit.value).padStart(2, "0")}
            </span>
            <span className="text-xs md:text-sm uppercase tracking-widest text-ink/40 mt-3">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
