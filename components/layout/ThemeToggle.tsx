import { useTheme } from 'next-themes';
import { useTranslation } from 'next-i18next';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation('common');

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
      aria-label={theme === 'dark' ? t('theme.light') : t('theme.dark')}
    >
      {theme === 'dark' ? (
        <SunIcon className="w-5 h-5 text-secondary" />
      ) : (
        <MoonIcon className="w-5 h-5 text-primary" />
      )}
    </button>
  );
} 