"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { galleryImages } from "@/data/site-content";

export default function Gallery() {
  const scrollRef = useRef<HTMLDivElement>(null);
  // Clicked photo grows in place and the rest fade back. null = none selected.
  const [selected, setSelected] = useState<number | null>(null);

  // Clicking anywhere outside the strip, or pressing Esc, deselects
  useEffect(() => {
    if (selected === null) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!scrollRef.current?.contains(event.target as Node)) setSelected(null);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [selected]);

  if (galleryImages.length === 0) return null;

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const toggle = (index: number, element: HTMLElement) => {
    if (selected === index) {
      setSelected(null);
      return;
    }
    setSelected(index);
    // Bring the chosen photo into the middle so it has room to grow
    element.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  return (
    <section id="gallery" className="py-16">
      <div className="flex items-center justify-between px-6 max-w-6xl mx-auto mb-2">
        <h2
          className="font-display text-2xl md:text-3xl text-accent glitch-text"
          data-text="Gallery"
        >
          Gallery
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="w-9 h-9 flex items-center justify-center text-lg hover:text-accent transition-colors"
          >
            ←
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="w-9 h-9 flex items-center justify-center text-lg hover:text-accent transition-colors"
          >
            →
          </button>
        </div>
      </div>

      {/* Vertical padding gives the enlarged photo room — a horizontally
          scrolling strip clips anything that grows past its top/bottom edge. */}
      <div
        ref={scrollRef}
        className="flex items-center gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth px-6 py-12 md:py-14"
        style={{ scrollbarWidth: "none" }}
      >
        {galleryImages.map((src, i) => {
          const isSelected = selected === i;
          const isDimmed = selected !== null && !isSelected;
          return (
            <motion.button
              key={src}
              onClick={(e) => toggle(i, e.currentTarget)}
              aria-label={`Photo ${i + 1} of ${galleryImages.length}`}
              aria-pressed={isSelected}
              animate={{
                scale: isSelected ? 1.25 : 1,
                opacity: isDimmed ? 0.35 : 1,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              // The first/last photos can't be scrolled to the centre, so grow them
              // inwards instead of past the edge of the strip
              style={{
                transformOrigin:
                  i === 0
                    ? "left center"
                    : i === galleryImages.length - 1
                      ? "right center"
                      : "center",
              }}
              className={`relative snap-center shrink-0 h-72 md:h-96 cursor-pointer focus-visible:outline focus-visible:outline-1 focus-visible:outline-accent ${
                isSelected ? "z-10 shadow-[0_25px_60px_rgba(0,0,0,0.7)]" : "z-0"
              }`}
            >
              <Image
                src={src}
                alt=""
                width={0}
                height={0}
                // Shown at a fixed 288/384px height (up to 25% larger when selected)
                sizes="(min-width: 768px) 60vw, 90vw"
                style={{ width: "auto", height: "100%" }}
                // Black & white to match the album art (no colour-on-hover — it flickered).
                // The files themselves stay in colour — remove `grayscale` to undo.
                className="object-contain grayscale"
              />
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
