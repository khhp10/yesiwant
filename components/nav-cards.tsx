'use client';

import Link from 'next/link';
import { tr } from '@/lib/i18n';
import { useLanguage } from './language-provider';

const links: Array<{ href: string; key: 'dashboard' | 'newWorkOrder' | 'statusBoard' | 'inventory' | 'settings' | 'reports' }> = [
  { href: '/dashboard', key: 'dashboard' },
  { href: '/work-orders/new', key: 'newWorkOrder' },
  { href: '/status-board', key: 'statusBoard' },
  { href: '/inventory', key: 'inventory' },
  { href: '/settings', key: 'settings' },
  { href: '/reports', key: 'reports' }
];

export function NavCards() {
  const { lang } = useLanguage();

  return (
    <section className="card modern-card">
      <h2>{tr(lang, 'quickAccess')}</h2>
      <div className="grid cols-3">
        {links.map((item) => (
          <Link className="quick-link" key={item.href} href={item.href}>
            {tr(lang, item.key)}
          </Link>
        ))}
      </div>
    </section>
  );
}
