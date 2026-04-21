'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Locale } from '@/lib/i18n';
import { CheckCircle } from 'lucide-react';

interface RegisterFormProps {
  quizResult?: string | null;
  lang?: Locale;
}

export default function RegisterForm({ quizResult, lang = 'ko' }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error: insertError } = await supabase.from('ssa_registrations').insert([
        {
          name: formData.name,
          email: formData.email,
          country: formData.country,
          language: 'ko', // Default to Korean
          skin_type: quizResult || null,
        },
      ]);

      if (insertError) throw insertError;

      setSuccess(true);
      setFormData({ name: '', email: '', country: '' });
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.message || '등록 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-sage-light/20 border-2 border-sage rounded-2xl p-12 text-center">
        <CheckCircle className="w-16 h-16 text-sage mx-auto mb-6" />
        <h3 className="text-2xl font-bold text-charcoal mb-4">
          사전 등록이 완료되었습니다! 🎉
        </h3>
        <p className="text-charcoal-light mb-2">
          입력하신 이메일로 확인 메일을 보내드렸어요.
        </p>
        <p className="text-sm text-charcoal-light">
          런칭 시 우선 배송과 얼리버드 혜택을 안내해 드릴게요.
        </p>
        {quizResult && (
          <div className="mt-6 inline-block px-6 py-3 bg-sage/10 border border-sage rounded-full text-sage font-semibold">
            진단 결과: {quizResult}
          </div>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-cream p-8 rounded-2xl border-2 border-camel/20 shadow-lg">
      {quizResult && (
        <div className="mb-6 p-4 bg-sage/10 border border-sage rounded-xl text-center">
          <p className="text-sm text-sage-dark font-medium mb-1">피부 진단 결과</p>
          <p className="text-lg font-bold text-sage">{quizResult}</p>
        </div>
      )}

      <div className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-charcoal mb-2">
            이름 *
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 bg-sand border-2 border-camel/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent transition-all"
            placeholder="홍길동"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-charcoal mb-2">
            이메일 *
          </label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 bg-sand border-2 border-camel/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent transition-all"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label htmlFor="country" className="block text-sm font-semibold text-charcoal mb-2">
            국가 *
          </label>
          <select
            id="country"
            required
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            className="w-full px-4 py-3 bg-sand border-2 border-camel/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent transition-all"
          >
            <option value="">선택해주세요</option>
            <option value="KR">대한민국 (South Korea)</option>
            <option value="US">미국 (United States)</option>
            <option value="JP">일본 (Japan)</option>
            <option value="CN">중국 (China)</option>
            <option value="TW">대만 (Taiwan)</option>
            <option value="HK">홍콩 (Hong Kong)</option>
            <option value="SG">싱가포르 (Singapore)</option>
            <option value="GB">영국 (United Kingdom)</option>
            <option value="FR">프랑스 (France)</option>
            <option value="DE">독일 (Germany)</option>
            <option value="CA">캐나다 (Canada)</option>
            <option value="AU">호주 (Australia)</option>
            <option value="OTHER">기타 (Other)</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full py-4 bg-sage text-cream font-bold rounded-xl hover:bg-sage-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
      >
        {loading ? '등록 중...' : '사전 등록하기'}
      </button>

      <p className="mt-4 text-xs text-center text-charcoal-light">
        사전 등록하시면 출시 소식과 특별 혜택을 가장 먼저 받아보실 수 있습니다.
      </p>
    </form>
  );
}
