"use client";

import { useEffect, useState } from "react";
import { album } from "@/data/site-content";

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

  // Before the clock starts (server render / first paint) show "--" placeholders
  // in the same layout, so the page doesn't jump when the numbers appear.
  const released =
    time !== null &&
    time.days + time.hours + time.minutes + time.seconds === 0;

  const units = [
    { label: "Days", value: time?.days },
    { label: "Hrs", value: time?.hours },
    { label: "Min", value: time?.minutes },
    { label: "Sec", value: time?.seconds },
  ];
  const display = (value: number | undefined) =>
    value === undefined ? "--" : String(value).padStart(2, "0");

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
              data-text={display(unit.value)}
              className="countdown-glitch font-display text-7xl sm:text-8xl md:text-9xl text-accent tabular-nums"
            >
              {display(unit.value)}
            </span>
            <span className="text-xs md:text-sm uppercase tracking-widest text-ink/60 mt-3">
              {unit.label}
            </span>
          </div>
        ))}
      </div>

      {!released && album.presaveUrl && (
        <div className="mt-14">
          {/* Styled after the Beautiful Mess cover: thin red type on dark, bold italic
              + light weight pairing, and a double hairline frame like the cover sticker */}
          <a
            href={album.presaveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex flex-wrap justify-center items-center gap-x-2 gap-y-1 md:gap-5 border border-accent bg-paper/50 backdrop-blur-sm px-5 py-4 md:px-12 md:py-5 text-accent uppercase hover:bg-accent hover:text-ink transition-colors duration-300"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-[3px] border border-accent/40 group-hover:border-ink/40 transition-colors duration-300"
            />
            <span className="text-sm md:text-2xl font-bold italic tracking-[0.08em]">
              Presave
            </span>
            <span className="text-sm md:text-2xl font-extralight tracking-[0.12em] md:tracking-[0.2em]">
              Digital Album Now
            </span>
            <span
              aria-hidden
              className="text-sm md:text-2xl font-extralight transition-transform duration-300 group-hover:translate-x-2"
            >
              →
            </span>
          </a>
        </div>
      )}
    </section>
  );
}
