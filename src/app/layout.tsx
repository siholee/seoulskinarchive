import React from 'react';
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'Seoul Skin Archive',
  description: "Seoul's best-kept skincare secrets, curated for your skin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
