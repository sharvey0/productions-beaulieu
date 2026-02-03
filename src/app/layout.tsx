import type { Metadata } from "next";
import "./globals.css";
import {ReactNode} from "react";

export const metadata: Metadata = {
  title: "Productions Beaulieu",
  description: "Réservez des prestations musicales à votre goût et facilement.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
