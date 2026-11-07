"use client";

import { motion } from "framer-motion";
import { album } from "@/data/site-content";

export default function OutNow() {
  return (
    <section className="relative px-6 pt-32 pb-20 text-center overflow-hidden">
      <span
        data-text="Out Now"
        className="countdown-glitch inline-block text-sm md:text-base uppercase tracking-[0.3em] text-accent mb-8"
      >
        Out Now
      </span>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        data-text={album.title}
        className="glitch-text font-display text-6xl sm:text-8xl md:text-9xl leading-[0.9] text-accent"
      >
        {album.title}
      </motion.h1>

      {album.listenUrl && (
        <div className="mt-14">
          {/* Styled after the Beautiful Mess cover: thin red type on dark, bold italic
              + light weight pairing, and a double hairline frame like the cover sticker */}
          <a
            href={album.listenUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex flex-wrap justify-center items-center gap-x-2 gap-y-1 md:gap-5 border border-accent bg-paper/50 backdrop-blur-sm px-5 py-4 md:px-12 md:py-5 text-accent uppercase hover:bg-accent hover:text-ink transition-colors duration-300"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-[3px] border border-accent/40 group-hover:border-ink/40 transition-colors duration-300"
            />
            <span className="text-sm md:text-2xl font-bold italic tracking-[0.08em]">
              Listen
            </span>
            <span className="text-sm md:text-2xl font-extralight tracking-[0.12em] md:tracking-[0.2em]">
              To The Album Now
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
