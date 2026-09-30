import Image from "next/image";

export default function ListeningParty() {
  return (
    <section className="px-6 py-16 max-w-2xl mx-auto">
      <div className="w-full max-w-sm mx-auto">
        {/* Real dimensions of the flyer so it renders at its own shape, never cropped */}
        <Image
          src="/listening.jpeg"
          alt="Beautiful Mess vinyl launch and listening party — Thursday Nov 5, 6–8pm, Happy Valley, 347 Smith Street, Fitzroy, Melbourne"
          width={1447}
          height={2048}
          sizes="(min-width: 640px) 384px, 100vw"
          className="w-full h-auto"
        />
      </div>
    </section>
  );
}
