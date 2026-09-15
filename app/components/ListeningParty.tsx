import Image from "next/image";

export default function ListeningParty() {
  return (
    <section className="px-6 py-16 max-w-2xl mx-auto">
      <div className="relative w-full aspect-[4/5] max-w-sm mx-auto">
        <Image
          src="/listening.jpeg"
          alt="Listening Party"
          fill
          className="object-cover"
        />
      </div>
    </section>
  );
}
