'use client';

import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onTakeQuiz: () => void;
}

export default function Hero({ onTakeQuiz }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 bg-gradient-to-b from-cream to-sand">
      <div className="max-w-4xl mx-auto text-center">
        {/* Logo / Brand */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-charcoal mb-4">
            Seoul Skin Archive
          </h1>
          <div className="w-24 h-1 bg-sage mx-auto"></div>
        </div>

        {/* Tagline */}
        <p className="text-2xl md:text-3xl font-light text-charcoal mb-6">
          Seoul&apos;s best-kept skincare secrets.
        </p>
        <p className="text-xl md:text-2xl text-sage-dark font-medium mb-12">
          Curated for your skin.
        </p>

        {/* Description */}
        <p className="text-lg text-charcoal-light max-w-2xl mx-auto mb-10 leading-relaxed">
          서울의 숨겨진 K-뷰티 시크릿을 담은 프리미엄 스킨케어 패키지.
          <br />
          당신의 피부를 위해 큐레이션된 특별한 경험을 준비 중입니다.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={onTakeQuiz}
            className="group px-8 py-4 bg-sage text-cream font-semibold rounded-full hover:bg-sage-dark transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
          >
            피부 진단 퀴즈 시작하기
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <a
            href="#register"
            className="px-8 py-4 border-2 border-sage text-sage font-semibold rounded-full hover:bg-sage hover:text-cream transition-all duration-300"
          >
            사전 등록하기
          </a>
        </div>

        {/* Coming Soon Badge */}
        <div className="mt-16">
          <span className="inline-block px-6 py-2 bg-camel/20 text-camel border border-camel rounded-full text-sm font-medium">
            📦 Coming Soon - 2026
          </span>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-sand to-transparent pointer-events-none"></div>
    </section>
  );
}
