import { Locale, getDictionary } from '@/lib/i18n';
import BeautyBoxClient from './BeautyBoxClient';

type Props = {
  params: Promise<{ lang: Locale }>;
};

export default async function BeautyBoxPage({ params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return <BeautyBoxClient lang={lang} dict={dict} />;
}