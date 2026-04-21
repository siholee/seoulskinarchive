'use client';

import { useEffect, useRef, useState } from 'react';
import { Locale } from '@/lib/i18n';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';

type Props = {
  lang: Locale;
  dict: any;
};

const t = (lang: Locale, ko: string, en: string, ja: string) =>
  lang === 'ko' ? ko : lang === 'en' ? en : ja;

const ITEMS = (lang: Locale) => [
  {
    id: 'cleanser',
    name: t(lang, '저자극 클렌저', 'Gentle Cleanser', 'ジェントルクレンザー'),
    sub: t(lang, '피부 장벽 보호', 'Barrier-safe cleansing', 'バリアを守るクレンジング'),
    vol: '150ml',
    color: '#A8C4AC',    // sage-light
  },
  {
    id: 'toner',
    name: t(lang, '에센스 토너', 'Essence Toner', 'エッセンストナー'),
    sub: t(lang, '7겹 수분 충전', '7-layer hydration', '7層保湿'),
    vol: '200ml',
    color: '#C4A882',    // camel
  },
  {
    id: 'ampoule',
    name: t(lang, '시카 앰플', 'Cica Ampoule', 'シカアンプル'),
    sub: t(lang, '진정 & 회복', 'Soothing & Recovery', '鎮静＆回復'),
    vol: '30ml',
    color: '#6B8C6F',    // sage
  },
  {
    id: 'cream',
    name: t(lang, '세라마이드 크림', 'Ceramide Cream', 'セラミドクリーム'),
    sub: t(lang, '장벽 강화', 'Barrier Repair', 'バリア強化'),
    vol: '50ml',
    color: '#7A6652',    // mocha
  },
  {
    id: 'sunscreen',
    name: t(lang, '선크림 SPF50+', 'Sunscreen SPF50+', '日焼け止めSPF50+'),
    sub: t(lang, '무기자차 UV 차단', 'Mineral UV Protection', 'ミネラルUV防御'),
    vol: '50ml',
    color: '#3D2E22',    // espresso
  },
];

