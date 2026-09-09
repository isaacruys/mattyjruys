import Image from "next/image";
import { featuredRelease } from "@/data/site-content";

export default function FeaturedRelease() {
  return (
    <section id="release" className="px-6 py-16 max-w-4xl mx-auto text-center">
      <div className="relative w-full aspect-square max-w-md mx-auto mb-8">
        <Image
          src={featuredRelease.coverImage}
          alt={featuredRelease.title}
          fill
          className="object-cover"
          priority
        />
      </div>
      <h1 className="font-display text-3xl md:text-5xl mb-2 text-accent">
        {featuredRelease.title}
      </h1>
      <p className="text-sm uppercase tracking-wide text-ink/60 mb-6">
        {featuredRelease.releaseDate}
      </p>
      <a
        href={featuredRelease.streamUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block border border-ink px-6 py-3 text-sm uppercase tracking-wide hover:bg-ink hover:text-paper transition-colors"
      >
        Listen Now
      </a>
    </section>
  );
}
