import { artist, socials } from "@/data/site-content";

export default function Footer() {
  return (
    <footer
      id="contact"
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

      <p className="mt-16 text-xs uppercase tracking-widest text-ink/40 text-right">
        {artist.location} · {new Date().getFullYear()} © {artist.name}
      </p>
    </footer>
  );
}
