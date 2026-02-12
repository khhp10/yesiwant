'use client';

import { useLanguage } from '@/components/language-provider';
import { tr } from '@/lib/i18n';
import { workOrders } from '@/lib/mock-data';

export default function ReportsPage() {
  const { lang } = useLanguage();
  const byStatus = workOrders.reduce<Record<string, number>>((acc, row) => {
    acc[row.status] = (acc[row.status] ?? 0) + 1;
    return acc;
  }, {});

  const totals = workOrders.reduce((sum, row) => sum + row.total, 0);
  const waitingPart = workOrders.filter((w) => w.status === 'waiting_part');

  return (
    <section className="stack">
      <h2>{tr(lang, 'reports')}</h2>
      <article className="card modern-card">
        <h3>{tr(lang, 'kpiRevenue')}</h3>
        <p>{totals} {lang === 'ar' ? 'ر.س' : 'SAR'}</p>
      </article>
      <article className="card modern-card">
        <h3>{tr(lang, 'invoicesByStatus')}</h3>
        <ul>{Object.entries(byStatus).map(([key, count]) => <li key={key}>{key}: {count}</li>)}</ul>
      </article>
      <article className="card modern-card">
        <h3>{tr(lang, 'waitingPartInvoices')}</h3>
        <ul>{waitingPart.map((item) => <li key={item.id}>#{item.invoiceNo} - {item.customerName}</li>)}</ul>
      </article>
    </section>
  );
}
