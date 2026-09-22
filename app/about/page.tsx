import Image from "next/image";
import { artist, bio, tracklist } from "@/data/site-content";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function About() {
  const paragraphs = bio.trim().split("\n\n").filter(Boolean);

  return (
    <main>
      <Nav />
      <section className="px-6 pt-32 pb-24 max-w-3xl mx-auto">
        <h1
          className="font-display text-3xl md:text-5xl mb-12 text-accent glitch-text"
          data-text="About"
        >
          About
        </h1>

        <div className="w-full mb-12">
          <Image
            src="/about.jpeg"
            alt={artist.name}
            width={1200}
            height={1500}
            className="w-full h-auto"
          />
        </div>

        <div className="space-y-6 text-ink leading-relaxed mb-16">
          {paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph.trim()}</p>
          ))}
        </div>

        <div>
          <h2 className="font-display text-xl md:text-2xl mb-6 text-accent">
            Tracklist — Beautiful Mess
          </h2>
          <ol className="space-y-2">
            {tracklist.map((track, i) => (
              <li
                key={track}
                className="flex gap-4 text-sm border-b border-ink/10 pb-2"
              >
                <span className="text-ink/40 tabular-nums w-6">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{track}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <Footer />
    </main>
  );
}
