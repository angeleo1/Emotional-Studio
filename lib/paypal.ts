// PayPal 설정 및 유틸리티

export const paypalConfig = {
  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'sb', // 테스트용 기본값
  currency: 'AUD',
  intent: 'capture' as const,
};

export const paypalOptions = {
  clientId: paypalConfig.clientId,
  currency: paypalConfig.currency,
  intent: paypalConfig.intent,
  components: 'buttons,marks,messages',
  enableFunding: 'card,venmo,applepay,googlepay',
  disableFunding: '',
  dataSdkIntegration: 'https://www.emotionalstudios.com.au',
  locale: 'en_AU',
  debug: process.env.NODE_ENV === 'development',
};

export const validatePayPalConfig = () => {
  const errors: string[] = [];
  
  if (typeof window !== 'undefined') {
    if (!process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID) {
      errors.push('NEXT_PUBLIC_PAYPAL_CLIENT_ID is not defined');
    } else if (!process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID.startsWith('A')) {
      errors.push('NEXT_PUBLIC_PAYPAL_CLIENT_ID appears to be invalid (should start with A)');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};
