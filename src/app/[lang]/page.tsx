import { Locale, getDictionary } from '@/lib/i18n';
import HomeClient from './HomeClient';

type Props = {
  params: Promise<{ lang: Locale }>;
};

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <HomeClient lang={lang} dict={dict} />;
}
