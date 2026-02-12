import type { Metadata } from 'next';
import { AppHeader } from '@/components/header';
import { LanguageProvider } from '@/components/language-provider';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'POS Maintenance',
  description: 'Multi-tenant device maintenance management system'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <LanguageProvider>
          <main className="container">
            <AppHeader />
            {children}
          </main>
        </LanguageProvider>
      </body>
    </html>
  );
}
