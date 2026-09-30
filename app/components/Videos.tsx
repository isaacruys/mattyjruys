"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { videos } from "@/data/site-content";

export default function Videos() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  // Only the video someone clicks gets a real YouTube player; the rest are
  // thumbnails, so the homepage doesn't load 15 players up front.
  const [playingId, setPlayingId] = useState<string | null>(null);

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

  // Keep the counter/dots in sync when the user swipes instead of using arrows.
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    let closest = 0;
    let closestDistance = Infinity;
    Array.from(el.children).forEach((child, i) => {
      const card = child as HTMLElement;
      const distance = Math.abs(card.offsetLeft + card.offsetWidth / 2 - center);
      if (distance < closestDistance) {
        closestDistance = distance;
        closest = i;
      }
    });
    if (closest !== activeIndex) setActiveIndex(closest);
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
        onScroll={handleScroll}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2"
        style={{ scrollbarWidth: "none" }}
      >
        {videos.map((video, i) => (
          <motion.div
            key={video.youtubeId}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: Math.min(i, 3) * 0.1 }}
            className="snap-center shrink-0 w-[90%] sm:w-[70%] md:w-[65%]"
          >
            <div className="relative aspect-video border border-ink/10 overflow-hidden bg-paper">
              {playingId === video.youtubeId ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
                  title={video.title}
                  className="absolute inset-0 w-full h-full border-0"
                  allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <button
                  onClick={() => {
                    setPlayingId(video.youtubeId);
                    setActiveIndex(i);
                  }}
                  aria-label={`Play ${video.title}`}
                  className="group absolute inset-0 w-full h-full"
                >
                  {/* External thumbnail, so a plain <img> rather than next/image */}
                  <img
                    src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-ink/70 bg-paper/40 backdrop-blur-sm flex items-center justify-center group-hover:border-accent group-hover:bg-accent/80 transition-colors">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-6 h-6 md:w-7 md:h-7 ml-1 fill-ink"
                        aria-hidden
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </span>
                </button>
              )}
            </div>
            <div className="flex items-start justify-between gap-4 mt-4">
              <div>
                <p className="text-sm uppercase tracking-wide">{video.title}</p>
                {video.artist && (
                  <p className="text-xs uppercase tracking-widest text-ink/50 mt-1">
                    {video.artist}
                  </p>
                )}
              </div>
              <span className="text-xs text-ink/40 font-display">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-2 mt-6 flex-wrap">
        {videos.map((video, i) => (
          <button
            key={video.youtubeId}
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
