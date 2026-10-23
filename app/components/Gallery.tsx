"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { galleryImages } from "@/data/site-content";

export default function Gallery() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);
  // Index of the photo open in the lightbox, or null when closed
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  // Which lightbox photo has finished loading (shows "Loading…" until then)
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);

  const count = galleryImages.length;

  const close = useCallback(() => {
    setOpenIndex((current) => {
      // Return keyboard focus to the photo that was opened
      if (current !== null) thumbRefs.current[current]?.focus();
      return null;
    });
  }, []);

  const step = useCallback(
    (direction: 1 | -1) =>
      setOpenIndex((current) =>
        current === null ? null : (current + direction + count) % count,
      ),
    [count],
  );

  // While open: Esc closes, arrow keys navigate, and the page behind can't scroll
  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [openIndex, close, step]);

  if (count === 0) return null;

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) step(delta < 0 ? 1 : -1);
    touchStartX.current = null;
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
        {galleryImages.map((src, i) => (
          <button
            key={src}
            ref={(el) => {
              thumbRefs.current[i] = el;
            }}
            onClick={() => setOpenIndex(i)}
            aria-label={`Open photo ${i + 1} of ${count}`}
            className="snap-start shrink-0 h-72 md:h-96 cursor-pointer focus-visible:outline focus-visible:outline-1 focus-visible:outline-accent"
          >
            <Image
              src={src}
              alt=""
              width={0}
              height={0}
              // Images are shown at a fixed 288/384px height, so they never need full-screen width
              sizes="(min-width: 768px) 60vw, 90vw"
              style={{ width: "auto", height: "100%" }}
              // Black & white to match the album art (no colour-on-hover — it flickered).
              // The files themselves stay in colour — remove `grayscale` to undo.
              className="object-contain grayscale"
            />
          </button>
        ))}
      </div>

      {/* Lightbox. Nothing here renders or downloads until a photo is clicked. */}
      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Photo ${openIndex + 1} of ${count}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-paper/90 backdrop-blur-md"
            onClick={close}
            onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
            onTouchEnd={onTouchEnd}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={galleryImages[openIndex]}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-x-4 top-16 bottom-20 md:inset-x-24 md:top-12 md:bottom-16"
              >
                <Image
                  src={galleryImages[openIndex]}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 85vw, 100vw"
                  className="object-contain grayscale"
                  onLoad={() => setLoadedSrc(galleryImages[openIndex])}
                  onClick={(e) => {
                    // The <img> box is bigger than the visible photo (object-contain
                    // leaves empty space around it). Only clicks on the photo itself
                    // keep the lightbox open; clicks in the empty space close it.
                    const img = e.currentTarget;
                    const box = img.getBoundingClientRect();
                    const scale = Math.min(
                      box.width / img.naturalWidth,
                      box.height / img.naturalHeight,
                    );
                    const w = img.naturalWidth * scale;
                    const h = img.naturalHeight * scale;
                    const left = box.left + (box.width - w) / 2;
                    const top = box.top + (box.height - h) / 2;
                    const onPhoto =
                      e.clientX >= left &&
                      e.clientX <= left + w &&
                      e.clientY >= top &&
                      e.clientY <= top + h;
                    if (onPhoto) e.stopPropagation();
                  }}
                />
                {loadedSrc !== galleryImages[openIndex] && (
                  <p className="absolute inset-0 flex items-center justify-center text-xs uppercase tracking-widest text-ink/60 pointer-events-none">
                    Loading…
                  </p>
                )}
              </motion.div>
            </AnimatePresence>

            <button
              ref={closeRef}
              onClick={close}
              aria-label="Close"
              className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center text-2xl text-ink hover:text-accent transition-colors"
            >
              ✕
            </button>

            {count > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    step(-1);
                  }}
                  aria-label="Previous photo"
                  className="absolute bottom-4 left-4 md:bottom-auto md:top-1/2 md:-translate-y-1/2 w-11 h-11 flex items-center justify-center text-2xl text-ink hover:text-accent transition-colors"
                >
                  ←
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    step(1);
                  }}
                  aria-label="Next photo"
                  className="absolute bottom-4 right-4 md:bottom-auto md:top-1/2 md:-translate-y-1/2 w-11 h-11 flex items-center justify-center text-2xl text-ink hover:text-accent transition-colors"
                >
                  →
                </button>
              </>
            )}

            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs uppercase tracking-widest text-ink/60 font-display tabular-nums pointer-events-none">
              {String(openIndex + 1).padStart(2, "0")} /{" "}
              {String(count).padStart(2, "0")}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
