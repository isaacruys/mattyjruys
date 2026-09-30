"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { merch } from "@/data/site-content";

export default function Merch() {
  return (
    <section id="merch" className="px-6 py-24 max-w-6xl mx-auto">
      <h2
        className="font-display text-2xl md:text-3xl mb-12 text-accent glitch-text"
        data-text="Store"
      >
        Store
      </h2>

      {merch.length === 0 ? (
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className="w-full md:w-3/5">
            <Image
              src="/vinyl.png"
              alt="Beautiful Mess red vinyl"
              width={1741}
              height={1162}
              sizes="(min-width: 768px) 60vw, 100vw"
              className="w-full h-auto"
            />
          </div>
          <p className="text-sm uppercase tracking-widest text-ink/60">
            Vinyl Soon
          </p>
        </div>
      ) : (
        <div className="space-y-24">
          {merch.map((item) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="flex flex-col md:flex-row items-center gap-10 md:gap-16"
            >
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full md:w-3/5 group"
                tabIndex={-1}
                aria-hidden
              >
                <Image
                  src={item.image}
                  alt=""
                  width={1741}
                  height={1162}
                  sizes="(min-width: 768px) 60vw, 100vw"
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </a>

              <div className="flex-1 w-full">
                {item.status && (
                  <p className="text-xs uppercase tracking-widest text-accent mb-3">
                    {item.status}
                  </p>
                )}
                <h3 className="font-display text-3xl md:text-4xl leading-tight mb-4">
                  {item.name}
                </h3>
                {item.details && (
                  <p className="text-sm text-ink/60 mb-6">{item.details}</p>
                )}
                {item.price && (
                  <p className="text-xl tabular-nums mb-8">{item.price}</p>
                )}
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-sm uppercase tracking-widest text-ink hover:text-accent transition-colors"
                >
                  {item.cta ?? "Buy"} <span aria-hidden>→</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
