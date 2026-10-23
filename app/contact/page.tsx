import type { Metadata } from "next";
import { artist } from "@/data/site-content";
import Nav from "../components/Nav";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: `Contact — ${artist.name}`,
  description: `Get in touch with ${artist.name} for booking, press and collaborations.`,
};

export default function ContactPage() {
  return (
    <main>
      <Nav />
      <Contact />
      <Footer />
    </main>
  );
}
