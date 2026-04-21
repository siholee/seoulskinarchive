'use client';

import Link from 'next/link';
import { ShoppingBag, User, Globe, Menu, X } from 'lucide-react';
import { useState } from 'react';

const LANGS = [
  { label: '한국어', code: 'ko' },
  { label: 'EN', code: 'en' },
  { label: '日本語', code: 'ja' },
];

export default function Navbar() {
  const [currentLang, setCurrentLang] = useState(0);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-[300] bg-[#3D2E22] border-b border-[#5a4535]">
      {/* Desktop */}
      <nav className="hidden md:flex items-center justify-between h-16 px-8 lg:px-16">

        {/* Left */}
        <div className="flex items-center gap-10 w-1/3">
          <Link href="/about" className="text-[12px] tracking-[0.14em] uppercase text-[#C4A882] hover:text-[#F5F0E8] transition-colors duration-200">
            About
          </Link>
          <Link href="/beauty-box" className="text-[12px] tracking-[0.14em] uppercase text-[#C4A882] hover:text-[#F5F0E8] transition-colors duration-200">
            Beauty Box
          </Link>
        </div>

        {/* Center — always cream, no hover color change */}
        <div className="flex flex-col items-center justify-center w-1/3">
          <Link href="/" className="flex flex-col items-center gap-1">
            <span className="text-[20px] tracking-[0.24em] font-semibold text-[#F5F0E8]" style={{ fontFamily: "'Playfair Display', serif" }}>
              SSA
            </span>
            <span className="text-[9px] tracking-[0.2em] text-[#C4A882] uppercase">
              Seoul Skin Archive
            </span>
          </Link>
        </div>

        {/* Right */}
        <div className="flex items-center justify-end gap-6 w-1/3">
          {/* Language */}
          <div className="relative">
            <button
              onClick={() => setLangOpen((v) => !v)}
              aria-label="언어 선택"
              className="flex items-center gap-2 text-[#C4A882] hover:text-[#F5F0E8] transition-colors duration-200"
            >
              <Globe size={20} strokeWidth={1.5} />
              <span className="text-[12px] tracking-[0.1em]">{LANGS[currentLang].label}</span>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 bg-[#3D2E22] border border-[#5a4535] rounded-lg shadow-xl overflow-hidden min-w-[110px]">
                {LANGS.map((lang, i) => (
                  <button
                    key={lang.code}
                    onClick={() => { setCurrentLang(i); setLangOpen(false); }}
                    className={`block w-full px-5 py-3 text-left text-[12px] tracking-[0.1em] transition-colors duration-150 ${
                      i === currentLang ? 'text-[#F5F0E8] bg-[#5a4535]' : 'text-[#C4A882] hover:text-[#F5F0E8] hover:bg-[#4a3828]'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link href="/cart" aria-label="장바구니" className="text-[#C4A882] hover:text-[#F5F0E8] transition-colors duration-200">
            <ShoppingBag size={20} strokeWidth={1.5} />
          </Link>

          <Link href="/mypage" aria-label="마이페이지" className="text-[#C4A882] hover:text-[#F5F0E8] transition-colors duration-200">
            <User size={20} strokeWidth={1.5} />
          </Link>
        </div>
      </nav>

      {/* Mobile */}
      <div className="md:hidden flex items-center justify-between h-14 px-5">
        {/* Left — hamburger */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="메뉴"
          className="text-[#C4A882] hover:text-[#F5F0E8] transition-colors"
        >
          {mobileOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
        </button>

        {/* Center — brand */}
        <Link href="/" className="flex flex-col items-center gap-0.5 absolute left-1/2 -translate-x-1/2">
          <span className="text-[17px] tracking-[0.22em] font-semibold text-[#F5F0E8]" style={{ fontFamily: "'Playfair Display', serif" }}>
            SSA
          </span>
          <span className="text-[8px] tracking-[0.18em] text-[#C4A882] uppercase">Seoul Skin Archive</span>
        </Link>

        {/* Right — cart + user */}
        <div className="flex items-center gap-4">
          <Link href="/cart" aria-label="장바구니" className="text-[#C4A882] hover:text-[#F5F0E8] transition-colors">
            <ShoppingBag size={20} strokeWidth={1.5} />
          </Link>
          <Link href="/mypage" aria-label="마이페이지" className="text-[#C4A882] hover:text-[#F5F0E8] transition-colors">
            <User size={20} strokeWidth={1.5} />
          </Link>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#3D2E22] border-t border-[#5a4535]">
          <div className="px-6 py-6 flex flex-col gap-6">
            <Link href="/about" onClick={() => setMobileOpen(false)} className="text-[14px] tracking-[0.14em] uppercase text-[#C4A882] hover:text-[#F5F0E8] transition-colors">
              About
            </Link>
            <Link href="/beauty-box" onClick={() => setMobileOpen(false)} className="text-[14px] tracking-[0.14em] uppercase text-[#C4A882] hover:text-[#F5F0E8] transition-colors">
              Beauty Box
            </Link>
            <div className="border-t border-[#5a4535] pt-5 flex gap-5">
              {LANGS.map((lang, i) => (
                <button
                  key={lang.code}
                  onClick={() => { setCurrentLang(i); setMobileOpen(false); }}
                  className={`text-[13px] tracking-[0.1em] transition-colors ${i === currentLang ? 'text-[#F5F0E8]' : 'text-[#C4A882]'}`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

