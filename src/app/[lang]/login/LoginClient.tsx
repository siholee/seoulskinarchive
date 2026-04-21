'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import SocialAuthButtons from '@/components/SocialAuthButtons';
import { Locale } from '@/lib/i18n';

interface Props {
  lang: Locale;
  dict: Record<string, any>;
}

const t = {
  ko: {
    title: '로그인',
    email: '이메일',
    emailPh: '이메일을 입력하세요',
    password: '비밀번호',
    passwordPh: '비밀번호를 입력하세요',
    submit: '로그인',
    noAccount: '계정이 없으신가요?',
    signUp: '회원가입',
    forgotPassword: '비밀번호를 잊으셨나요?',
    errorInvalid: '이메일 또는 비밀번호가 올바르지 않습니다.',
  },
  en: {
    title: 'Sign In',
    email: 'Email',
    emailPh: 'Enter your email',
    password: 'Password',
    passwordPh: 'Enter your password',
    submit: 'Sign In',
    noAccount: "Don't have an account?",
    signUp: 'Sign up',
    forgotPassword: 'Forgot password?',
    errorInvalid: 'Invalid email or password.',
  },
  ja: {
    title: 'ログイン',
    email: 'メール',
    emailPh: 'メールを入力してください',
    password: 'パスワード',
    passwordPh: 'パスワードを入力してください',
    submit: 'ログイン',
    noAccount: 'アカウントをお持ちでないですか?',
    signUp: '新規登録',
    forgotPassword: 'パスワードをお忘れですか?',
    errorInvalid: 'メールまたはパスワードが正しくありません。',
  },
};

export default function LoginClient({ lang, dict }: Props) {
  const router = useRouter();
  const tx = t[lang] ?? t.ko;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) {
      setError(tx.errorInvalid);
      setLoading(false);
    } else {
      router.replace(`/${lang}`);
    }
  }

  return (
    <main className="min-h-screen bg-cream flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <a href={`/${lang}`} className="inline-block">
            <span className="text-2xl font-bold tracking-tight text-espresso" style={{ fontFamily: 'var(--font-serif, serif)' }}>
              Seoul Skin Archive
            </span>
          </a>
        </div>

        <div className="bg-white border border-camel/20 rounded-2xl p-8 shadow-sm">
          <h1 className="text-xl font-semibold text-espresso mb-6">{tx.title}</h1>

          {/* Social buttons */}
          <SocialAuthButtons lang={lang} mode="login" />

          {/* Email / Password form */}
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                {error}
              </p>
            )}

            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-mocha mb-1.5 uppercase tracking-wide">
                {tx.email}
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={tx.emailPh}
                className="w-full px-4 py-2.5 bg-sand border border-camel/30 rounded-xl text-sm text-espresso placeholder:text-mocha/40 focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage transition-colors"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-xs font-semibold text-mocha uppercase tracking-wide">
                  {tx.password}
                </label>
                <a href="#" className="text-xs text-sage hover:underline">
                  {tx.forgotPassword}
                </a>
              </div>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={tx.passwordPh}
                className="w-full px-4 py-2.5 bg-sand border border-camel/30 rounded-xl text-sm text-espresso placeholder:text-mocha/40 focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-espresso text-cream text-sm font-semibold rounded-xl hover:bg-mocha transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && (
                <span className="w-4 h-4 border-2 border-cream/40 border-t-cream rounded-full animate-spin" />
              )}
              {tx.submit}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-mocha/70">
            {tx.noAccount}{' '}
            <a href={`/${lang}/register`} className="text-sage font-semibold hover:underline">
              {tx.signUp}
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
