# Seoul Skin Archive

Seoul's best-kept skincare secrets. Premium K-beauty packages curated for your unique skin.

## 프로젝트 구조

```
seoulskinarchive/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # 루트 레이아웃
│   │   ├── page.tsx             # 홈페이지 (랜딩 + 사전등록)
│   │   ├── blog/
│   │   │   ├── page.tsx         # 블로그 목록
│   │   │   └── [slug]/
│   │   │       └── page.tsx     # 블로그 상세
│   │   └── globals.css
│   ├── components/
│   │   ├── Hero.tsx             # 히어로 섹션
│   │   ├── BrandStory.tsx       # 브랜드 스토리
│   │   ├── QuizModal.tsx        # 피부 진단 퀴즈
│   │   ├── RegisterForm.tsx     # 사전등록 폼
│   │   └── BlogCard.tsx         # 블로그 카드
│   └── lib/
│       ├── supabase.ts          # Supabase 클라이언트
│       ├── yurasis-api.ts       # Yurasis 블로그 API
│       └── utils.ts
├── deploy.ps1                   # 배포 스크립트
├── ecosystem.config.cjs         # PM2 설정
└── package.json
```

## 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: Supabase (사전등록)
- **Blog**: Yurasis API 연동
- **Deployment**: PM2 + Nginx on Vultr (45.76.50.57)

## 브랜드 컬러

- **Cream**: `#F5F0E8` - 메인 배경
- **Sand**: `#E8DECE` - 카드 배경
- **Camel**: `#C4A882` - 보더/액센트
- **Sage**: `#6B8C6F` - CTA/태그
- **Sage Light**: `#A8C4AC` - 호버
- **Sage Dark**: `#4A6B4E` - 액티브

## 개발

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (localhost:3000)
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행 (port 3001)
npm start
```

## 배포

```powershell
# 45.76.50.57 서버에 배포
.\deploy.ps1
```

## 환경 변수

`.env.local` 파일 생성:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Yurasis API
NEXT_PUBLIC_YURASIS_API_URL=https://yurasis.com/api/public
YURASIS_BLOG_SLUG=ssa
```

## Supabase 테이블

### `ssa_registrations`

```sql
create table ssa_registrations (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  name text not null,
  country text not null,
  language text default 'ko',
  skin_type text,
  quiz_result jsonb,
  created_at timestamptz default now()
);
```

## 도메인

- **메인**: https://seoulskinarchive.com
- **블로그**: https://blog.seoulskinarchive.com (동일 서버, /blog 경로)

## License

© 2026 Seoul Skin Archive. All rights reserved.
