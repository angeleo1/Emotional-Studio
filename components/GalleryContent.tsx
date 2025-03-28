import { useTranslation } from 'next-i18next';

export default function GalleryContent() {
  const { t } = useTranslation('common');

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">{t('gallery.mainTitle')}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 여기에 갤러리 이미지들이 들어갈 예정입니다 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="aspect-w-16 aspect-h-9 bg-gray-200"></div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">{t('gallery.sampleTitle')}</h3>
              <p className="mt-2 text-gray-600">{t('gallery.sampleDescription')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 