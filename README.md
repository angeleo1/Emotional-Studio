# Emotional Studio

## 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 환경 변수들을 설정하세요:

```env
# Stripe API Keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Pusher (실시간 채팅)
PUSHER_APP_ID=your_pusher_app_id
PUSHER_KEY=your_pusher_key
PUSHER_SECRET=your_pusher_secret
PUSHER_CLUSTER=your_pusher_cluster

# Resend (이메일)
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=angeleo9691@gmail.com
```

## Stripe 설정

1. [Stripe Dashboard](https://dashboard.stripe.com/)에서 계정을 생성하세요
2. API Keys 섹션에서 Publishable Key와 Secret Key를 복사하세요
3. Webhooks 섹션에서 새로운 웹훅을 생성하세요:
   - URL: `https://yourdomain.com/api/webhook`
   - Events: `payment_intent.succeeded`

## 설치 및 실행

```bash
npm install
npm run dev
```

## 주요 기능

- 실시간 채팅 (Pusher)
- 이메일 연동 (Resend)
- 결제 시스템 (Stripe)
- 예약 시스템
- 관리자 대시보드 