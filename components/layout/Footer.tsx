import Link from 'next/link';
import { useTranslation } from 'next-i18next';

export default function Footer() {
  const { t } = useTranslation('common');

  return (
    <footer className="bg-primary text-secondary py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-tan-kingred mb-4">Emotional Studio</h3>
            <p className="text-sm opacity-80">
              Where Memories Come to Life
            </p>
          </div>
          
          <div>
            <h4 className="font-tan-kingred mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-accent transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link href="/service" className="hover:text-accent transition-colors">
                  {t('nav.service')}
                </Link>
              </li>
              <li>
                <Link href="/booking" className="hover:text-accent transition-colors">
                  {t('nav.booking')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-tan-kingred mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>123 Studio Street</li>
              <li>Melbourne, VIC 3000</li>
              <li>+61 123 456 789</li>
              <li>info@emotionalstudio.com</li>
            </ul>
          </div>

          <div>
            <h4 className="font-tan-kingred mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-accent transition-colors">
                Instagram
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                Facebook
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                Twitter
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-secondary/20 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Emotional Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 