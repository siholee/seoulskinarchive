import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Seoul Skin Archive - K-Beauty Secrets Curated for You',
  description: "Seoul's best-kept skincare secrets. Premium K-beauty packages curated for your unique skin.",
  keywords: 'K-beauty, Seoul, skincare, Korean cosmetics, beauty package',
  openGraph: {
    title: 'Seoul Skin Archive - K-Beauty Secrets',
    description: "Seoul's best-kept skincare secrets curated for you",
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
