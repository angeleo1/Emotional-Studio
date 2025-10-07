import { GetServerSidePropsContext } from 'next';

export const isMobileFromUserAgent = (userAgent: string): boolean => {
  if (!userAgent) return false;
  
  const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
  return mobileRegex.test(userAgent);
};

export const getDeviceTypeFromRequest = (context: GetServerSidePropsContext): 'mobile' | 'desktop' => {
  const userAgent = context.req.headers['user-agent'] || '';
  return isMobileFromUserAgent(userAgent) ? 'mobile' : 'desktop';
};
