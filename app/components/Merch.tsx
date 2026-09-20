import Image from "next/image";
import { merch } from "@/data/site-content";

export default function Merch() {
  return (
    <section id="merch" className="px-6 py-16 max-w-5xl mx-auto">
      <div className="flex flex-col items-end text-right">
        <h2 className="font-display text-2xl md:text-3xl mb-8 text-accent">
          Store
        </h2>

        {merch.length === 0 ? (
          <div className="w-full max-w-xs">
            <div className="relative w-full aspect-square mb-4">
              <Image
                src="/vinyl-teaser.jpg"
                alt="Vinyl coming soon"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-sm uppercase tracking-widest text-ink/60">
              Vinyl Soon
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap justify-end gap-8 w-full">
            {merch.map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full max-w-xs text-left"
              >
                <div className="relative aspect-square mb-3 bg-ink/5 flex items-center justify-center overflow-hidden">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain group-hover:opacity-80 transition-opacity"
                    />
                  )}
                </div>
                <p className="text-sm">{item.name}</p>
                {item.price && (
                  <p className="text-sm text-ink/60">{item.price}</p>
                )}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
