import Image from "next/image";
import { discography } from "@/data/site-content";

export default function Discography() {
  return (
    <section id="discography" className="px-6 py-16 max-w-3xl mx-auto">
      <h2 className="font-display text-2xl md:text-3xl mb-8 text-accent">
        Discography
      </h2>
      <div className="space-y-12">
        {discography.map((release) => (
          <div key={release.title}>
            <div className="flex gap-4 items-start mb-4">
              {release.coverImage && (
                <div className="relative w-20 h-20 flex-shrink-0">
                  <Image
                    src={release.coverImage}
                    alt={release.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <h3 className="font-display text-lg">{release.title}</h3>
                <p className="text-sm text-ink/60">
                  {release.year} {release.label && `· ${release.label}`}
                </p>
              </div>
            </div>
            {release.embedUrl && (
              <iframe
                src={release.embedUrl}
                className="w-full h-24 border-0"
                allow="autoplay *; encrypted-media *;"
                loading="lazy"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
