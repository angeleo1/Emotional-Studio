import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { ChatBubbleLeftIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function InquiryButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation('common');

  return (
    <>
      {/* Inquiry Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 bg-accent text-white p-4 rounded-full shadow-lg hover:bg-opacity-90 transition-all z-50"
        aria-label="Open inquiry"
      >
        <ChatBubbleLeftIcon className="w-6 h-6" />
      </button>

      {/* Inquiry Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-primary rounded-lg p-6 max-w-md w-full mx-4 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Close inquiry"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-tan-kingred mb-4 text-primary dark:text-secondary">
              {t('inquiry.title')}
            </h2>

            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('inquiry.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent dark:bg-gray-800 dark:border-gray-700"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('inquiry.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent dark:bg-gray-800 dark:border-gray-700"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('inquiry.message')}
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent dark:bg-gray-800 dark:border-gray-700"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-accent text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-all"
              >
                {t('inquiry.submit')}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
} 