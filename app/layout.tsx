import type { Metadata } from "next";
import "./globals.css";
import { artist } from "@/data/site-content";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: artist.name,
  description: `The official website of ${artist.name}.`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-body antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
