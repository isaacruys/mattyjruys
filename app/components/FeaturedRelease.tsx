"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { featuredRelease, artist } from "@/data/site-content";

export default function FeaturedRelease() {
  return (
    <section
      id="release"
      className="min-h-screen flex flex-col md:flex-row items-stretch pt-20"
    >
      <motion.div
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full md:w-1/2 aspect-square md:aspect-auto"
      >
        <Image
          src={featuredRelease.coverImage}
          alt={featuredRelease.title}
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-12 py-12">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xs uppercase tracking-widest text-ink/50 mb-4"
        >
          {featuredRelease.releaseDate}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display text-5xl md:text-7xl leading-[0.95] mb-8 text-accent glitch-text"
          data-text={featuredRelease.title}
        >
          {featuredRelease.title}
        </motion.h1>

        <motion.a
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          whileHover={{ x: 8 }}
          href={featuredRelease.streamUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 text-sm uppercase tracking-widest text-ink hover:text-accent transition-colors w-fit"
        >
          Listen Now <span aria-hidden>→</span>
        </motion.a>
      </div>
    </section>
  );
}
