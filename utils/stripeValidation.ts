// Stripe 환경변수 검증 유틸리티

export const validateStripeConfig = () => {
  const errors: string[] = [];
  
  // 클라이언트 사이드 환경변수 검증
  if (typeof window !== 'undefined') {
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      errors.push('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined');
    } else if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.startsWith('pk_')) {
      errors.push('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY appears to be invalid (should start with pk_)');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const getStripeConfig = () => {
  const validation = validateStripeConfig();
  
  if (!validation.isValid) {
    console.error('Stripe configuration errors:', validation.errors);
    return null;
  }
  
  return {
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
    isConfigured: true
  };
};
