import { Locale, getDictionary } from '@/lib/i18n';

type Props = {
  params: Promise<{ lang: Locale }>;
};

export default async function MyPage({ params }: Props) {
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
            <a href={`/${lang}/my`} className="text-sage-light font-semibold">
              {dict.nav.myPage}
            </a>
          </nav>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-charcoal mb-8">{dict.my.title}</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <a
            href={`/${lang}/my/settings`}
            className="bg-sand border-2 border-camel/20 hover:border-sage rounded-2xl p-8 transition-all hover:shadow-lg"
          >
            <div className="text-4xl mb-4">⚙️</div>
            <h3 className="text-xl font-bold text-charcoal mb-2">{dict.my.settings}</h3>
            <p className="text-charcoal-light text-sm">
              {lang === 'ko' ? '계정 설정 및 정보 수정' : lang === 'en' ? 'Account settings and profile' : 'アカウント設定とプロフィール'}
            </p>
          </a>

          <a
            href={`/${lang}/my/cart`}
            className="bg-sand border-2 border-camel/20 hover:border-sage rounded-2xl p-8 transition-all hover:shadow-lg"
          >
            <div className="text-4xl mb-4">🛒</div>
            <h3 className="text-xl font-bold text-charcoal mb-2">{dict.my.cart}</h3>
            <p className="text-charcoal-light text-sm">
              {lang === 'ko' ? '장바구니 및 위시리스트' : lang === 'en' ? 'Shopping cart and wishlist' : 'カートとウィッシュリスト'}
            </p>
          </a>

          <a
            href={`/${lang}/my/orders`}
            className="bg-sand border-2 border-camel/20 hover:border-sage rounded-2xl p-8 transition-all hover:shadow-lg"
          >
            <div className="text-4xl mb-4">📦</div>
            <h3 className="text-xl font-bold text-charcoal mb-2">{dict.my.orders}</h3>
            <p className="text-charcoal-light text-sm">
              {lang === 'ko' ? '주문 내역 및 배송 조회' : lang === 'en' ? 'Order history and tracking' : '注文履歴と配送追跡'}
            </p>
          </a>
        </div>
      </div>

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
