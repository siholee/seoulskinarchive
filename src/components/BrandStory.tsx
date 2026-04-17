'use client';

import { BookOpen, Globe, Sparkles } from 'lucide-react';

export default function BrandStory() {
  const features = [
    {
      icon: Sparkles,
      title: 'Curated Excellence',
      description: '피부 전문가들이 선별한 서울의 숨겨진 명품 스킨케어',
    },
    {
      icon: Globe,
      title: 'Global Delivery',
      description: '전 세계 어디든 최상의 컨디션으로 배송되는 프리미엄 패키지',
    },
    {
      icon: BookOpen,
      title: 'Skin Stories',
      description: '제품 뒤에 숨은 브랜드 스토리와 피부 관리 노하우',
    },
  ];

  return (
    <section className="py-24 px-6 bg-cream">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-6">
            Why Seoul Skin Archive?
          </h2>
          <p className="text-lg text-charcoal-light max-w-3xl mx-auto leading-relaxed">
            서울에는 세계적으로 알려지지 않은 놀라운 스킨케어 브랜드들이 있습니다.
            <br />
            우리는 그 숨겨진 보석들을 찾아내고, 당신의 피부 타입에 맞춰 큐레이션합니다.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-sand p-8 rounded-2xl border border-camel/20 hover:border-camel/40 transition-all hover:shadow-lg"
              >
                <div className="w-12 h-12 bg-sage/20 rounded-full flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-sage" />
                </div>
                <h3 className="text-xl font-bold text-charcoal mb-3">
                  {feature.title}
                </h3>
                <p className="text-charcoal-light leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Blog CTA */}
        <div className="text-center bg-sage-light/10 p-12 rounded-3xl border border-sage/20">
          <h3 className="text-2xl font-bold text-charcoal mb-4">
            K-뷰티 인사이트를 블로그에서 만나보세요
          </h3>
          <p className="text-charcoal-light mb-6">
            제품 리뷰, 브랜드 스토리, 스킨케어 팁까지
          </p>
          <a
            href="/blog"
            className="inline-block px-8 py-3 bg-sage text-cream font-semibold rounded-full hover:bg-sage-dark transition-all"
          >
            블로그 읽으러 가기
          </a>
        </div>
      </div>
    </section>
  );
}
