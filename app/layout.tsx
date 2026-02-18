import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "../styles/globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ramadan Warmth",
  description: "A calm Ramadan night scene with a gentle guided niyet flow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.className} bg-night-900 text-gold-300 antialiased`}>
        {children}
      </body>
    </html>
  );
}

