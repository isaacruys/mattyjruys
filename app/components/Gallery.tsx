import Image from "next/image";
import { galleryImages } from "@/data/site-content";

export default function Gallery() {
  if (galleryImages.length === 0) return null;

  return (
    <section id="gallery" className="px-6 py-16 max-w-5xl mx-auto">
      <h2 className="font-display text-2xl md:text-3xl mb-8">Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {galleryImages.map((src) => (
          <div key={src} className="relative aspect-[3/4]">
            <Image src={src} alt="" fill className="object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}
