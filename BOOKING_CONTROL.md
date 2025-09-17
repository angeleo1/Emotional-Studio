# Booking 모듈 활성화/비활성화 가이드

## 개요
Booking 모듈을 쉽게 활성화/비활성화할 수 있도록 설정되어 있습니다.

## 설정 방법

### 1. 설정 파일을 통한 제어 (권장)
`config/booking.ts` 파일에서 `BOOKING_CONFIG.ENABLED` 값을 변경하세요:

```typescript
export const BOOKING_CONFIG = {
  // 이 값을 false로 설정하면 booking 모듈이 비활성화됩니다
  ENABLED: false,  // true로 변경하면 활성화
  // ...
};
```

### 2. 환경 변수를 통한 제어
`.env.local` 파일에 다음 환경 변수를 추가하세요:

```bash
# Booking 모듈 활성화/비활성화
NEXT_PUBLIC_BOOKING_ENABLED=false  # true로 변경하면 활성화
```

**참고**: 환경 변수가 설정되어 있으면 환경 변수 값이 우선됩니다.

## 비활성화 시 동작

### 1. UI 컴포넌트
- **FloatingBookButton**: 버튼이 완전히 숨겨집니다
- **Navbar**: BOOKING 메뉴가 비활성화 상태로 표시됩니다 (회색, 클릭 불가)

### 2. 페이지
- **booking-backup.tsx**: 비활성화 메시지 페이지가 표시됩니다
- **mobile-booking.tsx**: 비활성화 메시지 페이지가 표시됩니다

### 3. API 엔드포인트
- **create-payment-intent.ts**: 503 에러 반환
- **check-availability.ts**: 503 에러 반환  
- **save-booking.ts**: 503 에러 반환

## 비활성화 메시지
다국어 지원으로 다음 언어의 메시지가 표시됩니다:
- 한국어: "현재 예약 서비스가 일시적으로 중단되었습니다. 문의사항이 있으시면 연락주세요."
- 영어: "Booking service is temporarily unavailable. Please contact us for inquiries."
- 중국어: "预订服务暂时不可用。如有疑问请联系我们。"

## 활성화 방법
1. `config/booking.ts`에서 `ENABLED: true`로 변경하거나
2. `.env.local`에 `NEXT_PUBLIC_BOOKING_ENABLED=true` 추가

변경 후 개발 서버를 재시작하면 즉시 적용됩니다.






















