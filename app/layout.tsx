import type { Metadata } from 'next';
import Link from 'next/link';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'POS صيانة',
  description: 'نظام إدارة صيانة أجهزة متعدد المستأجرين'
};

const links = [
  ['الرئيسية', '/'],
  ['لوحة التحكم', '/dashboard'],
  ['إضافة أمر صيانة', '/work-orders/new'],
  ['الحالات', '/status-board'],
  ['المخزون', '/inventory'],
  ['الإعدادات', '/settings'],
  ['التقارير', '/reports']
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <main className="container">
          <header className="header">
            <div>
              <h1>POS صيانة</h1>
              <p>إدارة صيانة أجهزة مع صلاحيات وباقات (MVP)</p>
            </div>
            <nav className="top-nav">
              {links.map(([label, href]) => (
                <Link key={href} href={href}>
                  {label}
                </Link>
              ))}
            </nav>
          </header>
          {children}
        </main>
      </body>
    </html>
  );
}
