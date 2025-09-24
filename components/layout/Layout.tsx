import { ReactNode } from 'react';
import TopBanner from '../TopBanner';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBanner />
      <main className="flex-grow">
        {children}
      </main>
      {/* <InquiryButton /> */}
    </div>
  );
} 