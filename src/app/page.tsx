'use client';

import { useState } from 'react';
import Hero from '@/components/Hero';
import BrandStory from '@/components/BrandStory';
import QuizModal from '@/components/QuizModal';
import RegisterForm from '@/components/RegisterForm';

export default function HomePage() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [quizResult, setQuizResult] = useState<string | null>(null);

  const handleQuizComplete = (skinType: string) => {
    setQuizResult(skinType);
    setIsQuizOpen(false);
    // 퀴즈 완료 후 자동으로 사전등록 섹션으로 스크롤
    setTimeout(() => {
      document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero onTakeQuiz={() => setIsQuizOpen(true)} />

      {/* Brand Story */}
      <BrandStory />

      {/* Register Section */}
      <section id="register" className="py-20 px-6 bg-sand">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-charcoal">
            사전 등록하기
          </h2>
          <p className="text-center text-charcoal-light mb-10">
            출시 소식과 특별 혜택을 가장 먼저 받아보세요
          </p>
          <RegisterForm quizResult={quizResult} />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal text-cream py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-xl font-bold mb-4">Seoul Skin Archive</h3>
          <p className="text-sm text-cream/70 mb-6">
            Seoul&apos;s best-kept skincare secrets, curated for your skin.
          </p>
          <div className="flex justify-center gap-6 text-sm">
            <a href="/blog" className="hover:text-sage-light transition-colors">
              Blog
            </a>
            <a href="mailto:contact@seoulskinarchive.com" className="hover:text-sage-light transition-colors">
              Contact
            </a>
          </div>
          <p className="text-xs text-cream/50 mt-8">
            © 2026 Seoul Skin Archive. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Quiz Modal */}
      <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onComplete={handleQuizComplete}
      />
    </main>
  );
}
