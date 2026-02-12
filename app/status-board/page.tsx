'use client';

import { useLanguage } from '@/components/language-provider';
import { StatusBadge } from '@/components/status-badge';
import { tr } from '@/lib/i18n';
import { workOrders } from '@/lib/mock-data';
import { WorkOrderStatus } from '@/lib/types';

const statuses: WorkOrderStatus[] = ['received','waiting_maintenance','waiting_part','ready','delivered','cancelled','unrepairable'];

export default function StatusBoardPage() {
  const { lang } = useLanguage();

  return (
    <section className="stack">
      <h2>{tr(lang, 'statusBoard')}</h2>
      <article className="card modern-card"><input className="full" placeholder={tr(lang, 'searchInvoicePhone')} /></article>
      <div className="board">
        {statuses.map((status) => {
          const rows = workOrders.filter((w) => w.status === status);
          return (
            <article className="card board-col modern-card" key={status}>
              <h3><StatusBadge status={status} /></h3>
              <p className="muted">{rows.length}</p>
              {rows.map((w) => (
                <div key={w.id} className="ticket">
                  <strong>#{w.invoiceNo}</strong>
                  <p>{w.customerName}</p>
                  <p className="muted">{w.deviceName}</p>
                </div>
              ))}
            </article>
          );
        })}
      </div>
    </section>
  );
}
