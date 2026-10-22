import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PROBAFOOT | Pronostics VIP",
  description: "Application premium de pronostics football avec moteur probabiliste et abonnements VIP",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
