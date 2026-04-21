import { Locale, getDictionary } from '@/lib/i18n';
import RegisterClient from './RegisterClient';

type Props = { params: Promise<{ lang: Locale }> };

export default async function RegisterPage({ params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return <RegisterClient lang={lang} dict={dict} />;
}