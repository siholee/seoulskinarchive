import { Locale, getDictionary } from '@/lib/i18n';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Heart, MapPin, Package, Users } from 'lucide-react';

type Props = {
  params: Promise<{ lang: Locale }>;
};

export default async function AboutPage({ params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <Header lang={lang} dict={dict} />
      
      <main className="bg-cream">
        {/* Hero */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-sage/10 text-sage text-sm font-medium rounded-full mb-8">
              {dict.nav.brandStory}
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-espresso mb-8 tracking-tight" style={{ lineHeight: '1.05' }}>
              {lang === 'ko' ? '서울의 비밀을' : lang === 'en' ? 'Seoul\'s Secrets' : 'ソウルの秘密を'}<br />
              <span className="text-sage">{lang === 'ko' ? '세계와 나누다' : lang === 'en' ? 'Shared with the World' : '世界とシェア'}</span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-espresso/70 leading-relaxed">
              {lang === 'ko' 
                ? '서울에서 발견한 진짜 K-뷰티를 큐레이션하여 전 세계에 전합니다.\n검증된 제품, 신뢰할 수 있는 루틴, 그리고 진정한 아름다움의 가치.'
                : lang === 'en' 
                ? 'We curate authentic K-beauty discovered in Seoul and deliver it worldwide.\nVerified products, trusted routines, and the true value of beauty.'
                : 'ソウルで発見した本物のK-ビューティをキュレーションし、世界中にお届けします。\n検証された製品、信頼できるルーティン、そして真の美しさの価値。'}
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-32 px-6 bg-sand">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="text-sm font-medium text-sage mb-4">
                  {lang === 'ko' ? '우리의 미션' : lang === 'en' ? 'Our Mission' : '私たちのミッション'}
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-espresso mb-8">
                  {lang === 'ko' ? '진짜 K-뷰티를\n세계에 알리다' : lang === 'en' ? 'Bringing Authentic\nK-Beauty to the World' : '本物のK-ビューティを\n世界に広める'}
                </h2>
                <p className="text-lg text-espresso/70 leading-relaxed mb-6">
                  {lang === 'ko' 
                    ? '한국은 세계에서 가장 앞선 스킨케어 문화를 가지고 있습니다. 하지만 진짜 좋은 제품들은 여전히 한국에서만 만날 수 있습니다.'
                    : lang === 'en' 
                    ? 'Korea has the world\'s most advanced skincare culture. Yet the truly exceptional products remain accessible only in Korea.'
                    : '韓国は世界で最も進んだスキンケア文化を持っています。しかし、本当に良い製品は依然として韓国でしか手に入りません。'}
                </p>
                <p className="text-lg text-espresso/70 leading-relaxed">
                  {lang === 'ko' 
                    ? 'Seoul Skin Archive는 서울의 피부과 전문의, 뷰티 에디터, 그리고 현지 전문가들과 협력하여 검증된 제품만을 선별합니다.'
                    : lang === 'en' 
                    ? 'Seoul Skin Archive partners with Seoul\'s dermatologists, beauty editors, and local experts to curate only verified products.'
                    : 'Seoul Skin Archiveは、ソウルの皮膚科専門医、ビューティエディター、現地の専門家と協力し、検証された製品のみを選別します。'}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-8">
                <div className="bg-cream p-8 rounded-3xl">
                  <Heart className="w-12 h-12 text-sage mb-4" />
                  <div className="text-3xl font-bold text-espresso mb-2">100%</div>
                  <div className="text-sm text-espresso/70">
                    {lang === 'ko' ? '검증된 제품' : lang === 'en' ? 'Verified Products' : '検証済み製品'}
                  </div>
                </div>
                <div className="bg-cream p-8 rounded-3xl">
                  <Users className="w-12 h-12 text-sage mb-4" />
                  <div className="text-3xl font-bold text-espresso mb-2">50+</div>
                  <div className="text-sm text-espresso/70">
                    {lang === 'ko' ? '협력 전문가' : lang === 'en' ? 'Expert Partners' : '協力専門家'}
                  </div>
                </div>
                <div className="bg-cream p-8 rounded-3xl">
                  <MapPin className="w-12 h-12 text-sage mb-4" />
                  <div className="text-3xl font-bold text-espresso mb-2">Seoul</div>
                  <div className="text-sm text-espresso/70">
                    {lang === 'ko' ? '본사 위치' : lang === 'en' ? 'Headquarters' : '本社所在地'}
                  </div>
                </div>
                <div className="bg-cream p-8 rounded-3xl">
                  <Package className="w-12 h-12 text-sage mb-4" />
                  <div className="text-3xl font-bold text-espresso mb-2">12+</div>
                  <div className="text-sm text-espresso/70">
                    {lang === 'ko' ? '큐레이션 박스' : lang === 'en' ? 'Curated Boxes' : 'キュレーションボックス'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-32 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="text-sm font-medium text-sage mb-4">
                {lang === 'ko' ? '탄생 스토리' : lang === 'en' ? 'Our Story' : '誕生ストーリー'}
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-espresso mb-6">
                {lang === 'ko' ? '서울에서\n시작된 여정' : lang === 'en' ? 'A Journey\nBorn in Seoul' : 'ソウルから\n始まった旅'}
              </h2>
            </div>

            <div className="space-y-12">
              <div className="border-l-4 border-sage pl-8">
                <div className="text-sm font-medium text-sage mb-2">2024</div>
                <h3 className="text-2xl font-bold text-espresso mb-4">
                  {lang === 'ko' ? '시작' : lang === 'en' ? 'The Beginning' : '始まり'}
                </h3>
                <p className="text-lg text-espresso/70 leading-relaxed">
                  {lang === 'ko' 
                    ? '외국인 친구들이 한국을 방문할 때마다 같은 질문을 했습니다. "어떤 스킨케어 제품을 사야 할까?" 그때마다 강남의 피부과와 청담동의 편집숍을 추천했지만, 그들이 떠나고 나서는 이 제품들을 다시 구할 수 없었습니다.'
                    : lang === 'en' 
                    ? 'Every time foreign friends visited Korea, they asked the same question: "What skincare products should I buy?" I recommended dermatology clinics in Gangnam and select shops in Cheongdam-dong, but after they left, these products were no longer accessible.'
                    : '外国人の友人が韓国を訪れるたびに、同じ質問をしました。「どのスキンケア製品を買えばいい？」その度に江南の皮膚科と清潭洞のセレクトショップを勧めましたが、彼らが帰った後、これらの製品は二度と手に入りませんでした。'}
                </p>
              </div>

              <div className="border-l-4 border-sage pl-8">
                <div className="text-sm font-medium text-sage mb-2">2025</div>
                <h3 className="text-2xl font-bold text-espresso mb-4">
                  {lang === 'ko' ? '큐레이션의 시작' : lang === 'en' ? 'Curation Begins' : 'キュレーションの始まり'}
                </h3>
                <p className="text-lg text-espresso/70 leading-relaxed">
                  {lang === 'ko' 
                    ? '우리는 서울의 피부과 전문의, 뷰티 에디터, 현지 전문가들과 협력하기 시작했습니다. 수백 개의 제품을 테스트하고, 성분을 분석하고, 실제 효과를 검증했습니다.'
                    : lang === 'en' 
                    ? 'We began partnering with dermatologists, beauty editors, and local experts in Seoul. We tested hundreds of products, analyzed ingredients, and verified real results.'
                    : 'ソウルの皮膚科専門医、ビューティエディター、現地の専門家との協力を始めました。数百の製品をテストし、成分を分析し、実際の効果を検証しました。'}
                </p>
              </div>

              <div className="border-l-4 border-sage pl-8">
                <div className="text-sm font-medium text-sage mb-2">2026</div>
                <h3 className="text-2xl font-bold text-espresso mb-4">
                  {lang === 'ko' ? '런칭' : lang === 'en' ? 'Launch' : 'ローンチ'}
                </h3>
                <p className="text-lg text-espresso/70 leading-relaxed">
                  {lang === 'ko' 
                    ? 'Seoul Skin Archive가 세상에 나옵니다. 매달 새로운 큐레이션으로 서울의 진짜 K-뷰티를 전 세계에 전합니다.'
                    : lang === 'en' 
                    ? 'Seoul Skin Archive launches to the world. Every month, we deliver authentic Seoul K-beauty worldwide through new curations.'
                    : 'Seoul Skin Archiveが世界にローンチされます。毎月新しいキュレーションで、ソウルの本物のK-ビューティを世界中にお届けします。'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 px-6 bg-espresso text-cream">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              {lang === 'ko' ? '함께 시작하세요' : lang === 'en' ? 'Start Your Journey' : '一緒に始めましょう'}
            </h2>
            <p className="text-xl text-cream/70 mb-12">
              {lang === 'ko' 
                ? '서울의 비밀을 가장 먼저 경험하세요'
                : lang === 'en' 
                ? 'Be the first to experience Seoul\'s secrets'
                : 'ソウルの秘密を最初に体験してください'}
            </p>
            <a
              href={`/${lang}/quiz`}
              className="inline-block px-8 py-4 bg-sage text-cream text-lg font-semibold rounded-full hover:bg-sage-dark transition-all hover:scale-105 shadow-lg"
            >
              {lang === 'ko' ? '지금 시작하기' : lang === 'en' ? 'Get Started' : '今すぐ始める'}
            </a>
          </div>
        </section>
      </main>

      <Footer lang={lang} dict={dict} />
    </>
  );
}
