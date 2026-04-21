'use client';

import { useState } from 'react';
import { Locale } from '@/lib/i18n';
import { ArrowRight, Sparkles, Globe, BookOpen, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuizModal from '@/components/QuizModal';
import RegisterForm from '@/components/RegisterForm';

type Props = {
  lang: Locale;
  dict: Awaited<ReturnType<typeof import('@/lib/i18n').getDictionary>>;
};

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

      <main className="bg-cream">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-sage/10 text-sage text-sm font-medium rounded-full mb-8">
              {dict.hero.badge}
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-espresso mb-8 tracking-tight" style={{ lineHeight: '1.05' }}>
              {dict.hero.title}<br />
              <span className="text-sage">{dict.hero.titleEm}</span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-espresso/70 max-w-3xl mx-auto mb-12 leading-relaxed">
              {dict.hero.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
              <button
                onClick={() => setIsQuizOpen(true)}
                className="group px-8 py-4 bg-sage text-cream text-lg font-semibold rounded-full hover:bg-sage-dark transition-all hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {dict.hero.ctaPrimary}
                <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href={`/${lang}/beauty-box`}
                className="px-8 py-4 bg-sand text-espresso text-lg font-semibold rounded-full hover:bg-camel/30 transition-all border-2 border-camel/20"
              >
                {dict.hero.ctaSecondary}
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto pt-12 border-t border-camel/20">
              <div>
                <div className="text-4xl md:text-5xl font-bold text-sage mb-2">2026</div>
                <div className="text-sm text-espresso/60">{dict.stats.launch}</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-sage mb-2">12+</div>
                <div className="text-sm text-espresso/60">{dict.stats.boxes}</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-sage mb-2">100%</div>
                <div className="text-sm text-espresso/60">{dict.stats.kbeauty}</div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-32 px-6 bg-sand">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <div className="text-sm font-medium text-sage mb-4">
                {lang === 'ko' ? '서비스 소개' : lang === 'en' ? 'How It Works' : 'サービス紹介'}
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-espresso mb-6">
                {lang === 'ko' ? '3단계로 완성하는' : lang === 'en' ? 'Personalized' : '3ステップで完成する'}<br />
                <span className="text-sage">{lang === 'ko' ? '맞춤형 K-뷰티' : lang === 'en' ? 'K-Beauty Experience' : 'カスタムK-ビューティ'}</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-20 h-20 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-sage" />
                </div>
                <div className="text-lg font-bold text-sage mb-4">01</div>
                <h3 className="text-2xl font-bold text-espresso mb-4">
                  {lang === 'ko' ? '피부 진단' : lang === 'en' ? 'Skin Analysis' : '肌診断'}
                </h3>
                <p className="text-espresso/70 leading-relaxed">
                  {lang === 'ko' 
                    ? '5분 퀴즈로 피부 타입, 고민사항, 라이프스타일을 분석합니다.' 
                    : lang === 'en' 
                    ? 'A 5-minute quiz analyzes your skin type, concerns, and lifestyle.' 
                    : '5分クイズで肌タイプ、悩み、ライフスタイルを分析します。'}
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-10 h-10 text-sage" />
                </div>
                <div className="text-lg font-bold text-sage mb-4">02</div>
                <h3 className="text-2xl font-bold text-espresso mb-4">
                  {lang === 'ko' ? 'K-뷰티 큐레이션' : lang === 'en' ? 'K-Beauty Curation' : 'K-ビューティキュレーション'}
                </h3>
                <p className="text-espresso/70 leading-relaxed">
                  {lang === 'ko' 
                    ? '서울의 숨겨진 보석 같은 브랜드들 중에서 당신의 피부에 꼭 맞는 제품을 선별합니다.' 
                    : lang === 'en' 
                    ? 'We curate products perfectly suited for your skin from Seoul\'s hidden gems.' 
                    : 'ソウルの隠れた宝石のような製品をあなたの肌に合わせて選びます。'}
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-10 h-10 text-sage" />
                </div>
                <div className="text-lg font-bold text-sage mb-4">03</div>
                <h3 className="text-2xl font-bold text-espresso mb-4">
                  {lang === 'ko' ? '정기 배송' : lang === 'en' ? 'Global Delivery' : '定期配送'}
                </h3>
                <p className="text-espresso/70 leading-relaxed">
                  {lang === 'ko' 
                    ? '매달 새로운 큐레이션 박스가 전 세계 어디든 배송됩니다.' 
                    : lang === 'en' 
                    ? 'A new curated box is delivered worldwide every month.' 
                    : '毎月新しいキュレーションボックスが世界中に配送されます。'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Values */}
        <section className="py-32 px-6 bg-espresso text-cream">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <div className="text-sm font-medium text-sage-light mb-4">
                {lang === 'ko' ? '브랜드 스토리' : lang === 'en' ? 'Brand Story' : 'ブランドストーリー'}
              </div>
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                {lang === 'ko' ? '서울에서 시작된' : lang === 'en' ? 'A Beauty Archive' : 'ソウルから始まった'}<br />
                <span className="text-sage-light">{lang === 'ko' ? '뷰티 아카이브' : lang === 'en' ? 'Born in Seoul' : 'ビューティアーカイブ'}</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              <div>
                <div className="text-5xl mb-6">✨</div>
                <h3 className="text-2xl font-bold mb-4">
                  {lang === 'ko' ? '엄선된 K-뷰티' : lang === 'en' ? 'Curated K-Beauty' : '厳選されたK-ビューティ'}
                </h3>
                <p className="text-cream/70 leading-relaxed">
                  {lang === 'ko' 
                    ? '서울 강남의 피부과와 청담동의 편집숍을 직접 방문하여 검증된 제품만을 선별합니다.' 
                    : lang === 'en' 
                    ? 'We visit dermatology clinics in Gangnam and select shops in Cheongdam-dong to handpick only verified products.' 
                    : 'ソウル江南の皮膚科と清潭洞のセレクトショップを直接訪問し、検証された製品のみを選別します。'}
                </p>
              </div>

              <div>
                <div className="text-5xl mb-6">🌏</div>
                <h3 className="text-2xl font-bold mb-4">
                  {lang === 'ko' ? '글로벌 배송' : lang === 'en' ? 'Global Delivery' : 'グローバル配送'}
                </h3>
                <p className="text-cream/70 leading-relaxed">
                  {lang === 'ko' 
                    ? '한국에서만 구할 수 있는 제품들을 세계 어디서나 경험할 수 있도록 합니다.' 
                    : lang === 'en' 
                    ? 'Products only available in Korea can now be experienced anywhere in the world.' 
                    : '韓国でしか入手できない製品を世界中どこでも体験できるようにします。'}
                </p>
              </div>

              <div>
                <div className="text-5xl mb-6">📖</div>
                <h3 className="text-2xl font-bold mb-4">
                  {lang === 'ko' ? '스킨케어 교육' : lang === 'en' ? 'Skincare Education' : 'スキンケア教育'}
                </h3>
                <p className="text-cream/70 leading-relaxed">
                  {lang === 'ko' 
                    ? '단순한 제품 판매가 아닌, 올바른 스킨케어 루틴과 성분에 대한 이해를 함께 제공합니다.' 
                    : lang === 'en' 
                    ? 'More than just selling products, we provide understanding of proper skincare routines and ingredients.' 
                    : '単なる製品販売ではなく、正しいスキンケアと成分の理解を提供します。'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Registration */}
        <section id="register" className="py-32 px-6 bg-sand">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="text-sm font-medium text-sage mb-4">
                {lang === 'ko' ? '사전 등록' : lang === 'en' ? 'Pre-Registration' : '事前登録'}
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-espresso mb-6">
                {lang === 'ko' ? '출시 소식을' : lang === 'en' ? 'Be the First' : 'ローンチニュースを'}<br />
                <span className="text-sage">{lang === 'ko' ? '가장 먼저 받아보세요' : lang === 'en' ? 'to Know' : '最初に受け取る'}</span>
              </h2>
            </div>
            
            <RegisterForm quizResult={quizResult} lang={lang} />
          </div>
        </section>
      </main>

      <Footer lang={lang} dict={dict} />

      <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onComplete={handleQuizComplete}
        lang={lang}
      />
    </>
  );
}
