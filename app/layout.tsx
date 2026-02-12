import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'POS صيانة',
  description: 'نظام إدارة صيانة أجهزة متعدد المستأجرين'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <main className="container">
          <header className="header">
            <h1>POS صيانة</h1>
            <p>Scaffold MVP متعدد المستأجرين</p>
          </header>
          {children}
        </main>
      </body>
    </html>
  );
}
