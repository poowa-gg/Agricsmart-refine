import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AgriSmart Connect | Transparent Agricultural Support",
  description: "Digital infrastructure for agricultural program distribution and verification",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} gradient-mesh min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
