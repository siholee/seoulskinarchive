import React from 'react';
import type { Metadata } from 'next';
import { locales, type Locale } from '@/lib/i18n';

type Props = {
  params: Promise<{ lang: Locale }>;
  children: React.ReactNode;
};

const metadataByLang: Record<Locale, Metadata> = {
  ko: {
    title: 'Seoul Skin Archive - K-Beauty Secrets Curated for You',
    description: "서울의 숨겨진 스킨케어 비밀. 당신만을 위한 프리미엄 K-뷰티 패키지.",
    keywords: 'K-beauty, Seoul, skincare, Korean cosmetics, beauty package, 케이뷰티, 서울, 스킨케어',
    openGraph: {
      title: 'Seoul Skin Archive - K-Beauty Secrets',
      description: "서울의 숨겨진 스킨케어 비밀",
      type: 'website',
      locale: 'ko_KR',
    },
  },
  en: {
    title: 'Seoul Skin Archive - K-Beauty Secrets Curated for You',
    description: "Seoul's best-kept skincare secrets. Premium K-beauty packages curated for your unique skin.",
    keywords: 'K-beauty, Seoul, skincare, Korean cosmetics, beauty package',
    openGraph: {
      title: 'Seoul Skin Archive - K-Beauty Secrets',
      description: "Seoul's best-kept skincare secrets curated for you",
      type: 'website',
      locale: 'en_US',
    },
  },
  ja: {
    title: 'Seoul Skin Archive - K-Beauty Secrets Curated for You',
    description: "ソウルの隠れたスキンケアの秘密。あなただけのプレミアムK-ビューティパッケージ。",
    keywords: 'K-beauty, Seoul, skincare, Korean cosmetics, beauty package, Kビューティ, ソウル, スキンケア',
    openGraph: {
      title: 'Seoul Skin Archive - K-Beauty Secrets',
      description: "ソウルの隠れたスキンケアの秘密",
      type: 'website',
      locale: 'ja_JP',
    },
  },
};

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return metadataByLang[lang] || metadataByLang.ko;
}

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params;

  return (
    <html lang={lang}>
      <body>{children}</body>
    </html>
  );
}
