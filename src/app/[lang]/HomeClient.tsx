'use client';

import { useState } from 'react';
import { Locale } from '@/lib/i18n';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuizModal from '@/components/QuizModal';
import RegisterForm from '@/components/RegisterForm';
import ScrollReveal from '@/components/ScrollReveal';

type Props = {
  lang: Locale;
  dict: Awaited<ReturnType<typeof import('@/lib/i18n').getDictionary>>;
};

const t = (lang: Locale, ko: string, en: string, ja: string) =>
  lang === 'ko' ? ko : lang === 'en' ? en : ja;

const MARQUEE_ITEMS = [
  '피부과 전문의 검증', '글로벌 배송', '맞춤형 큐레이션', '프리미엄 K-뷰티',
  '월 1회 정기 배송', '성분 투명 공개', '100% 진정성', '30일 보장',
  '피부과 전문의 검증', '글로벌 배송', '맞춤형 큐레이션', '프리미엄 K-뷰티',
  '월 1회 정기 배송', '성분 투명 공개', '100% 진정성', '30일 보장',
];

export default function HomeClient({ lang, dict }: Props) {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [quizResult, setQuizResult] = useState<string | null>(null);

  const handleQuizComplete = (result: string) => {
    setQuizResult(result);
    setIsQuizOpen(false);
    setTimeout(() => {
      document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <>
      <Header lang={lang} dict={dict} />

      {/* ANNOUNCEMENT BAR */}
      <div style={{ background: 'var(--espresso)', color: 'var(--camel)', textAlign: 'center', padding: '10px 1rem', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500 }}>
        <strong style={{ color: 'var(--cream)' }}>
          {t(lang, '사전 등록 시 첫 박스 30% 할인', 'Pre-register for 30% off your first box', '事前登録で初回ボックス30%オフ')}
        </strong>
        {t(lang, ' · 2026년 런칭 예정 · 지금 등록하세요', ' · Launching 2026 · Register now', ' · 2026年ローンチ予定 · 今すぐ登録')}
      </div>

      <main>

        {/* HERO */}
        <section style={{ minHeight: '100svh', background: 'var(--espresso)', display: 'grid', gridTemplateColumns: '1fr 1fr', paddingTop: '56px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at 70% 30%, rgba(107,140,111,0.12) 0%, transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(196,168,130,0.08) 0%, transparent 50%)' }} />

          {/* Left */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '6rem 4rem 6rem 7%', position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(196,168,130,0.4)', borderRadius: '50px', padding: '6px 16px', fontSize: '11px', letterSpacing: '0.12em', color: 'var(--camel)', textTransform: 'uppercase', marginBottom: '2rem', width: 'fit-content' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--sage-light)', flexShrink: 0 }} />
              {dict.hero.badge}
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(44px, 5vw, 74px)', fontWeight: 700, color: 'var(--cream)', letterSpacing: '-0.03em', lineHeight: 1.08, marginBottom: '1.75rem' }}>
              {dict.hero.title}<br />
              <em style={{ fontStyle: 'italic', color: 'var(--sage-light)' }}>{dict.hero.titleEm}</em>
            </h1>
            <p style={{ fontSize: '17px', lineHeight: 1.6, color: 'rgba(245,240,232,0.65)', maxWidth: '480px', marginBottom: '2.5rem' }}>
              {dict.hero.description}
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
              <button onClick={() => setIsQuizOpen(true)} style={{ background: 'var(--sage)', color: 'var(--cream)', border: 'none', borderRadius: '980px', padding: '14px 32px', fontSize: '16px', fontWeight: 500, cursor: 'pointer', letterSpacing: '-0.01em' }}>
                {dict.hero.ctaPrimary}
              </button>
              <a href={`/${lang}/beauty-box`} style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--sage-light)', border: '1px solid rgba(168,196,172,0.3)', borderRadius: '980px', padding: '14px 32px', fontSize: '16px', textDecoration: 'none' }}>
                {dict.hero.ctaSecondary} →
              </a>
            </div>
            <div style={{ display: 'flex', gap: '3rem' }}>
              {[
                { num: '2026', label: dict.stats.launch },
                { num: '12+', label: dict.stats.boxes },
                { num: '100%', label: dict.stats.kbeauty },
              ].map((s) => (
                <div key={s.label}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 700, color: 'var(--cream)', letterSpacing: '-0.04em', lineHeight: 1 }}>{s.num}</div>
                  <div style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--camel)', marginTop: '6px' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Box card */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 7% 4rem 3rem', position: 'relative', zIndex: 1 }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: '420px' }}>
              <div style={{ position: 'absolute', top: '-1.5rem', left: '-1rem', background: 'rgba(107,140,111,0.15)', backdropFilter: 'blur(12px)', border: '1px solid rgba(107,140,111,0.3)', borderRadius: '12px', padding: '10px 16px', zIndex: 2 }}>
                <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--sage-light)' }}>✓ {t(lang, '피부과 전문의 검증', 'Dermatologist Verified', '皮膚科専門医検証')}</div>
                <div style={{ fontSize: '11px', color: 'rgba(168,196,172,0.7)', marginTop: '2px' }}>{t(lang, '성분 분석 완료', 'Ingredient analyzed', '成分分析完了')}</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(196,168,130,0.2)', borderRadius: '24px', padding: '2.5rem', backdropFilter: 'blur(20px)' }}>
                <div style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--camel)', marginBottom: '1rem' }}>
                  {t(lang, '이달의 큐레이션 박스', "This Month's Curation Box", '今月のキュレーションボックス')}
                </div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px, 2.5vw, 30px)', fontWeight: 700, color: 'var(--cream)', lineHeight: 1.2, marginBottom: '2rem' }}>
                  Hydration<br />Recovery Set
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { color: '#6B8C6F', name: t(lang, '시카 앰플', 'Cica Ampoule', 'シカアンプル'), type: t(lang, '진정', 'Soothing', '鎮静') },
                    { color: '#C4A882', name: t(lang, '세라마이드 크림', 'Ceramide Cream', 'セラミドクリーム'), type: t(lang, '장벽 강화', 'Barrier Repair', 'バリア強化') },
                    { color: '#7A6652', name: t(lang, '에센스 토너', 'Essence Toner', 'エッセンストナー'), type: t(lang, '수분 충전', 'Hydration', '水分充填') },
                    { color: '#A8C4AC', name: t(lang, '선크림 SPF50+', 'Sunscreen SPF50+', 'サンクリーム SPF50+'), type: t(lang, '자외선 차단', 'UV Protection', '紫外線防止') },
                  ].map((item) => (
                    <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '10px 14px' }}>
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: item.color, flexShrink: 0 }} />
                      <span style={{ fontSize: '14px', color: 'var(--cream)', flex: 1 }}>{item.name}</span>
                      <span style={{ fontSize: '11px', color: 'var(--camel)', letterSpacing: '0.05em' }}>{item.type}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ position: 'absolute', bottom: '-1.5rem', right: '-1rem', background: 'rgba(61,46,34,0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(196,168,130,0.25)', borderRadius: '12px', padding: '10px 16px', zIndex: 2 }}>
                <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--cream)' }}>{t(lang, '이번 달 큐레이션', "This month's pick", '今月のキュレーション')}</div>
                <div style={{ fontSize: '11px', color: 'var(--camel)', marginTop: '2px' }}>{t(lang, '건성 피부 · 30대 케어', 'Dry skin · 30s care', '乾燥肌・30代ケア')}</div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS STRIP */}
        <div style={{ background: 'var(--espresso)', borderTop: '1px solid rgba(196,168,130,0.15)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', maxWidth: '1100px', margin: '0 auto' }}>
            {[
              { num: '2,400+', label: t(lang, '사전 등록 신청', 'Pre-registrations', '事前登録申請') },
              { num: '38', label: t(lang, '배송 가능 국가', 'Countries served', '配送可能国') },
              { num: '4.9', label: t(lang, '베타 테스터 평점', 'Beta tester rating', 'ベータテスター評価') },
              { num: '30일', label: t(lang, '환불 보장', 'Day refund guarantee', '日返金保証') },
            ].map((s, i) => (
              <div key={s.label} style={{ textAlign: 'center', padding: '4rem 1rem', borderRight: i < 3 ? '1px solid rgba(196,168,130,0.15)' : 'none' }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(40px, 5vw, 72px)', fontWeight: 700, color: 'var(--cream)', letterSpacing: '-0.04em', lineHeight: 1 }}>{s.num}</div>
                <div style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--camel)', marginTop: '10px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* MARQUEE */}
        <div style={{ background: 'var(--sage)', padding: '18px 0', overflow: 'hidden', whiteSpace: 'nowrap' }}>
          <div style={{ display: 'inline-flex', animation: 'marquee 30s linear infinite' }}>
            {MARQUEE_ITEMS.map((item, i) => (
              <span key={i} style={{ display: 'inline-block', padding: '0 2.5rem', fontSize: '12px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--cream)', borderRight: '1px solid rgba(245,240,232,0.25)' }}>
                {item}
              </span>
            ))}
          </div>
          <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
        </div>

        {/* PRODUCT SECTION */}
        <section style={{ background: 'var(--cream)', padding: '7rem 7%' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
            <ScrollReveal from="up">
              <div style={{ background: 'var(--sand)', borderRadius: '24px', padding: '2.5rem' }}>
                <div style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--mocha)', marginBottom: '1rem' }}>
                  {t(lang, 'Hydration Box · 5월 큐레이션', 'Hydration Box · May Curation', 'Hydration Box · 5月キュレーション')}
                </div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 700, color: 'var(--espresso)', lineHeight: 1.2, marginBottom: '2rem' }}>
                  {t(lang, '수분 집중 케어 루틴 세트', 'Hydration Intensive Care Routine Set', '水分集中ケアルーティンセット')}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {[
                    { name: t(lang, '히알루론산', 'Hyaluronic Acid', 'ヒアルロン酸'), benefit: t(lang, '수분 충전', 'Hydration', '水分充填') },
                    { name: t(lang, '시카 성분', 'Cica Extract', 'シカ成分'), benefit: t(lang, '진정·재생', 'Soothing·Repair', '鎮静・再生') },
                    { name: t(lang, '세라마이드', 'Ceramide', 'セラミド') , benefit: t(lang, '장벽 강화', 'Barrier Repair', 'バリア強化') },
                    { name: t(lang, '나이아신아마이드', 'Niacinamide', 'ナイアシンアミド'), benefit: t(lang, '미백·모공', 'Brightening', '美白') },
                    { name: t(lang, '레티놀 0.1%', 'Retinol 0.1%', 'レチノール0.1%'), benefit: t(lang, '탄력·항노화', 'Anti-aging', 'アンチエイジング') },
                  ].map((ing, i, arr) => (
                    <div key={ing.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: i < arr.length - 1 ? '1px solid rgba(122,102,82,0.12)' : 'none' }}>
                      <span style={{ fontSize: '14px', color: 'var(--espresso)', fontWeight: 500 }}>{ing.name}</span>
                      <span style={{ fontSize: '12px', color: 'var(--mocha)', background: 'rgba(122,102,82,0.08)', borderRadius: '20px', padding: '3px 10px' }}>{ing.benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal from="up" delay={150}>
              <div>
                <p style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--sage)', fontWeight: 600, marginBottom: '1.25rem' }}>
                  {t(lang, '성분 투명 공개', 'Ingredient Transparency', '成分透明公開')}
                </p>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 700, color: 'var(--espresso)', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1.5rem' }}>
                  {t(lang, '무엇을 바르는지', 'Know exactly what', '何を塗るか')}<br />
                  <em style={{ fontStyle: 'italic', color: 'var(--sage)' }}>{t(lang, '정확히 알고 쓰세요', "you're putting on your skin", '正確に知って使う')}</em>
                </h2>
                <p style={{ fontSize: '16px', lineHeight: 1.7, color: 'var(--mocha)', marginBottom: '2rem' }}>
                  {t(lang, '서울스킨아카이브는 모든 제품의 핵심 성분과 그 작용 원리를 투명하게 공개합니다. 숨겨진 성분 없이, 당신이 피부에 바르는 것을 완전히 이해할 수 있도록 합니다.', 'Seoul Skin Archive transparently discloses all key ingredients and their mechanisms. No hidden formulas — so you fully understand what you put on your skin.', 'すべての製品の主要成分とその作用原理を透明に公開します。')}
                </p>
                {[
                  t(lang, '피부과 전문의가 직접 성분을 검토하고 선별', 'Dermatologist-reviewed and curated ingredients', '皮膚科専門医が直接成分をレビューし選別'),
                  t(lang, '독점 성분 배합 없음 — 모든 구성 투명 공개', 'No proprietary blends — every ingredient disclosed', '独占成分配合なし — すべての構成を透明公開'),
                  t(lang, '피부 타입별 최적화된 성분 조합으로 구성', 'Optimized ingredient combinations for your skin type', '肌タイプ別に最適化された成分の組み合わせ'),
                ].map((b) => (
                  <div key={b} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--sage)', flexShrink: 0, marginTop: '7px' }} />
                    <span style={{ fontSize: '15px', color: 'var(--mocha)', lineHeight: 1.5 }}>{b}</span>
                  </div>
                ))}
                <button onClick={() => setIsQuizOpen(true)} style={{ marginTop: '2rem', background: 'var(--espresso)', color: 'var(--cream)', border: 'none', borderRadius: '980px', padding: '14px 32px', fontSize: '15px', fontWeight: 500, cursor: 'pointer' }}>
                  {t(lang, '피부 진단 시작하기', 'Start Skin Analysis', '肌診断を始める')}
                </button>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section style={{ background: 'var(--espresso)', padding: '7rem 7%' }} id="how">
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <ScrollReveal>
              <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <p style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--sage-light)', marginBottom: '1rem' }}>
                  {t(lang, '서비스 소개', 'How It Works', 'サービス紹介')}
                </p>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 700, color: 'var(--cream)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                  {t(lang, '3단계로 완성하는', '3 Simple Steps to', '3ステップで完成する')}<br />
                  <em style={{ fontStyle: 'italic', color: 'var(--sage-light)' }}>{t(lang, '맞춤형 K-뷰티', 'Perfect K-Beauty Skin', 'オーダーメイドK-ビューティ')}</em>
                </h2>
              </div>
            </ScrollReveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(196,168,130,0.15)', borderRadius: '20px', overflow: 'hidden' }}>
              {[
                { num: '01', icon: '📋', title: t(lang, '피부 진단', 'Skin Analysis', '肌診断'), desc: t(lang, '5분 퀴즈로 피부 타입, 고민사항, 라이프스타일을 분석합니다. 전문가 알고리즘이 당신의 피부를 정확히 파악합니다.', 'A 5-minute quiz analyzes skin type, concerns, and lifestyle. Expert algorithms precisely identify what your skin needs.', '5分クイズで肌タイプ、悩み、ライフスタイルを分析します。') },
                { num: '02', icon: '🌿', title: t(lang, 'K-뷰티 큐레이션', 'K-Beauty Curation', 'K-ビューティキュレーション'), desc: t(lang, '서울의 숨겨진 브랜드들 중에서 피부에 꼭 맞는 제품들을 피부과 전문의와 함께 선별합니다.', "We handpick products from Seoul's hidden brands with dermatologists, matched to your exact skin profile.", 'ソウルの隠れたブランドから皮膚科専門医と共に肌に合った製品を厳選します。') },
                { num: '03', icon: '📦', title: t(lang, '정기 배송', 'Monthly Delivery', '定期配送'), desc: t(lang, '매달 새로운 큐레이션 박스가 전 세계 어디든 배송됩니다. 피부 변화에 따라 루틴도 함께 업데이트됩니다.', 'A freshly curated box ships worldwide every month. Your routine updates as your skin evolves.', '毎月新しくキュレーションされたボックスが世界中に配送されます。') },
              ].map((step, i) => (
                <ScrollReveal key={step.num} delay={i * 100}>
                  <div style={{ background: 'var(--espresso)', padding: '3rem 2.5rem' }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '72px', fontWeight: 700, color: 'rgba(196,168,130,0.2)', lineHeight: 1, marginBottom: '1.5rem' }}>{step.num}</div>
                    <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{step.icon}</div>
                    <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--cream)', marginBottom: '1rem', letterSpacing: '-0.01em' }}>{step.title}</h3>
                    <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'rgba(245,240,232,0.55)' }}>{step.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section style={{ background: 'var(--sand)', padding: '7rem 7%' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <ScrollReveal>
              <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <p style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: '1rem' }}>
                  {t(lang, '베타 테스터 후기', 'Beta Tester Reviews', 'ベータテスターレビュー')}
                </p>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 700, color: 'var(--espresso)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                  {t(lang, '직접 써봤습니다.', 'They tried it.', '実際に使いました。')}<br />
                  <em style={{ fontStyle: 'italic', color: 'var(--sage)' }}>{t(lang, '변화를 느꼈습니다.', 'They felt the difference.', '変化を感じました。')}</em>
                </h2>
              </div>
            </ScrollReveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
              {[
                { text: t(lang, '서울스킨아카이브 덕분에 한국에 있는 친구들도 모르는 제품을 먼저 써봤어요. 피부가 확실히 달라졌습니다.', "Thanks to Seoul Skin Archive, I tried products even my Korean friends hadn't heard of. My skin has genuinely transformed.", 'ソウルスキンアーカイブのおかげで肌が確実に変わりました。'), name: 'Sarah K.', meta: t(lang, '뉴욕 · 건성 피부', 'New York · Dry Skin', 'ニューヨーク・乾燥肌'), initial: 'S' },
                { text: t(lang, '성분 설명이 정말 꼼꼼해요. 어떤 성분이 왜 좋은지 이해하고 쓰게 되니까 훨씬 효과적인 것 같아요.', 'The ingredient explanations are incredibly detailed. Understanding why each ingredient works makes the routine far more effective.', '成分の説明がとても丁寧で、理解してから使うとはるかに効果的に感じます。'), name: '김지연', meta: t(lang, '도쿄 · 복합성 피부', 'Tokyo · Combination Skin', '東京・混合肌'), initial: '김' },
                { text: t(lang, 'K-뷰티를 좋아하지만 어떤 걸 사야 할지 늘 막막했는데, 이제는 믿고 기다리기만 하면 돼요.', "I've always loved K-beauty but never knew what to buy. Now I just wait for my box and trust the curation.", 'K-ビューティが好きでも何を買えばいいか分からなかったですが、今はボックスを待つだけで信頼できます。'), name: 'Mei L.', meta: t(lang, '싱가포르 · 지성 피부', 'Singapore · Oily Skin', 'シンガポール・脂性肌'), initial: 'M' },
              ].map((review) => (
                <ScrollReveal key={review.name}>
                  <div style={{ background: 'var(--cream)', borderRadius: '20px', padding: '2.5rem' }}>
                    <div style={{ color: 'var(--sage)', fontSize: '18px', letterSpacing: '2px', marginBottom: '1.25rem' }}>★★★★★</div>
                    <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'var(--mocha)', marginBottom: '2rem', fontStyle: 'italic' }}>
                      &ldquo;{review.text}&rdquo;
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'var(--sage)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--cream)', fontWeight: 600, fontSize: '14px', flexShrink: 0 }}>
                        {review.initial}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--espresso)', fontSize: '14px' }}>{review.name}</div>
                        <div style={{ fontSize: '12px', color: 'var(--mocha)' }}>{review.meta}</div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* REGISTER */}
        <section id="register" style={{ background: 'var(--cream)', padding: '7rem 7%' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <ScrollReveal>
              <p style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: '1.25rem' }}>
                {t(lang, '사전 등록', 'Pre-Registration', '事前登録')}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 700, color: 'var(--espresso)', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '1rem' }}>
                {t(lang, '출시 소식을', 'Be the', '출시 소식을')}<br />
                <em style={{ fontStyle: 'italic', color: 'var(--sage)' }}>{t(lang, '가장 먼저 받아보세요', 'first to know.', '가장 먼저 받아보세요')}</em>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={180}>
              <p style={{ fontSize: '16px', lineHeight: 1.6, color: 'var(--mocha)', marginBottom: '3rem' }}>
                {t(lang, '사전 등록 시 첫 박스 30% 할인 + 무료 피부 진단 리포트. 지금 등록하고 서울의 뷰티 시크릿을 가장 먼저 경험하세요.', "Pre-register for 30% off your first box + a free skin diagnosis report. Be first to experience Seoul's beauty secrets.", '事前登録で初回ボックス30%オフ＋無料肌診断レポート。今すぐ登録してください。')}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={260}>
              <RegisterForm quizResult={quizResult} lang={lang} />
            </ScrollReveal>
            <ScrollReveal delay={340}>
              <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
                {[
                  t(lang, '30일 환불 보장', '30-Day Refund', '30日返金保証'),
                  t(lang, '스팸 없음', 'No Spam', 'スパムなし'),
                  t(lang, '언제든 취소', 'Cancel Anytime', 'いつでもキャンセル'),
                  t(lang, '첫 박스 30% 할인', '30% First Box', '初回30%オフ'),
                ].map((g) => (
                  <span key={g} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--mocha)' }}>
                    <span style={{ color: 'var(--sage)', fontWeight: 700 }}>✓</span> {g}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

      </main>

      <Footer lang={lang} dict={dict} />
      <QuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} onComplete={handleQuizComplete} lang={lang} />
    </>
  );
}