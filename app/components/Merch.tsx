import Image from "next/image";
import { merch } from "@/data/site-content";

export default function Merch() {
  return (
    <section id="merch" className="px-6 py-16 max-w-4xl mx-auto">
      <h2 className="font-display text-2xl md:text-3xl mb-8 text-accent">
        Store
      </h2>
      {merch.length === 0 ? (
        <p className="text-ink/60">Merch coming soon.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {merch.map((item) => (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="relative aspect-square mb-3 bg-ink/5">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:opacity-80 transition-opacity"
                  />
                )}
              </div>
              <p className="text-sm">{item.name}</p>
              <p className="text-sm text-ink/60">{item.price}</p>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
