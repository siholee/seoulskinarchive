'use client';

import { useState } from 'react';
import QuizModal from '@/components/QuizModal';
import RegisterForm from '@/components/RegisterForm';
import BlogSection from '@/components/BlogSection';
import styles from './page.module.css';

const MARQUEE_ITEMS = [
  '피부과 전문의 검증', '글로벌 배송', '맞춤형 큐레이션', '프리미엄 K-뷰티',
  '월 1회 정기 배송', '성분 투명 공개', '100% 진정성', '30일 보장',
  '피부과 전문의 검증', '글로벌 배송', '맞춤형 큐레이션', '프리미엄 K-뷰티',
  '월 1회 정기 배송', '성분 투명 공개', '100% 진정성', '30일 보장',
];

const TESTIMONIALS = [
  {
    text: '서울스킨아카이브 덕분에 한국에 있는 친구들도 모르는 제품을 먼저 써봤어요. 피부가 확실히 달라졌습니다.',
    name: 'Sarah K.',
    meta: '뉴욕 · 건성 피부',
    initial: 'S',
  },
  {
    text: '성분 설명이 정말 꼼꼼해요. 어떤 성분이 왜 좋은지 이해하고 쓰게 되니까 훨씬 효과적인 것 같아요.',
    name: '김지연',
    meta: '도쿄 · 복합성 피부',
    initial: '김',
  },
  {
    text: 'K-뷰티를 좋아하지만 어떤 걸 사야 할지 늘 막막했는데, 이제는 믿고 기다리기만 하면 돼요.',
    name: 'Mei L.',
    meta: '싱가포르 · 지성 피부',
    initial: 'M',
  },
];

