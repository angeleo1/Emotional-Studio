import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function LanguageSelector() {
  const router = useRouter();
  const { t } = useTranslation('common');

  const languages = [
    { code: 'en', label: t('language.en') },
    { code: 'zh', label: t('language.zh') }
  ];

  const changeLanguage = (locale: string) => {
    router.push(router.pathname, router.asPath, { locale });
  };

  const currentLanguage = languages.find(lang => lang.code === router.locale) || languages[0];

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-primary dark:text-secondary hover:bg-gray-100 dark:hover:bg-white/10 rounded-md transition-colors">
          {currentLanguage.label}
          <ChevronDownIcon className="w-4 h-4 ml-2" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-32 origin-top-right rounded-md bg-white dark:bg-primary shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {languages.map((language) => (
              <Menu.Item key={language.code}>
                {({ active }) => (
                  <button
                    onClick={() => changeLanguage(language.code)}
                    className={`${
                      active ? 'bg-gray-100 dark:bg-white/10' : ''
                    } ${
                      router.locale === language.code ? 'text-accent' : 'text-primary dark:text-secondary'
                    } block w-full text-left px-4 py-2 text-sm`}
                  >
                    {language.label}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
} 