'use client';

import Link from 'next/link';
import { tr } from '@/lib/i18n';
import { useLanguage } from './language-provider';

const navKeys: Array<{ href: string; key: 'home' | 'dashboard' | 'newWorkOrder' | 'statusBoard' | 'inventory' | 'settings' | 'reports' }> = [
  { href: '/', key: 'home' },
  { href: '/dashboard', key: 'dashboard' },
  { href: '/work-orders/new', key: 'newWorkOrder' },
  { href: '/status-board', key: 'statusBoard' },
  { href: '/inventory', key: 'inventory' },
  { href: '/settings', key: 'settings' },
  { href: '/reports', key: 'reports' }
];

export function AppHeader() {
  const { lang, toggleLang } = useLanguage();

  return (
    <header className="header modern-card">
      <div className="header-top">
        <div>
          <h1>{tr(lang, 'appTitle')}</h1>
          <p>{tr(lang, 'appDesc')}</p>
        </div>
        <button className="btn ghost" onClick={toggleLang} type="button">
          {tr(lang, 'switchLang')}
        </button>
      </div>
      <nav className="top-nav">
        {navKeys.map((item) => (
          <Link key={item.href} href={item.href}>
            {tr(lang, item.key)}
          </Link>
        ))}
      </nav>
    </header>
  );
}
