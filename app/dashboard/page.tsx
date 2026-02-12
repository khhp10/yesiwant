'use client';

import { WorkOrderTable } from '@/components/work-order-table';
import { useLanguage } from '@/components/language-provider';
import { tr } from '@/lib/i18n';
import { workOrders } from '@/lib/mock-data';

const totalRevenue = workOrders.reduce((sum, w) => sum + w.total, 0);
const readyCount = workOrders.filter((w) => w.status === 'ready').length;
const waitingPart = workOrders.filter((w) => w.status === 'waiting_part').length;
const delivered = workOrders.filter((w) => w.status === 'delivered').length;

export default function DashboardPage() {
  const { lang } = useLanguage();

  return (
    <section className="stack">
      <h2>{tr(lang, 'dashboard')}</h2>
      <div className="grid cols-4">
        <article className="kpi card modern-card"><p>{tr(lang, 'kpiTotalOrders')}</p><h3>{workOrders.length}</h3></article>
        <article className="kpi card modern-card"><p>{tr(lang, 'kpiRevenue')}</p><h3>{totalRevenue} {lang === 'ar' ? 'ر.س' : 'SAR'}</h3></article>
        <article className="kpi card modern-card"><p>{tr(lang, 'kpiReady')}</p><h3>{readyCount}</h3></article>
        <article className="kpi card modern-card"><p>{tr(lang, 'kpiWaitingPart')}</p><h3>{waitingPart}</h3></article>
      </div>

      <article className="card modern-card">
        <h3>{tr(lang, 'summary')}</h3>
        <ul>
          <li>{tr(lang, 'delivered')}: {delivered}</li>
          <li>{tr(lang, 'avgInvoice')}: {Math.round(totalRevenue / workOrders.length)} {lang === 'ar' ? 'ر.س' : 'SAR'}</li>
        </ul>
      </article>

      <h3>{tr(lang, 'latestOrders')}</h3>
      <WorkOrderTable items={workOrders} />
    </section>
  );
}
