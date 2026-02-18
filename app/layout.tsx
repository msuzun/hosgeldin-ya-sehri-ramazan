import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import KandilSwitch from "@/components/KandilSwitch";
import "../styles/globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hayırlı Ramazanlar",
  description: "Sakin bir Ramazan gecesi sahnesi ve nazikçe yönlendirilmiş dua akışı.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.className} bg-night-900 text-gold-300 antialiased`}>
        <KandilSwitch />
        {children}
      </body>
    </html>
  );
}
