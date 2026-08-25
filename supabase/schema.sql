-- Supabase 대시보드 > SQL Editor 에 붙여넣고 실행(Run)하세요.

create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  center_id integer not null,
  center_name text not null,
  area text,
  tags text[],
  booking_date date not null,
  date_label text,
  booking_time text not null,
  price integer,
  deposit integer,
  payment_method text,
  name text not null,
  phone text not null,
  is_foreign boolean default false,
  nationality text,
  passport text,
  airport_pickup boolean default false,
  interpreter boolean default false,
  created_at timestamptz default now()
);

-- 같은 센터/날짜/시간에 중복 예약 방지 (동시 예약 충돌 방지의 핵심)
create unique index if not exists unique_slot
  on bookings (center_id, booking_date, booking_time);

-- 누구나 예약을 넣고(insert) 자기 전화번호로 조회(select)할 수 있게 허용.
-- 실제 서비스에서는 이 정책을 더 엄격하게 다듬는 걸 권장합니다.
alter table bookings enable row level security;

create policy "anyone can insert bookings"
  on bookings for insert
  with check (true);

create policy "anyone can read bookings"
  on bookings for select
  using (true);
