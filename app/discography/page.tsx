import type { Metadata } from "next";
import Image from "next/image";
import {
  artist,
  discography,
  specialProjects,
  type ReleaseItem,
} from "@/data/site-content";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: `Discography — ${artist.name}`,
  description: `Releases from ${artist.name}.`,
};

function ReleaseCard({ release }: { release: ReleaseItem }) {
  const byline = [
    release.credit !== artist.name ? release.credit : null,
    release.role ?? null,
  ]
    .filter(Boolean)
    .join(" · ");

  const cover = (
    <div className="relative aspect-square bg-ink/5 overflow-hidden">
      {release.coverImage && (
        <Image
          src={release.coverImage}
          alt={`${release.title} cover art`}
          fill
          sizes="(min-width: 1024px) 280px, (min-width: 768px) 33vw, 50vw"
          className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
        />
      )}
    </div>
  );

  return (
    <article className="group">
      {release.listenUrl ? (
        <a
          href={release.listenUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Listen to ${release.title}`}
          className="block"
        >
          {cover}
        </a>
      ) : (
        cover
      )}
      <p className="text-[10px] md:text-xs uppercase tracking-widest text-ink/50 mt-3 mb-1">
        {release.releaseDate.slice(0, 4)} · {release.type}
      </p>
      <h3 className="font-display text-sm md:text-base uppercase leading-snug">
        {release.title}
      </h3>
      {byline && (
        <p className="text-[10px] md:text-xs uppercase tracking-widest text-ink/50 mt-1">
          {byline}
        </p>
      )}
      {release.listenUrl && (
        <a
          href={release.listenUrl}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={-1}
          className="inline-flex items-center gap-2 mt-2 text-[10px] md:text-xs uppercase tracking-widest text-ink/70 hover:text-accent transition-colors"
        >
          Listen <span aria-hidden>→</span>
        </a>
      )}
    </article>
  );
}

export default function DiscographyPage() {
  const releases = [...discography].sort((a, b) =>
    a.releaseDate.localeCompare(b.releaseDate),
  );
  const projects = [...specialProjects].sort((a, b) =>
    a.year.localeCompare(b.year),
  );

  return (
    <main>
      <Nav />
      <section className="px-6 pt-32 pb-16 max-w-6xl mx-auto">
        <h1
          className="font-display text-3xl md:text-5xl mb-16 text-accent glitch-text"
          data-text="Discography"
        >
          Discography
        </h1>

        {releases.length === 0 ? (
          <p className="text-ink/60 text-sm uppercase tracking-widest">
            Coming soon
          </p>
        ) : (
          // Cover grid, oldest first reading left to right
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-14">
            {releases.map((release) => (
              <ReleaseCard key={release.title} release={release} />
            ))}
          </div>
        )}
      </section>

      {projects.length > 0 && (
        <section className="px-6 py-16 max-w-3xl mx-auto border-t border-ink/10">
          <h2 className="font-display text-2xl md:text-3xl mb-10 text-accent">
            Special Projects
          </h2>
          <ol>
            {projects.map((project) => (
              <li
                key={`${project.artist}-${project.title}`}
                className="flex gap-4 md:gap-6 border-b border-ink/10 py-4"
              >
                <span className="text-sm text-ink/60 tabular-nums w-10 flex-shrink-0">
                  {project.year}
                </span>
                <div>
                  <p className="text-sm md:text-base">
                    <span className="font-semibold">{project.artist}</span>
                    <span className="text-ink/60"> — </span>
                    {project.title}
                  </p>
                  <p className="text-xs uppercase tracking-widest text-ink/50 mt-1">
                    {project.role}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      <Footer />
    </main>
  );
}
