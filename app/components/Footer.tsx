import { artist, socials } from "@/data/site-content";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="px-6 py-16 max-w-4xl mx-auto border-t border-ink/10"
    >
      <div className="flex flex-wrap justify-between gap-8">
        <div>
          <a className="text-sm uppercase tracking-wide underline hover:text-accent">
            Contact
          </a>
        </div>

        <div>
          {/* Swap this block for a Mailchimp/ConvertKit embed form */}
          <p className="text-sm uppercase tracking-wide mb-2">Mailing List</p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Email address"
              className="border border-ink/20 px-3 py-2 text-sm bg-transparent"
            />
            <button
              type="submit"
              className="border border-ink px-4 py-2 text-sm uppercase tracking-wide hover:bg-ink hover:text-paper transition-colors"
            >
              Join
            </button>
          </form>
        </div>

        <div className="flex flex-col gap-1">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:text-accent"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>

      <p className="mt-12 text-xs text-ink/40">
        {artist.location} · {new Date().getFullYear()} © {artist.name}
      </p>
    </footer>
  );
}
