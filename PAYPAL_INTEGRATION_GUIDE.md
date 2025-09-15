# PayPal 결제 시스템 통합 가이드

## 개요

Stripe에서 PayPal로 전환하여 더 안정적이고 신뢰할 수 있는 결제 시스템을 구축했습니다.

## 주요 기능

✅ **다양한 결제 방법 지원**
- PayPal 계정 결제
- 신용카드/체크카드 직접 결제 (Guest Checkout)
- Apple Pay
- Google Pay
- 디지털 지갑

✅ **호주 최적화**
- AUD 통화 지원
- 호주 현지 결제 규정 준수
- 모바일 최적화

✅ **개발자 친화적**
- 간단한 API 통합
- 자동 토큰 관리
- 포괄적인 에러 처리

## 환경변수 설정

`.env.local` 파일에 다음 환경변수를 추가하세요:

```env
# PayPal API Keys
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id_here
PAYPAL_CLIENT_SECRET=your_paypal_client_secret_here
PAYPAL_API_URL=https://api-m.sandbox.paypal.com

# 기존 환경변수들
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=your-email@example.com
NEXT_PUBLIC_BOOKING_ENABLED=true
```

## PayPal 계정 설정

### 1. 개발자 계정 생성
1. [PayPal Developer Dashboard](https://developer.paypal.com/) 방문
2. PayPal 계정으로 로그인
3. "Create App" 클릭

### 2. 앱 생성
1. **App Name**: Emotional Studio
2. **Merchant**: Sandbox (테스트용)
3. **Features**: 
   - Accept payments
   - Future payments
   - Log in with PayPal

### 3. API 키 복사
1. 생성된 앱에서 "Sandbox" 탭 클릭
2. Client ID와 Client Secret 복사
3. `.env.local`에 추가

### 4. 프로덕션 설정 (나중에)
1. Live 계정으로 전환
2. `PAYPAL_API_URL`을 `https://api-m.paypal.com`으로 변경

## 테스트 방법

### 1. 설정 확인
```bash
curl http://localhost:3001/api/check-paypal-config
```

### 2. 테스트 페이지
- `/test-paypal` 페이지에서 결제 테스트
- 테스트 금액: $1.00 AUD

### 3. 부킹 플로우 테스트
1. 메인 페이지에서 "Book Now" 클릭
2. 폼 작성 후 "Proceed to Secure Payment" 클릭
3. PayPal 결제 진행

## API 엔드포인트

### `/api/paypal/create-order`
- PayPal 주문 생성
- POST 요청으로 bookingData와 amount 전송

### `/api/paypal/capture-order`
- PayPal 주문 캡처 (결제 완료)
- POST 요청으로 orderID 전송

### `/api/check-paypal-config`
- PayPal 설정 상태 확인
- GET 요청으로 환경변수 상태 반환

## 결제 플로우

1. **사용자 폼 작성** → BookingModal
2. **결제 모달 열기** → PayPalPaymentModal
3. **PayPal 주문 생성** → `/api/paypal/create-order`
4. **사용자 결제** → PayPal 버튼
5. **결제 캡처** → `/api/paypal/capture-order`
6. **예약 저장** → `/api/save-booking`
7. **확인 이메일** → Resend

## 에러 처리

- **환경변수 누락**: 명확한 에러 메시지 표시
- **API 오류**: 구체적인 오류 정보 제공
- **결제 실패**: 사용자 친화적 메시지
- **네트워크 오류**: 재시도 옵션 제공

## 보안 고려사항

- **클라이언트 키**: `NEXT_PUBLIC_` 접두사로 브라우저에서 사용
- **서버 키**: 서버 사이드에서만 사용
- **토큰 관리**: 자동 갱신 및 캐싱
- **HTTPS**: 프로덕션에서 필수

## 수수료

- **호주 기준**: 2.6% + $0.30 AUD (거래당)
- **Stripe 대비**: 더 저렴한 수수료
- **월 사용료**: 없음

## 장점

1. **안정성**: 수십 년간 검증된 플랫폼
2. **신뢰도**: 사용자들이 가장 신뢰하는 결제 방식
3. **간편성**: 개발자 친화적인 API
4. **호환성**: 모든 기기와 브라우저 지원
5. **지역화**: 호주 현지 최적화

## 문제 해결

### 일반적인 문제들

1. **"PayPal not configured" 오류**
   - 환경변수 확인
   - `.env.local` 파일 재시작

2. **"Invalid client ID" 오류**
   - PayPal Developer Dashboard에서 키 확인
   - Sandbox/Live 환경 일치 확인

3. **결제 버튼이 나타나지 않음**
   - 브라우저 콘솔에서 오류 확인
   - 네트워크 연결 상태 확인

### 디버깅

```bash
# 환경변수 확인
curl http://localhost:3001/api/check-paypal-config

# 개발 서버 재시작
npm run dev

# 브라우저 콘솔 확인
# Network 탭에서 API 호출 확인
```

## 다음 단계

1. PayPal 계정 설정 완료
2. 테스트 결제 진행
3. 프로덕션 환경 준비
4. Live 계정으로 전환
5. 모니터링 및 최적화

