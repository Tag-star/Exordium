import type { Metadata } from "next";
import { Fraunces, Work_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-worksans",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Exordium | Furniture for a Life Well Lived",
  description:
    "Exordium crafts and curates furniture built to last — living, bedroom, office, dining, and outdoor pieces designed with warmth and intention.",
  openGraph: {
    title: "Exordium | Furniture for a Life Well Lived",
    description:
      "Timeless furniture, thoughtfully made. Explore Exordium's collection.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${workSans.variable}`}>
      <body>
        <CartProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
