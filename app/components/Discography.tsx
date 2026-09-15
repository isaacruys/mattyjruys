"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { discography } from "@/data/site-content";

export default function Discography() {
  return (
    <section id="discography" className="px-6 py-24 max-w-5xl mx-auto">
      <h2
        className="font-display text-2xl md:text-3xl mb-16 text-accent glitch-text"
        data-text="Discography"
      >
        Discography
      </h2>

      <div className="space-y-16 md:space-y-24">
        {discography.map((release, i) => {
          const reverse = i % 2 === 1;
          return (
            <motion.div
              key={release.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
                reverse ? "md:flex-row-reverse" : ""
              }`}
            >
              {release.coverImage && (
                <div className="relative w-full md:w-2/5 aspect-square flex-shrink-0">
                  <Image
                    src={release.coverImage}
                    alt={release.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className={`flex-1 ${reverse ? "md:text-right" : ""}`}>
                <p className="text-xs uppercase tracking-widest text-ink/50 mb-2">
                  {release.year} {release.label && `· ${release.label}`}
                </p>
                <h3 className="font-display text-3xl md:text-4xl mb-6">
                  {release.title}
                </h3>
                {release.hyperfollowUrl && (
                  <a
                    href={release.hyperfollowUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-sm uppercase tracking-widest text-ink hover:text-accent transition-colors"
                  >
                    Listen <span aria-hidden>→</span>
                  </a>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
