import type {Metadata} from "next";
import "./globals.css";
import {ReactNode} from "react";
import {SpeedInsights} from "@vercel/speed-insights/next";
import {Analytics} from "@vercel/analytics/next";

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
    <Analytics />
    <SpeedInsights />
    <head>
        <title>Productions Beaulieu</title>
        <meta name="apple-mobile-web-app-title" content="Productions Beaulieu" />
    </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
