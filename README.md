# 본닷 (bondot-app)

전국 검진센터 비교·예약 웹앱. Next.js + Supabase 기반.

## 페이지 구조

- `/` — 홈페이지 (본닷 소개, 파트너 병원, 외국인 환자 안내, "예약하기" 버튼)
- `/booking` — 실제 검진센터 비교·예약 화면 (목록/상세/본인확인/결제)

## 1. Supabase 프로젝트 만들기 (무료)

1. https://supabase.com 접속 → 회원가입 → "New project" 생성
2. 프로젝트가 만들어지면 왼쪽 메뉴 **SQL Editor** 클릭
3. 이 저장소의 `supabase/schema.sql` 내용을 전부 복사해서 붙여넣고 **Run** 클릭
   → `bookings` 테이블과 중복예약 방지 규칙이 자동으로 생성됩니다.
4. 왼쪽 메뉴 **Settings > API**로 이동
5. `Project URL`과 `anon public` 키를 복사해두세요 (다음 단계에서 사용)

## 2. 로컬에서 실행해보기 (선택, 개발자용)

```bash
npm install
cp .env.local.example .env.local
# .env.local 파일을 열어 위에서 복사한 Supabase URL/키를 붙여넣기
npm run dev
```

브라우저에서 http://localhost:3000 접속하면 화면이 보입니다.

## 3. GitHub에 코드 올리기

1. https://github.com 에서 새 저장소(Repository) 생성 (예: `bondot-app`)
2. 이 폴더 전체를 그 저장소에 push
   (개발자에게 맡기시면 이 과정을 대신 해줍니다)

## 4. Vercel에 배포하기

1. https://vercel.com 접속 → GitHub 계정으로 로그인
2. "Add New Project" → 방금 만든 GitHub 저장소 선택
3. **Environment Variables** 항목에 아래 두 개를 추가:
   - `NEXT_PUBLIC_SUPABASE_URL` = (1단계에서 복사한 Project URL)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (1단계에서 복사한 anon public 키)
4. **Deploy** 클릭 → 몇 분 후 `xxxxx.vercel.app` 주소로 배포 완료

## 5. bondot.co.kr 도메인 연결하기

1. Vercel 프로젝트 화면 → **Settings > Domains**
2. `bondot.co.kr` 입력 후 추가
3. Vercel이 알려주는 DNS 레코드(A레코드 또는 CNAME)를 확인
4. 도메인을 구매한 곳(가비아/후이즈 등) 관리 페이지에 로그인 →
   DNS 관리 메뉴에서 Vercel이 알려준 레코드를 그대로 입력
5. 보통 몇 분~몇 시간 내로 https://bondot.co.kr 접속이 정상 작동합니다
   (SSL 인증서는 Vercel이 자동으로 발급해줘요)

## 파일 구성

```
app/page.js             홈페이지 (소개/랜딩)
app/booking/page.js     검진 비교·예약 화면 (목록/상세/예약/결제)
app/layout.js            기본 레이아웃, 페이지 제목/설명
lib/supabaseClient.js  Supabase 연결 설정
supabase/schema.sql     Supabase에 붙여넣을 테이블 생성 SQL
.env.local.example      환경변수 예시 파일
```

## 참고

- 예약 데이터는 Supabase `bookings` 테이블에 저장됩니다.
- 같은 센터·같은 날짜·같은 시간에 동시에 두 명이 예약하면, DB의 unique 제약 조건이
  하나만 통과시키고 나머지는 자동으로 "이미 예약된 시간" 오류를 반환합니다.
- 본인확인(휴대폰 인증)은 현재 데모용으로, 실제 문자 발송은 되지 않고 화면에
  인증번호를 바로 보여줍니다. 실제 서비스 전환 시 알리고/NHN Cloud 같은
  SMS 발송 API 연동이 필요합니다.
- 결제(예약금)도 실제 PG 연동 없이 UI 흐름만 시뮬레이션합니다. 실제 결제를
  받으려면 토스페이먼츠/카카오페이 등의 PG 계약과 API 연동이 별도로 필요합니다.
