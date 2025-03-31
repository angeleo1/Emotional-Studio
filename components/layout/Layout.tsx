import { ReactNode } from 'react';
import Footer from './Footer';
import InquiryButton from '../common/InquiryButton';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <InquiryButton />
    </div>
  );
} 