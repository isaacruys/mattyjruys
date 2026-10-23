import { artist, socials } from "@/data/site-content";

export default function Footer() {
  return (
    <footer
      className="px-6 py-24 max-w-4xl mx-auto border-t border-ink/10"
    >
      <div className="flex justify-end">
        <nav className="flex flex-col items-end gap-3">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative font-display text-xl md:text-2xl uppercase tracking-wide text-ink hover:text-accent transition-colors"
            >
              {social.label}
              <span className="absolute -bottom-1 right-0 h-[1px] w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>
      </div>

      <div className="mt-16 flex flex-col-reverse gap-6 sm:flex-row sm:items-end sm:justify-between">
        <p className="text-xs uppercase tracking-widest text-ink/60">
          {artist.location} · {new Date().getFullYear()} © {artist.name}
        </p>
        <a
          href="/contact"
          className="group inline-flex items-center gap-3 text-sm uppercase tracking-widest text-ink hover:text-accent transition-colors"
        >
          Get in touch
          <span aria-hidden className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </a>
      </div>
    </footer>
  );
}
