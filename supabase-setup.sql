-- Seoul Skin Archive 사전등록 테이블
-- Supabase SQL Editor에서 실행

create table if not exists ssa_registrations (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  name text not null,
  country text not null,
  language text default 'ko',
  skin_type text,
  quiz_result jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS (Row Level Security) 활성화
alter table ssa_registrations enable row level security;

-- 익명 사용자가 등록 가능하도록 정책 생성
create policy "Anyone can insert registrations"
  on ssa_registrations
  for insert
  to anon
  with check (true);

-- 인덱스 생성
create index if not exists ssa_registrations_email_idx on ssa_registrations(email);
create index if not exists ssa_registrations_created_at_idx on ssa_registrations(created_at);

-- updated_at 자동 갱신 트리거
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_ssa_registrations_updated_at
  before update on ssa_registrations
  for each row
  execute function update_updated_at_column();

-- 완료 메시지
select 'SSA registrations table created successfully!' as status;
