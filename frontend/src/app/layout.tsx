import type { Metadata } from "next";
import "./globals.css";
import { Kanit } from "next/font/google";

const kanit = Kanit({
  weight: "500",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VentomERP",
  description: "Created by Ventom d.o.o",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={kanit.className}>
      <body className="bg-sky-400 text-gray-300">{children}</body>
    </html>
  );
}
