"use client";

import { useRef } from "react";
import { videos } from "@/data/site-content";

export default function Videos() {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (videos.length === 0) return null;

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.9;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section id="videos" className="px-6 py-16 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-display text-2xl md:text-3xl text-accent">
          Videos
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="w-9 h-9 border border-ink/30 hover:border-accent hover:text-accent transition-colors"
          >
            ←
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="w-9 h-9 border border-ink/30 hover:border-accent hover:text-accent transition-colors"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-6 px-6"
        style={{ scrollbarWidth: "none" }}
      >
        {videos.map((video) => (
          <div
            key={video.title}
            className="snap-start shrink-0 w-[85%] sm:w-[60%] md:w-[45%]"
          >
            <div className="relative aspect-video">
              <iframe
                src={video.embedUrl}
                className="absolute inset-0 w-full h-full border-0"
                allow="autoplay; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>
            <p className="mt-2 text-sm text-ink/60">{video.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
