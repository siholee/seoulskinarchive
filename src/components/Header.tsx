'use client';

import { Locale } from '@/lib/i18n';
import { useState } from 'react';

type Props = {
  lang: Locale;
  dict: any;
};

const LOCALES = [
  { code: 'ko', label: '한국어' },
  { code: 'en', label: 'EN' },
  { code: 'ja', label: '日本語' },
];

export default function Header({ lang, dict }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-espresso/90 backdrop-blur-xl">
      <div
        className="max-w-[980px] mx-auto px-4"
        style={{ height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        {/* Logo */}
        <a
          href={`/${lang}`}
          className="text-cream/90 hover:text-cream transition-colors"
          style={{ fontSize: '17px', fontWeight: 400, letterSpacing: '-0.01em' }}
        >
          SSA
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center" style={{ gap: '0' }}>
          {[
            { href: `/${lang}/about`, label: dict.nav.brandStory },
            { href: `/${lang}/beauty-box`, label: dict.nav.beautyBox },
            { href: `/${lang}/blog`, label: dict.nav.blog },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-cream/80 hover:text-cream transition-colors px-4"
              style={{ fontSize: '12px', letterSpacing: '0.01em' }}
            >
              {item.label}
            </a>
          ))}
          <a
            href={`/${lang}/quiz`}
            className="text-sage-light hover:text-cream transition-colors px-4"
            style={{ fontSize: '12px', letterSpacing: '0.01em' }}
          >
            {dict.nav.skinQuiz}
          </a>
        </nav>

        {/* Lang + Mobile */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-3">
            {LOCALES.map((l) => (
              <a
                key={l.code}
                href={`/${l.code}`}
                className={`transition-colors ${l.code === lang ? 'text-cream' : 'text-cream/40 hover:text-cream/70'}`}
                style={{ fontSize: '11px' }}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="메뉴"
          >
            <span className={`block w-5 h-px bg-cream transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
            <span className={`block w-5 h-px bg-cream transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px bg-cream transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-espresso border-t border-cream/10">
          <div className="max-w-[980px] mx-auto px-4 py-6 flex flex-col gap-5">
            {[
              { href: `/${lang}/about`, label: dict.nav.brandStory },
              { href: `/${lang}/beauty-box`, label: dict.nav.beautyBox },
              { href: `/${lang}/blog`, label: dict.nav.blog },
              { href: `/${lang}/quiz`, label: dict.nav.skinQuiz },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-cream/80 hover:text-cream transition-colors text-xl"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="flex gap-4 pt-2 border-t border-cream/10">
              {LOCALES.map((l) => (
                <a
                  key={l.code}
                  href={`/${l.code}`}
                  className={`text-sm ${l.code === lang ? 'text-cream' : 'text-cream/40'}`}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
