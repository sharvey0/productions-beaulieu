import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "My Music Site",
  description: "Booking and performance details",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <div className="site-root">

          <Header />

          <main className="site-main">{children}</main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
