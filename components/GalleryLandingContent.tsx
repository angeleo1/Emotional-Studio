import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

export default function GalleryLandingContent() {
  const router = useRouter();
  const { t } = useTranslation('common');

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/gallery');
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  const handleEnter = () => {
    router.push('/gallery');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white">
      <h1 className="text-6xl font-bold mb-8">{t('gallery.title')}</h1>
      <p className="text-xl mb-12">{t('gallery.description')}</p>
      <button
        onClick={handleEnter}
        className="px-8 py-4 bg-white text-black rounded-lg text-xl font-semibold hover:bg-gray-200 transition-colors duration-300"
      >
        {t('gallery.enter')}
      </button>
      <p className="mt-8 text-gray-400">{t('gallery.autoRedirect')}</p>
    </div>
  );
} 