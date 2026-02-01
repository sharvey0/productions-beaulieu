import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Productions Beaulieu",
  description: "Réservez des prestations musicales à votre goût et facilement.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
