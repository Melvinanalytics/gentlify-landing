import type { Metadata, Viewport } from "next";
import "./globals.css";
import { DevModeBanner } from "@/components/DevModeBanner";

export const metadata: Metadata = {
  title: "Gentlify - Empathische Erziehungsberatung",
  description: "KI-gestützte Kommunikationshilfe für bedürfnisorientierte Erziehung. Erhalte sofort empathische und konkrete Lösungsvorschläge für herausfordernde Situationen mit deinem Kind.",
  keywords: ["Erziehung", "Bedürfnisorientiert", "Kommunikation", "Eltern", "KI", "Beratung"],
  authors: [{ name: "Gentlify Team" }],
  robots: "index, follow",
  openGraph: {
    title: "Gentlify - Empathische Erziehungsberatung",
    description: "KI-gestützte Kommunikationshilfe für bedürfnisorientierte Erziehung",
    type: "website",
    locale: "de_DE",
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#4f46e5',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="h-full">
      <body className="h-full antialiased">
        <DevModeBanner />
        {children}
      </body>
    </html>
  );
}
