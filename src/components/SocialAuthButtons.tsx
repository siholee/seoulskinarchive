'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

type Provider = 'google' | 'facebook';

interface Props {
  lang: string;
  mode?: 'login' | 'register';
}

const labels: Record<string, Record<Provider, string>> = {
  ko: {
    google: 'Google로 계속하기',
    facebook: 'Meta (Facebook / Instagram)로 계속하기',
  },
  en: {
    google: 'Continue with Google',
    facebook: 'Continue with Meta (Facebook / Instagram)',
  },
  ja: {
    google: 'Googleで続ける',
    facebook: 'Meta（Facebook / Instagram）で続ける',
  },
};

const orLabel: Record<string, string> = {
  ko: '또는',
  en: 'or',
  ja: 'または',
};

export default function SocialAuthButtons({ lang, mode = 'login' }: Props) {
  const [loading, setLoading] = useState<Provider | null>(null);
  const l = labels[lang] ?? labels.ko;
  const or = orLabel[lang] ?? orLabel.ko;

  async function handleOAuth(provider: Provider) {
    setLoading(provider);
    const redirectTo = `${window.location.origin}/auth/callback?next=/${lang}`;
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo },
    });
    if (error) {
      console.error(`${provider} OAuth error:`, error);
      setLoading(null);
    }
    // On success, browser redirects — no need to setLoading(null)
  }

  return (
    <div className="space-y-3">
      {/* Divider */}
      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-camel/20" />
        <span className="text-xs text-mocha/60 font-medium">{or}</span>
        <div className="flex-1 h-px bg-camel/20" />
      </div>

      {/* Google */}
      <button
        type="button"
        onClick={() => handleOAuth('google')}
        disabled={loading !== null}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border border-camel/30 rounded-xl text-espresso text-sm font-medium hover:bg-sand/50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading === 'google' ? (
          <span className="w-4 h-4 border-2 border-espresso/40 border-t-espresso rounded-full animate-spin" />
        ) : (
          <GoogleIcon />
        )}
        {l.google}
      </button>

      {/* Meta / Facebook / Instagram */}
      <button
        type="button"
        onClick={() => handleOAuth('facebook')}
        disabled={loading !== null}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#1877F2] rounded-xl text-white text-sm font-medium hover:bg-[#1565D8] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading === 'facebook' ? (
          <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
        ) : (
          <MetaIcon />
        )}
        {l.facebook}
      </button>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  );
}

function MetaIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}
