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
    title: '회원가입',
    name: '이름',
    namePh: '이름을 입력하세요',
    email: '이메일',
    emailPh: '이메일을 입력하세요',
    password: '비밀번호',
    passwordPh: '8자 이상',
    submit: '계정 만들기',
    hasAccount: '이미 계정이 있으신가요?',
    signIn: '로그인',
    success: '이메일을 확인해주세요! 인증 링크를 보냈습니다.',
    errorEmail: '이미 사용 중인 이메일입니다.',
    errorGeneral: '회원가입 중 오류가 발생했습니다.',
    errorPassword: '비밀번호는 8자 이상이어야 합니다.',
  },
  en: {
    title: 'Create Account',
    name: 'Name',
    namePh: 'Enter your name',
    email: 'Email',
    emailPh: 'Enter your email',
    password: 'Password',
    passwordPh: '8 characters minimum',
    submit: 'Create Account',
    hasAccount: 'Already have an account?',
    signIn: 'Sign in',
    success: 'Check your email! We sent a verification link.',
    errorEmail: 'This email is already in use.',
    errorGeneral: 'An error occurred during sign up.',
    errorPassword: 'Password must be at least 8 characters.',
  },
  ja: {
    title: '新規登録',
    name: '名前',
    namePh: '名前を入力してください',
    email: 'メール',
    emailPh: 'メールを入力してください',
    password: 'パスワード',
    passwordPh: '8文字以上',
    submit: 'アカウントを作成',
    hasAccount: 'すでにアカウントをお持ちですか?',
    signIn: 'ログイン',
    success: 'メールをご確認ください！認証リンクをお送りしました。',
    errorEmail: 'このメールはすでに使用されています。',
    errorGeneral: '登録中にエラーが発生しました。',
    errorPassword: 'パスワードは8文字以上である必要があります。',
  },
};

export default function RegisterClient({ lang, dict }: Props) {
  const router = useRouter();
  const tx = t[lang] ?? t.ko;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (password.length < 8) {
      setError(tx.errorPassword);
      return;
    }
    setLoading(true);
    const { error: err } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/${lang}`,
      },
    });
    if (err) {
      setError(err.message.includes('already') ? tx.errorEmail : tx.errorGeneral);
      setLoading(false);
    } else {
      setSuccess(true);
    }
  }

  if (success) {
    return (
      <main className="min-h-screen bg-cream flex items-center justify-center px-6">
        <div className="w-full max-w-md text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-sage/20 flex items-center justify-center mx-auto">
            <svg className="w-7 h-7 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-espresso">{tx.success}</h2>
          <a href={`/${lang}/login`} className="inline-block text-sm text-sage font-semibold hover:underline">
            {tx.signIn} →
          </a>
        </div>
      </main>
    );
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
          <SocialAuthButtons lang={lang} mode="register" />

          {/* Email / Password form */}
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                {error}
              </p>
            )}

            <div>
              <label htmlFor="name" className="block text-xs font-semibold text-mocha mb-1.5 uppercase tracking-wide">
                {tx.name}
              </label>
              <input
                id="name"
                type="text"
                required
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={tx.namePh}
                className="w-full px-4 py-2.5 bg-sand border border-camel/30 rounded-xl text-sm text-espresso placeholder:text-mocha/40 focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage transition-colors"
              />
            </div>

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
              <label htmlFor="password" className="block text-xs font-semibold text-mocha mb-1.5 uppercase tracking-wide">
                {tx.password}
              </label>
              <input
                id="password"
                type="password"
                required
                autoComplete="new-password"
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
            {tx.hasAccount}{' '}
            <a href={`/${lang}/login`} className="text-sage font-semibold hover:underline">
              {tx.signIn}
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
