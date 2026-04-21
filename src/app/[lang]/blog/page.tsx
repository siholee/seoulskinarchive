import { fetchBlogPosts } from '@/lib/yurasis-api';
import BlogCard from '@/components/BlogCard';
import { Locale, getDictionary } from '@/lib/i18n';

type Props = {
  params: Promise<{ lang: Locale }>;
};

export default async function BlogPage({ params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const { posts } = await fetchBlogPosts(1, 12);

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
            <a href={`/${lang}/blog`} className="text-sage-light font-semibold">
              {dict.nav.blog}
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-sage/10 to-cream">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-charcoal mb-6">
            K-Beauty Insights
          </h1>
          <p className="text-xl text-charcoal-light">
            {lang === 'ko' ? '서울의 숨겨진 뷰티 시크릿, 제품 리뷰, 스킨케어 팁' :
             lang === 'en' ? "Seoul's hidden beauty secrets, product reviews, skincare tips" :
             'ソウルの隠れたビューティシークレット、製品レビュー、スキンケアのヒント'}
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-charcoal-light">
                {lang === 'ko' ? '아직 포스트가 없습니다.' :
                 lang === 'en' ? 'No posts yet.' :
                 'まだ投稿がありません。'}
              </p>
              <p className="text-charcoal-light mt-2">
                {lang === 'ko' ? '곧 흥미로운 콘텐츠를 준비할게요!' :
                 lang === 'en' ? 'Exciting content coming soon!' :
                 'もうすぐ面白いコンテンツを準備します！'}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} lang={lang} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal text-cream py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-xl font-bold mb-4">Seoul Skin Archive</h3>
          <p className="text-sm text-cream/70 mb-6">{dict.footer.tagline}</p>
          <div className="flex justify-center gap-6 text-sm">
            <a href={`/${lang}`} className="hover:text-sage-light transition-colors">
              {dict.nav.home}
            </a>
            <a href={`/${lang}/blog`} className="hover:text-sage-light transition-colors">
              {dict.nav.blog}
            </a>
            <a href="mailto:contact@seoulskinarchive.com" className="hover:text-sage-light transition-colors">
              {dict.footer.contact}
            </a>
          </div>
          <p className="text-xs text-cream/50 mt-8">{dict.footer.copyright}</p>
        </div>
      </footer>
    </main>
  );
}
