import { Locale, getDictionary } from '@/lib/i18n';
import LoginClient from './LoginClient';

type Props = { params: Promise<{ lang: Locale }> };

export default async function LoginPage({ params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return <LoginClient lang={lang} dict={dict} />;
}