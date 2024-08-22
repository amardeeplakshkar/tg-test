import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hukam's Telegram Mini App",
  description: 'A simple Telegram Mini App using Next.js 14'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
      </head>
      <body className={`min-h-screen bg-gradient-to-r from-blue-500 to-indigo-500 ${inter.className} text-white`}>
        {children}
      </body>
    </html>
  );
}
