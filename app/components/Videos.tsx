"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { videos } from "@/data/site-content";

export default function Videos() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  if (videos.length === 0) return null;

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const card = scrollRef.current.children[index] as HTMLElement;
    card?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
    setActiveIndex(index);
  };

  const scroll = (direction: "left" | "right") => {
    const next =
      direction === "left"
        ? Math.max(activeIndex - 1, 0)
        : Math.min(activeIndex + 1, videos.length - 1);
    scrollToIndex(next);
  };

  return (
    <section id="videos" className="px-6 py-24 max-w-6xl mx-auto">
      <div className="flex items-end justify-between mb-10">
        <h2
          className="font-display text-2xl md:text-4xl text-accent glitch-text"
          data-text="Videos"
        >
          Videos
        </h2>
        <div className="flex items-center gap-4">
          <span className="text-xs uppercase tracking-widest text-ink/40 font-display">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(videos.length).padStart(2, "0")}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={activeIndex === 0}
              aria-label="Previous video"
              className="w-10 h-10 flex items-center justify-center text-xl hover:text-accent transition-colors disabled:opacity-20 disabled:hover:text-ink"
            >
              ←
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={activeIndex === videos.length - 1}
              aria-label="Next video"
              className="w-10 h-10 flex items-center justify-center text-xl hover:text-accent transition-colors disabled:opacity-20 disabled:hover:text-ink"
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2"
        style={{ scrollbarWidth: "none" }}
      >
        {videos.map((video, i) => (
          <motion.div
            key={video.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="snap-center shrink-0 w-[90%] sm:w-[70%] md:w-[65%]"
          >
            <div className="relative aspect-video border border-ink/10 overflow-hidden">
              <iframe
                src={video.embedUrl}
                className="absolute inset-0 w-full h-full border-0"
                allow="autoplay; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm uppercase tracking-wide">{video.title}</p>
              <span className="text-xs text-ink/40 font-display">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-2 mt-6">
        {videos.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIndex(i)}
            aria-label={`Go to video ${i + 1}`}
            className={`h-[2px] transition-all ${
              i === activeIndex ? "w-8 bg-accent" : "w-4 bg-ink/20"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
