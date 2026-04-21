import { Locale, getDictionary } from '@/lib/i18n';

type Props = {
  params: Promise<{ lang: Locale }>;
};

export default async function QuizPage({ params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-charcoal text-cream py-6 px-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <a href={`/${lang}`} className="text-2xl font-bold hover:text-sage-light transition-colors">
            Seoul Skin Archive
          </a>
          <nav className="flex gap-6">
            <a href={`/${lang}`} className="hover:text-sage-light transition-colors">
              {dict.nav.home}
            </a>
          </nav>
        </div>
      </header>

      {/* Content */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-sm font-medium text-sage mb-4">{dict.quiz.title}</div>
            <h1 className="text-5xl font-bold text-charcoal mb-6">{dict.quiz.subtitle}</h1>
            <p className="text-xl text-charcoal-light mb-8">
              {lang === 'ko' ? '5분이면 당신에게 꼭 맞는 스킨케어 루틴을 알려드립니다.' :
               lang === 'en' ? 'Discover your perfect skincare routine in just 5 minutes.' :
               '5分であなたにぴったりのスキンケアルーティンをお教えします。'}
            </p>
            <a
              href={`/${lang}/quiz/register`}
              className="inline-block px-8 py-4 bg-sage text-cream font-semibold rounded-full hover:bg-sage-dark transition-all"
            >
              {dict.quiz.start}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal text-cream py-12 px-6 mt-20">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-xl font-bold mb-4">Seoul Skin Archive</h3>
          <p className="text-sm text-cream/70 mb-6">{dict.footer.tagline}</p>
          <p className="text-xs text-cream/50">{dict.footer.copyright}</p>
        </div>
      </footer>
    </main>
  );
}