export default function BeautyBoxClient({ lang, dict }: Props) {
  const stickyRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0 → 1 as user scrolls through sticky zone
  const items = ITEMS(lang);

  useEffect(() => {
    const onScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const total = container.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      setProgress(Math.max(0, Math.min(1, scrolled / total)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Each item reveals sequentially: item i is fully visible when progress > i/(N+1)
  const N = items.length;
  // "assembled" state when progress approaches 1
  const assembled = progress > 0.85;
  const showPrice = progress > 0.92;

  return (
    <>
      <Header lang={lang} dict={dict} />
      <main className="bg-espresso">

        {/* ── HERO ───────────────────────────────────────────── */}
        <section
          className="flex flex-col items-center justify-center text-center text-cream"
          style={{ minHeight: '100svh', paddingTop: '44px', padding: '44px 24px 80px' }}
        >
          <ScrollReveal>
            <p className="eyebrow text-sage-light mb-6">Seoul Beauty Box</p>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(48px, 9vw, 104px)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: 1.0,
                color: 'var(--cream)',
              }}
            >
              {t(lang, '서울의 피부과가\n당신의 집으로.', "Seoul's dermatology,\ndelivered to you.", 'ソウルの皮膚科が\nあなたの家へ。')
                .split('\n').map((l, i) => <span key={i} style={{ display: 'block' }}>{l}</span>)}
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <p
              className="text-cream/50 mt-8 mx-auto"
              style={{ fontSize: 'clamp(17px, 2.5vw, 22px)', maxWidth: '560px', lineHeight: 1.5, letterSpacing: '-0.01em' }}
            >
              {t(
                lang,
                '매달 피부과 전문의가 선별한 5개 제품이 전 세계 무료 배송으로 도착합니다.',
                'Every month, 5 dermatologist-selected products arrive with free worldwide shipping.',
                '毎月、皮膚科専門医が選んだ5製品が世界中に送料無料で届きます。',
              )}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={450}>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center">
              <a
                href="#box-reveal"
                className="inline-flex items-center justify-center bg-sage text-cream transition-all hover:bg-sage-dark active:scale-95"
                style={{ borderRadius: '980px', padding: '13px 32px', fontSize: '17px', fontWeight: 500 }}
              >
                {t(lang, '박스 구경하기', 'See what\'s inside', 'ボックスを見る')} ↓
              </a>
            </div>
          </ScrollReveal>
        </section>

        {/* ── BOX REVEAL (Sticky scroll) ─────────────────────── */}
        {/* Outer container sets scroll distance */}
        <div
          id="box-reveal"
          ref={containerRef}
          style={{ height: '480vh', position: 'relative' }}
        >
          <div
            ref={stickyRef}
            style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
            className="bg-espresso"
          >
            {/* Section label */}
            <p
              className="eyebrow text-sage-light mb-8 md:mb-12 text-center"
              style={{ fontSize: '11px', opacity: assembled ? 0 : 1, transition: 'opacity 0.5s ease', position: 'absolute', top: '80px', left: 0, right: 0, textAlign: 'center' }}
            >
              {t(lang, '이 달의 박스', 'This Month\'s Box', '今月のボックス')}
            </p>

            {/* Assembled box label */}
            <p
              className="eyebrow text-cream text-center"
              style={{ fontSize: '11px', opacity: assembled ? 1 : 0, transition: 'opacity 0.5s ease', position: 'absolute', top: '80px', left: 0, right: 0, textAlign: 'center' }}
            >
              {t(lang, 'Hydration Recovery Set', 'Hydration Recovery Set', 'Hydration Recovery Set')}
            </p>

            {/* Items */}
            <div
              className="relative w-full"
              style={{ maxWidth: '420px', height: '320px', margin: '0 auto' }}
            >
              {items.map((item, i) => {
                // Each item separates upward by its index offset, then comes back together
                const threshold = (i + 1) / (N + 2);
                const itemProgress = Math.max(0, Math.min(1, (progress - 0) / threshold));
                
                // Spread: items fan out from center. Top items go up, bottom go down.
                const totalItems = N;
                const center = (totalItems - 1) / 2;
                const offset = (i - center) * (assembled ? 0 : Math.min(1, progress * 2) * 56);
                
                // Fade in staggered
                const visible = progress > i * (0.8 / N);
                const opacity = assembled
                  ? 1
                  : visible
                  ? Math.min(1, (progress - i * (0.8 / N)) / 0.12)
                  : 0;

                return (
                  <div
                    key={item.id}
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      transform: `translate(-50%, calc(-50% + ${offset}px))`,
                      transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1), opacity 0.5s ease',
                      opacity,
                      width: '100%',
                      zIndex: assembled ? N - i : i,
                    }}
                  >
                    <div
                      style={{
                        background: assembled
                          ? 'rgba(245,240,232,0.06)'
                          : `linear-gradient(90deg, ${item.color}22, ${item.color}11)`,
                        border: `1px solid ${item.color}55`,
                        borderRadius: '16px',
                        padding: assembled ? '14px 24px' : '16px 24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backdropFilter: 'blur(8px)',
                        transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1)',
                        gap: '16px',
                      }}
                    >
                      {/* Color dot */}
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: item.color, flexShrink: 0 }} />

                      {/* Name */}
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '16px', fontWeight: 600, color: 'var(--cream)', letterSpacing: '-0.01em' }}>
                          {item.name}
                        </div>
                        <div
                          style={{
                            fontSize: '12px',
                            color: 'rgba(245,240,232,0.5)',
                            letterSpacing: '0.02em',
                            maxHeight: assembled ? '0' : '20px',
                            overflow: 'hidden',
                            transition: 'max-height 0.4s ease',
                          }}
                        >
                          {item.sub}
                        </div>
                      </div>

                      {/* Volume */}
                      <div style={{ fontSize: '13px', color: 'rgba(245,240,232,0.45)', fontWeight: 500, letterSpacing: '0.03em', flexShrink: 0 }}>
                        {item.vol}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Price CTA - fades in after assembled */}
            <div
              style={{
                opacity: showPrice ? 1 : 0,
                transform: `translateY(${showPrice ? 0 : 20}px)`,
                transition: 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1)',
                position: 'absolute',
                bottom: '10vh',
                left: 0,
                right: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px',
                padding: '0 24px',
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(48px, 8vw, 80px)', fontWeight: 700, color: 'var(--cream)', letterSpacing: '-0.04em', lineHeight: 1 }}>
                  $79
                </div>
                <div style={{ fontSize: '14px', color: 'rgba(245,240,232,0.45)', letterSpacing: '0.06em', marginTop: '8px' }}>
                  {t(lang, '/ 월 · 무료 배송 · 언제든 취소', '/ month · Free shipping · Cancel anytime', '/ 月 · 送料無料 · いつでも解約')}
                </div>
              </div>
              <a
                href={`/${lang}/quiz`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'var(--sage)',
                  color: 'var(--cream)',
                  borderRadius: '980px',
                  padding: '14px 40px',
                  fontSize: '17px',
                  fontWeight: 500,
                  letterSpacing: '-0.01em',
                  textDecoration: 'none',
                  transition: 'background 0.2s',
                }}
                onMouseOver={e => (e.currentTarget.style.background = 'var(--sage-dark)')}
                onMouseOut={e => (e.currentTarget.style.background = 'var(--sage)')}
              >
                {t(lang, '지금 구독 시작하기', 'Start My Subscription', '今すぐ購読開始')} →
              </a>
            </div>
          </div>
        </div>

        {/* ── FEATURES ──────────────────────────────────────── */}
        <section className="bg-cream" style={{ padding: '140px 24px' }}>
          <div style={{ maxWidth: '980px', margin: '0 auto' }}>
            <ScrollReveal>
              <p className="eyebrow text-sage mb-20">{t(lang, '왜 다른가', 'Why Different', 'なぜ違うのか')}</p>
            </ScrollReveal>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-12">
              {[
                { title: t(lang, '맞춤 큐레이션', 'Personalized', 'カスタム'), body: t(lang, '퀴즈 결과로 매달 다른 구성', 'Different lineup each month from your quiz', '毎月クイズ結果に基づく構成') },
                { title: t(lang, '전문가 검증', 'Expert Verified', '専門家検証'), body: t(lang, '피부과 전문의 선별', 'Selected by dermatologists', '皮膚科専門医が選定') },
                { title: t(lang, '무료 배송', 'Free Shipping', '送料無料'), body: t(lang, '전 세계 모든 주문', 'All orders worldwide', '全世界全注文') },
                { title: t(lang, '언제든 취소', 'Cancel Anytime', 'いつでも解約'), body: t(lang, '약정 없음', 'No commitment', '契約なし') },
              ].map((f, i) => (
                <ScrollReveal key={i} delay={i * 80}>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 600, color: 'var(--espresso)', letterSpacing: '-0.015em', marginBottom: '12px' }}>
                    {f.title}
                  </h3>
                  <p style={{ fontSize: '15px', color: 'var(--mocha)', lineHeight: 1.7 }}>{f.body}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ─────────────────────────────────── */}
        <section className="bg-sand" style={{ padding: '140px 24px' }}>
          <div style={{ maxWidth: '640px', margin: '0 auto' }}>
            <ScrollReveal>
              <p className="eyebrow text-sage mb-20">{t(lang, '구독 방식', 'How It Works', '購読方法')}</p>
            </ScrollReveal>
            {[
              { num: '01', title: t(lang, '피부 진단', 'Take the Quiz', '肌診断'), body: t(lang, '5분 퀴즈로 피부 타입을 파악합니다.', 'A 5-minute quiz identifies your skin profile.', '5分クイズで肌タイプを把握します。') },
              { num: '02', title: t(lang, '박스 수령', 'Receive Your Box', 'ボックス受け取り'), body: t(lang, '매달 1일, 맞춤 큐레이션이 도착합니다.', 'Your custom curation arrives on the 1st every month.', '毎月1日、カスタムキュレーションが届きます。') },
              { num: '03', title: t(lang, '루틴 시작', 'Start Your Routine', 'ルーティン開始'), body: t(lang, '성분 가이드 카드와 함께 나만의 루틴을 완성하세요.', 'Complete your routine with an ingredient guide card.', '成分ガイドカードとともにルーティンを完成させます。') },
            ].map((s, i) => (
              <ScrollReveal key={i} delay={i * 100} style={{ marginBottom: i < 2 ? '60px' : 0, paddingBottom: i < 2 ? '60px' : 0, borderBottom: i < 2 ? '1px solid rgba(196,168,130,0.2)' : 'none' }}>
                <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '48px', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1, color: 'var(--camel)', opacity: 0.5, flexShrink: 0, minWidth: '60px' }}>
                    {s.num}
                  </span>
                  <div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 700, color: 'var(--espresso)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                      {s.title}
                    </h3>
                    <p style={{ fontSize: '17px', color: 'var(--mocha)', lineHeight: 1.6, letterSpacing: '-0.01em' }}>{s.body}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ── FINAL CTA ─────────────────────────────────────── */}
        <section className="bg-espresso text-cream flex items-center justify-center" style={{ minHeight: '60vh', padding: '120px 24px' }}>
          <div style={{ textAlign: 'center', maxWidth: '680px' }}>
            <ScrollReveal>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(40px, 7vw, 80px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05, color: 'var(--cream)', marginBottom: '24px' }}>
                {t(lang, '첫 박스를\n받아보세요.', 'Get your\nfirst box.', '最初のボックスを\n受け取りましょう。')
                  .split('\n').map((l, i) => <span key={i} style={{ display: 'block' }}>{l}</span>)}
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <p style={{ fontSize: '19px', color: 'rgba(245,240,232,0.55)', lineHeight: 1.5, marginBottom: '48px', letterSpacing: '-0.01em' }}>
                {t(lang, '2026년 런칭 예정 · 지금 사전 등록 시 얼리버드 할인', 'Launching 2026 · Pre-register now for early-bird pricing', '2026年ローンチ予定 · 今すぐ事前登録でアーリーバード割引')}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={250}>
              <a
                href={`/${lang}/quiz`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  background: 'var(--sage)',
                  color: 'var(--cream)',
                  borderRadius: '980px',
                  padding: '14px 40px',
                  fontSize: '17px',
                  fontWeight: 500,
                  letterSpacing: '-0.01em',
                  textDecoration: 'none',
                }}
              >
                {t(lang, '피부 진단 시작하기', 'Start Skin Quiz', '肌診断を始める')} →
              </a>
            </ScrollReveal>
          </div>
        </section>

      </main>
      <Footer lang={lang} dict={dict} />
    </>
  );
}
