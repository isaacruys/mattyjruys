const links = [
  { href: "#release", label: "Music" },
  { href: "#tour", label: "Tour" },
  { href: "#discography", label: "Discography" },
  { href: "#videos", label: "Videos" },
  { href: "#merch", label: "Store" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-paper/90 backdrop-blur border-b border-ink/10">
      <ul className="flex flex-wrap gap-x-6 gap-y-2 px-6 py-4 text-sm uppercase tracking-wide">
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href} className="hover:text-accent transition-colors">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
