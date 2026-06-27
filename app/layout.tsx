import type { Metadata } from "next";
import { Baskervville, Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const baskervville = Baskervville({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-baskervville",
  display: "swap",
});

const montserrat = Montserrat({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const openSans = Open_Sans({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Colonial Inn — Downtown Cebu City, Philippines",
  description: "Experience Cebu's heritage charm. Centrally located at Colon & Borromeo Streets, walking distance to Magellan's Cross and Basilica del Santo Niño.",
  openGraph: {
    title: "Colonial Inn — Downtown Cebu City, Philippines",
    description: "Experience Cebu's heritage charm. Centrally located at Colon & Borromeo Streets, walking distance to Magellan's Cross and Basilica del Santo Niño.",
    url: "https://colonialinn.example.com",
    siteName: "Colonial Inn",
    images: [
      {
        url: "/images/hero.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${baskervville.variable} ${montserrat.variable} ${openSans.variable}`}>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
      </head>
      <body suppressHydrationWarning className="font-body text-charcoal bg-off-white overflow-x-hidden min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
