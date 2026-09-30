"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { recentReleases } from "@/data/site-content";

export default function RecentReleases() {
  if (recentReleases.length === 0) return null;

  const sorted = [...recentReleases].sort((a, b) =>
    b.releaseDate.localeCompare(a.releaseDate),
  );

  return (
    <section className="px-6 py-24 max-w-5xl mx-auto">
      <div className="space-y-16 md:space-y-24">
        {sorted.map((release, i) => {
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
                    alt={`${release.title} cover art`}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className={`flex-1 ${reverse ? "md:text-right" : ""}`}>
                <p className="text-xs uppercase tracking-widest text-ink/50 mb-2">
                  {release.releaseDate.slice(0, 4)} · {release.type}
                </p>
                <h3 className="font-display text-3xl md:text-4xl mb-6">
                  {release.title}
                </h3>
                {release.listenUrl && (
                  <a
                    href={release.listenUrl}
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
