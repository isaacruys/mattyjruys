"use client";

import { useRef } from "react";
import Image from "next/image";
import { galleryImages } from "@/data/site-content";

export default function Gallery() {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (galleryImages.length === 0) return null;

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section id="gallery" className="py-16">
      <div className="flex items-center justify-between px-6 max-w-6xl mx-auto mb-6">
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

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth px-6 pb-4"
        style={{ scrollbarWidth: "none" }}
      >
        {galleryImages.map((src) => (
          <div key={src} className="snap-start shrink-0 h-72 md:h-96">
            <Image
              src={src}
              alt=""
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "auto", height: "100%" }}
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
