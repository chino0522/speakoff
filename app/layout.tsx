import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from 'next-auth/react';
import "@radix-ui/themes"
import Header from './components/header/Header';
import { Theme } from '@radix-ui/themes';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SpeakOff",
  icons: {
    icon: '/icon.ico'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiase`}
      >
        <Theme>
          <SessionProvider>

            <Header />
            {children}
          </SessionProvider>
        </Theme>
      </body>
    </html>
  );
}
