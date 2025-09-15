# Emotional Studio

## 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 환경 변수들을 설정하세요:

```env
# PayPal API Keys
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id_here
PAYPAL_CLIENT_SECRET=your_paypal_client_secret_here
PAYPAL_API_URL=https://api-m.sandbox.paypal.com

# Pusher (실시간 채팅)
PUSHER_APP_ID=your_pusher_app_id
PUSHER_KEY=your_pusher_key
PUSHER_SECRET=your_pusher_secret
PUSHER_CLUSTER=your_pusher_cluster

# Resend (이메일)
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=angeleo9691@gmail.com
```

## PayPal 설정

1. [PayPal Developer Dashboard](https://developer.paypal.com/)에서 계정을 생성하세요
2. "Create App"을 클릭하여 새 앱을 생성하세요
3. Sandbox 계정을 사용하여 테스트하세요
4. 앱 설정에서 Client ID와 Client Secret을 복사하세요
5. 프로덕션 환경에서는 Live 계정을 사용하세요

## 설치 및 실행

```bash
npm install
npm run dev
```

## 주요 기능

- 실시간 채팅 (Pusher)
- 이메일 연동 (Resend)
- 결제 시스템 (PayPal)
- 예약 시스템
- 관리자 대시보드 