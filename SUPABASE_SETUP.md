# Supabase 설정 가이드

## 1. Supabase 프로젝트 생성
1. https://supabase.com 에서 계정 생성
2. "New Project" 클릭
3. 프로젝트 이름: "emotional-studio-bookings"
4. 데이터베이스 비밀번호 설정
5. 리전 선택 (가장 가까운 지역)

## 2. 데이터베이스 테이블 생성
Supabase 대시보드의 SQL Editor에서 다음 쿼리 실행:

```sql
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  shooting_type TEXT NOT NULL,
  color_option BOOLEAN DEFAULT FALSE,
  a4print BOOLEAN DEFAULT FALSE,
  a4frame BOOLEAN DEFAULT FALSE,
  digital BOOLEAN DEFAULT FALSE,
  additional_retouch INTEGER DEFAULT 0,
  message TEXT DEFAULT '',
  total_amount TEXT NOT NULL,
  payment_status TEXT DEFAULT 'completed',
  payment_intent_id TEXT DEFAULT '',
  status TEXT DEFAULT 'confirmed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성 (성능 향상)
CREATE INDEX idx_bookings_date_time ON bookings(date, time);
CREATE INDEX idx_bookings_status ON bookings(status);
```

## 3. 환경 변수 설정
`.env.local` 파일에 다음 추가:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## 4. Vercel 환경 변수 설정
Vercel 대시보드에서 환경 변수 추가:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` 
- `SUPABASE_SERVICE_ROLE_KEY`

## 5. 테스트
설정 완료 후 예약을 테스트해보세요. 예약된 시간이 즉시 비활성화되어야 합니다.
