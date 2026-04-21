import { Locale } from '@/lib/i18n';

type Props = {
  lang: Locale;
  dict: any;
};

export default function Footer({ lang, dict }: Props) {
  return (
    <footer className="bg-espresso text-cream">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Seoul Skin Archive</h3>
            <p className="text-sm text-cream/70 leading-relaxed">
              {dict.footer.tagline}
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-cream/90">
              {lang === 'ko' ? '제품' : lang === 'en' ? 'Product' : '製品'}
            </h4>
            <ul className="space-y-3 text-sm text-cream/70">
              <li>
                <a href={`/${lang}/beauty-box`} className="hover:text-cream transition-colors">
                  {dict.nav.beautyBox}
                </a>
              </li>
              <li>
                <a href={`/${lang}/quiz`} className="hover:text-cream transition-colors">
                  {dict.nav.skinQuiz}
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-cream/90">
              {lang === 'ko' ? '회사' : lang === 'en' ? 'Company' : '会社'}
            </h4>
            <ul className="space-y-3 text-sm text-cream/70">
              <li>
                <a href={`/${lang}/about`} className="hover:text-cream transition-colors">
                  {dict.nav.brandStory}
                </a>
              </li>
              <li>
                <a href={`/${lang}/blog`} className="hover:text-cream transition-colors">
                  {dict.nav.blog}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-cream/90">
              {dict.footer.contact}
            </h4>
            <ul className="space-y-3 text-sm text-cream/70">
              <li>
                <a href="mailto:contact@seoulskinarchive.com" className="hover:text-cream transition-colors">
                  contact@seoulskinarchive.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-cream/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-cream/50">{dict.footer.copyright}</p>
          <p className="text-xs text-cream/50">Curated with ♥ in Seoul</p>
        </div>
      </div>
    </footer>
  );
}
