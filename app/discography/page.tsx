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

function ReleaseRow({ release }: { release: ReleaseItem }) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-8">
      {release.coverImage && (
        <div className="relative w-full md:w-2/5 aspect-square flex-shrink-0">
          <Image
            src={release.coverImage}
            alt={`${release.title} cover art`}
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover"
          />
        </div>
      )}
      <div className="flex-1">
        <p className="text-xs uppercase tracking-widest text-ink/50 mb-2">
          {release.releaseDate.slice(0, 4)} · {release.type}
          {release.credit !== artist.name && ` · ${release.credit}`}
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
    </div>
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
      <section className="px-6 pt-32 pb-16 max-w-3xl mx-auto">
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
          <div className="space-y-16">
            {releases.map((release) => (
              <ReleaseRow key={release.title} release={release} />
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
                <span className="text-sm text-ink/40 tabular-nums w-10 flex-shrink-0">
                  {project.year}
                </span>
                <div>
                  <p className="text-sm md:text-base">
                    <span className="font-semibold">{project.artist}</span>
                    <span className="text-ink/40"> — </span>
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