export default function Home() {
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
      {/* ANNOUNCEMENT BAR */}
      <div className={styles.announcementBar}>
        <strong>사전 등록 시 첫 박스 30% 할인</strong> · 2026년 런칭 예정 · 지금 등록하세요
      </div>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <div className={styles.heroBadge}>
            <span />
            30대 이후를 위한 K-뷰티 큐레이션
          </div>
          <h1 className={styles.heroTitle}>
            No Guesswork.<br />
            <em>Better Skin.</em>
          </h1>
          <p className={styles.heroDesc}>
            서울 강남 피부과에서 검증된 K-뷰티 제품을 매달 큐레이션하여
            전 세계로 배송합니다. 당신의 피부 타입에 딱 맞는 루틴.
          </p>
          <div className={styles.heroActions}>
            <button className={styles.btnPrimary} onClick={() => setIsQuizOpen(true)}>
              지금 사전 등록하기
            </button>
            <button
              className={styles.btnSecondary}
              onClick={() => document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' })}
            >
              서비스 알아보기 →
            </button>
          </div>
          <div className={styles.heroStats}>
            <div>
              <div className={styles.statNum}>2026</div>
              <div className={styles.statLabel}>런칭 예정</div>
            </div>
            <div>
              <div className={styles.statNum}>12+</div>
              <div className={styles.statLabel}>큐레이션 박스</div>
            </div>
            <div>
              <div className={styles.statNum}>100%</div>
              <div className={styles.statLabel}>K-뷰티</div>
            </div>
          </div>
        </div>

        <div className={styles.heroRight}>
          <div className={styles.heroVisual}>
            <div className={styles.floatingTag + ' ' + styles.left}>
              <div>✓ 피부과 전문의 검증</div>
              <div className={styles.tagSmall}>성분 분석 완료</div>
            </div>
            <div className={styles.boxCard}>
              <div className={styles.boxLabel}>이달의 큐레이션 박스</div>
              <div className={styles.boxTitle}>
                Hydration<br />Recovery Set
              </div>
              <div className={styles.boxItems}>
                {[
                  { color: '#6B8C6F', name: '시카 앰플', type: '진정' },
                  { color: '#C4A882', name: '세라마이드 크림', type: '장벽 강화' },
                  { color: '#7A6652', name: '에센스 토너', type: '수분 충전' },
                  { color: '#A8C4AC', name: '선크림 SPF50+', type: '자외선 차단' },
                ].map((item) => (
                  <div key={item.name} className={styles.boxItem}>
                    <div className={styles.boxItemDot} style={{ background: item.color }} />
                    <span className={styles.boxItemName}>{item.name}</span>
                    <span className={styles.boxItemType}>{item.type}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.floatingTag + ' ' + styles.right}>
              <div>이번 달 큐레이션</div>
              <div className={styles.tagSmall}>건성 피부 · 30대 케어</div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <div className={styles.statsStrip}>
        {[
          { num: '2,400+', label: '사전 등록 신청' },
          { num: '38개국', label: '배송 가능 국가' },
          { num: '4.9/5', label: '베타 테스터 평점' },
          { num: '30일', label: '환불 보장' },
        ].map((s) => (
          <div key={s.label} className={styles.stripStat}>
            <div className={styles.stripNum}>{s.num}</div>
            <div className={styles.stripLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* MARQUEE */}
      <div className={styles.marqueeSection}>
        <div className={styles.marqueeTrack}>
          {MARQUEE_ITEMS.map((item, i) => (
            <span key={i} className={styles.marqueeItem}>{item}</span>
          ))}
        </div>
      </div>

      {/* PRODUCT SECTION 1 */}
      <section className={styles.productSection}>
        <div className={styles.productLayout}>
          <div className={styles.productVisual}>
            <div className={styles.productVisualInner}>
              <div className={styles.productVisualCard}>
                <div className={styles.productVisualLabel}>Hydration Box · 5월 큐레이션</div>
                <div className={styles.productVisualTitle}>
                  수분 집중 케어<br />루틴 세트
                </div>
                <div className={styles.ingredientList}>
                  {[
                    { name: '히알루론산', benefit: '수분 충전' },
                    { name: '시카 성분', benefit: '진정·재생' },
                    { name: '세라마이드', benefit: '장벽 강화' },
                    { name: '나이아신아마이드', benefit: '미백·모공' },
                    { name: '레티놀 0.1%', benefit: '탄력·항노화' },
                  ].map((ing) => (
                    <div key={ing.name} className={styles.ingredientRow}>
                      <span className={styles.ingredientName}>{ing.name}</span>
                      <span className={styles.ingredientBenefit}>{ing.benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.productInfo}>
            <div className={styles.productEyebrow}>성분 투명 공개</div>
            <h2 className={styles.productTitle}>
              무엇을 바르는지<br />
              <em>정확히 알고 쓰세요</em>
            </h2>
            <p className={styles.productDesc}>
              서울스킨아카이브는 모든 제품의 핵심 성분과 그 작용 원리를
              투명하게 공개합니다. 숨겨진 성분 없이, 당신이 피부에
              바르는 것을 완전히 이해할 수 있도록 합니다.
            </p>
            <div className={styles.benefitList}>
              {[
                '피부과 전문의가 직접 성분을 검토하고 선별',
                '독점 성분 배합 없음 — 모든 구성 투명 공개',
                '피부 타입별 최적화된 성분 조합으로 구성',
              ].map((b) => (
                <div key={b} className={styles.benefitItem}>
                  <div className={styles.benefitDot} />
                  <span className={styles.benefitText}>{b}</span>
                </div>
              ))}
            </div>
            <button className={styles.btnPrimary} onClick={() => setIsQuizOpen(true)}>
              피부 진단 시작하기
            </button>
          </div>
        </div>
      </section>

      {/* PRODUCT SECTION 2 (reversed) */}
      <section className={styles.productSection} style={{ background: 'var(--sand)', paddingTop: '0' }}>
        <div className={`${styles.productLayout} ${styles.reverse}`}>
          <div className={styles.productVisual} style={{ background: 'var(--cream)' }}>
            <div className={styles.productVisualInner}>
              <div className={styles.productVisualCard}>
                <div className={styles.productVisualLabel}>전문가 큐레이션 프로세스</div>
                <div className={styles.productVisualTitle}>
                  강남 피부과<br />직접 검증 루틴
                </div>
                <div className={styles.ingredientList}>
                  {[
                    { name: '01 · 피부 진단 퀴즈', benefit: '5분 완성' },
                    { name: '02 · 전문의 성분 검토', benefit: '주 1회' },
                    { name: '03 · 큐레이션 확정', benefit: '월 중순' },
                    { name: '04 · 전 세계 배송', benefit: '월 말 발송' },
                  ].map((ing) => (
                    <div key={ing.name} className={styles.ingredientRow}>
                      <span className={styles.ingredientName}>{ing.name}</span>
                      <span className={styles.ingredientBenefit}>{ing.benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.productInfo}>
            <div className={styles.productEyebrow}>큐레이션 프로세스</div>
            <h2 className={styles.productTitle}>
              서울에서 직접<br />
              <em>발굴하고 검증합니다</em>
            </h2>
            <p className={styles.productDesc}>
              청담동 편집숍과 강남 피부과를 직접 방문하여
              검증된 제품만을 선별합니다. 유행이 아닌 본질에 집중하는
              큐레이션으로 당신의 피부 루틴을 완성합니다.
            </p>
            <div className={styles.benefitList}>
              {[
                '서울 현지 피부과 전문의 네트워크와 협업',
                '국내 출시 신제품 우선 테스트 후 선별',
                '매달 새로운 테마로 구성되는 시즌 큐레이션',
              ].map((b) => (
                <div key={b} className={styles.benefitItem}>
                  <div className={styles.benefitDot} />
                  <span className={styles.benefitText}>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className={styles.howSection} id="how">
        <div className={styles.sectionHeader}>
          <div className={`${styles.sectionEyebrow} ${styles.sectionEyebrowLight}`}>
            서비스 소개
          </div>
          <h2 className={`${styles.sectionTitle} ${styles.sectionTitleLight}`}>
            3단계로 완성하는<br />
            <em>맞춤형 K-뷰티</em>
          </h2>
        </div>
        <div className={styles.stepsGrid}>
          {[
            { num: '01', icon: '📋', title: '피부 진단', desc: '5분 퀴즈로 피부 타입, 고민사항, 라이프스타일을 분석합니다. 전문가 알고리즘이 당신의 피부를 정확히 파악합니다.' },
            { num: '02', icon: '🌿', title: 'K-뷰티 큐레이션', desc: '서울의 숨겨진 보석 같은 브랜드들 중에서 당신의 피부에 꼭 맞는 제품들을 피부과 전문의와 함께 선별합니다.' },
            { num: '03', icon: '📦', title: '정기 배송', desc: '매달 새로운 큐레이션 박스가 전 세계 어디든 배송됩니다. 피부 변화에 따라 루틴도 함께 업데이트됩니다.' },
          ].map((step) => (
            <div key={step.num} className={styles.stepCard}>
              <div className={styles.stepNumber}>{step.num}</div>
              <div className={styles.stepIcon}>{step.icon}</div>
              <div className={styles.stepTitleText}>{step.title}</div>
              <p className={styles.stepDesc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className={styles.testimonialSection}>
        <div className={styles.sectionHeader}>
          <div className={`${styles.sectionEyebrow} ${styles.sectionEyebrowDark}`}>
            베타 테스터 후기
          </div>
          <h2 className={`${styles.sectionTitle} ${styles.sectionTitleDark}`}>
            직접 써봤습니다.<br />
            <em>변화를 느꼈습니다.</em>
          </h2>
        </div>
        <div className={styles.testimonialGrid}>
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className={styles.testimonialCard}>
              <div className={styles.testimonialStars}>★★★★★</div>
              <p className={styles.testimonialText}>"{t.text}"</p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.testimonialAvatar}>{t.initial}</div>
                <div>
                  <div className={styles.testimonialName}>{t.name}</div>
                  <div className={styles.testimonialMeta}>{t.meta}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BLOG */}
      <section className={styles.blogSection} id="blog">
        <BlogSection />
      </section>

      {/* CTA / REGISTER */}
      <section className={styles.ctaSection} id="register">
        <div className={styles.ctaInner}>
          <div className={`${styles.sectionEyebrow} ${styles.sectionEyebrowDark}`} style={{ marginBottom: '1.25rem' }}>
            사전 등록
          </div>
          <h2 className={styles.ctaTitle}>
            출시 소식을<br />
            <em>가장 먼저</em> 받아보세요
          </h2>
          <p className={styles.ctaDesc}>
            사전 등록 시 첫 박스 30% 할인 + 무료 피부 진단 리포트를 제공합니다.
            지금 등록하고 서울의 뷰티 시크릿을 가장 먼저 경험하세요.
          </p>
          <div className={styles.registerContainer}>
            <RegisterForm quizResult={quizResult} />
          </div>
          <div className={styles.ctaGuarantees}>
            {['30일 환불 보장', '스팸 없음', '언제든 취소 가능', '첫 박스 30% 할인'].map((g) => (
              <span key={g} className={styles.ctaGuaranteeItem}>{g}</span>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <div className={styles.footerLogoName}>Seoul Skin Archive</div>
            <div className={styles.footerLogoSub}>SSA · K-Beauty Curation</div>
            <p className={styles.footerLogoTag}>
              서울의 가장 좋은 스킨케어 비밀을 당신의 피부에 맞게 큐레이션합니다.
              피부과 전문의가 검증한 K-뷰티 정기 구독 서비스.
            </p>
          </div>
          <div>
            <div className={styles.footerColTitle}>서비스</div>
            <a className={styles.footerLink} href="#how">서비스 소개</a>
            <a className={styles.footerLink} href="/beauty-box">뷰티박스</a>
            <a className={styles.footerLink} href="#blog">블로그</a>
            <a className={styles.footerLink} href="/about">About</a>
          </div>
          <div>
            <div className={styles.footerColTitle}>고객 지원</div>
            <a className={styles.footerLink} href="mailto:contact@seoulskinarchive.com">이메일 문의</a>
            <a className={styles.footerLink} href="#register">사전 등록</a>
            <a className={styles.footerLink} href="#">배송 정책</a>
            <a className={styles.footerLink} href="#">환불 정책</a>
          </div>
          <div>
            <div className={styles.footerColTitle}>소셜</div>
            <a className={styles.footerLink} href="#">Instagram</a>
            <a className={styles.footerLink} href="#">TikTok</a>
            <a className={styles.footerLink} href="#">YouTube</a>
            <a className={styles.footerLink} href="#">Pinterest</a>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <div className={styles.footerCopy}>© 2026 Seoul Skin Archive. All rights reserved.</div>
          <div className={styles.footerCopy}>Curated with ♥ in Seoul</div>
        </div>
      </footer>

      {/* QUIZ MODAL */}
      <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onComplete={handleQuizComplete}
      />
    </>
  );
}
