'use client';

import { useState, useEffect } from 'react';
import { X, ChevronLeft } from 'lucide-react';
import { Locale } from '@/lib/i18n';
import { cn } from '@/lib/utils';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (skinType: string) => void;
  lang?: Locale;
}

const questions = [
  {
    id: 1,
    text: '나이대가 어떻게 되세요?',
    options: [
      { label: '30 이하', value: 'under30' },
      { label: '30대', value: '30s' },
      { label: '40대', value: '40s' },
      { label: '50대 이상', value: '50plus' },
    ],
  },
  {
    id: 2,
    text: '세안 후 피부 상태가 어때요?',
    options: [
      { label: '얼굴이 당기고 뻣뻣해요', value: 'tight' },
      { label: '시간이 지나면 번들거려요', value: 'oily' },
      { label: '이마·코는 번들, 볼·턱은 당겨요', value: 'combo' },
      { label: '별로 불편하지 않아요', value: 'normal' },
    ],
  },
  {
    id: 3,
    text: '낮 시간대 유분감은 어때요?',
    options: [
      { label: '거의 없고 항상 건조해요', value: 'dry' },
      { label: '이마·코·턱이 번들거려요', value: 'tzone' },
      { label: '전체적으로 많이 번들거려요', value: 'veryOily' },
      { label: '그날그날 달라요', value: 'varies' },
    ],
  },
  {
    id: 4,
    text: '외부 환경에 피부가 얼마나 민감하게 반응해요?',
    options: [
      { label: '조금만 노출돼도 바로 빨개지거나 따가워요', value: 'veryReactive' },
      { label: '반응은 하지만 금방 괜찮아져요', value: 'mildReactive' },
      { label: '가끔 민감해지는데 심하진 않아요', value: 'occasional' },
      { label: '거의 반응 없어요', value: 'stable' },
    ],
  },
  {
    id: 5,
    text: '평소에 피부가 예민하다고 느끼는 편이에요?',
    options: [
      { label: '네, 항상 예민한 것 같아요', value: 'always' },
      { label: '가끔 예민해지는 것 같아요', value: 'sometimes' },
      { label: '별로 예민하지 않아요', value: 'rarely' },
      { label: '전혀 예민하지 않아요', value: 'never' },
    ],
  },
  {
    id: 6,
    text: '가장 큰 피부 고민 하나를 골라주세요',
    options: [
      { label: '여드름·트러블', value: 'acne' },
      { label: '모공', value: 'pores' },
      { label: '색소침착·잡티', value: 'pigment' },
      { label: '노화·탄력', value: 'aging' },
      { label: '홍조·민감', value: 'redness' },
      { label: '건조·수분', value: 'dryness' },
      { label: '칙칙함·톤업', value: 'dull' },
      { label: '없음', value: 'none' },
    ],
  },
];

export default function QuizModal({ isOpen, onClose, onComplete }: QuizModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setAnswers({});
      setIsLoading(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const handleAnswer = (questionId: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [`q${questionId}`]: value }));

    setTimeout(() => {
      if (questionId === 3) {
        // Loading animation after Q3
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          setCurrentStep(questionId + 1);
        }, 1500);
      } else if (questionId === 6) {
        // Final loading and complete
        setIsLoading(true);
        setTimeout(() => {
          const skinType = deriveSkinType({ ...answers, [`q${questionId}`]: value });
          onComplete(skinType);
        }, 2000);
      } else {
        setCurrentStep(questionId + 1);
      }
    }, 300);
  };

  const deriveSkinType = (finalAnswers: Record<string, string>) => {
    const q2 = finalAnswers.q2 || 'normal';
    const q3 = finalAnswers.q3 || 'varies';
    const q4 = finalAnswers.q4 || 'stable';
    const q5 = finalAnswers.q5 || 'rarely';

    if (q4 === 'veryReactive' || q5 === 'always') return '민감성 피부';
    if (q2 === 'tight' || q3 === 'dry') return '건성 피부';
    if (q2 === 'oily' || q3 === 'veryOily') return '지성 피부';
    if (q2 === 'combo' || q3 === 'tzone') return '복합성 피부';
    return '중성 피부';
  };

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!isOpen) return null;

  const progress = ((currentStep - 1) / questions.length) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/80 backdrop-blur-sm">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-cream hover:text-sage-light transition-colors"
        aria-label="Close"
      >
        <X className="w-8 h-8" />
      </button>

      <div className="bg-cream rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4 p-8 md:p-12">
        {!isLoading ? (
          <>
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-charcoal-light mb-2">
                <span>Q{currentStep} / {questions.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-2 bg-sand rounded-full overflow-hidden">
                <div
                  className="h-full bg-sage transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Question */}
            {questions.map((q) => (
              <div
                key={q.id}
                className={cn(
                  'transition-all duration-300',
                  currentStep === q.id ? 'block' : 'hidden'
                )}
              >
                <div className="mb-6">
                  <div className="text-sage text-sm font-bold mb-2">Q{q.id}</div>
                  <h3 className="text-2xl font-bold text-charcoal">{q.text}</h3>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {q.options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(q.id, option.value)}
                      className={cn(
                        'p-4 rounded-xl border-2 transition-all duration-200 text-left',
                        'hover:border-sage hover:bg-sage/5',
                        'focus:outline-none focus:ring-2 focus:ring-sage',
                        answers[`q${q.id}`] === option.value
                          ? 'border-sage bg-sage/10 text-sage font-semibold'
                          : 'border-camel/30 bg-sand text-charcoal'
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>

                {currentStep > 1 && (
                  <button
                    onClick={goBack}
                    className="mt-6 flex items-center gap-2 text-sage hover:text-sage-dark transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    이전
                  </button>
                )}
              </div>
            ))}
          </>
        ) : (
          <div className="py-16 text-center">
            <div className="w-16 h-16 border-4 border-sage/30 border-t-sage rounded-full animate-spin mx-auto mb-6" />
            <p className="text-xl font-semibold text-charcoal mb-2">
              피부 분석 중<span className="animate-pulse">...</span>
            </p>
            <p className="text-charcoal-light">맞춤 스킨케어 루틴을 준비하고 있어요</p>
          </div>
        )}
      </div>
    </div>
  );
}
