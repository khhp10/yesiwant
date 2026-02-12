'use client';

import { PaymentBadge, StatusBadge } from '@/components/status-badge';
import { useLanguage } from '@/components/language-provider';
import { tr } from '@/lib/i18n';
import { auditByWorkOrderId, followUpsByWorkOrderId, workOrders } from '@/lib/mock-data';

export default function WorkOrderDetailsPage({ params }: { params: { id: string } }) {
  const { lang } = useLanguage();
  const item = workOrders.find((x) => x.id === params.id) ?? workOrders[0];
  const timeline = auditByWorkOrderId[item.id] ?? [];
  const followUps = followUpsByWorkOrderId[item.id] ?? [];

  return (
    <section className="stack">
      <h2>{tr(lang, 'workOrderDetails')} #{item.invoiceNo}</h2>
      <article className="card modern-card">
        <div className="grid cols-3">
          <div><p className="muted">{tr(lang, 'customer')}</p><strong>{item.customerName}</strong><p>{item.customerPhone}</p></div>
          <div><p className="muted">{tr(lang, 'device')}</p><strong>{item.brand}</strong><p>{item.deviceName}</p></div>
          <div><p className="muted">{tr(lang, 'statusPayment')}</p><StatusBadge status={item.status} /> <PaymentBadge status={item.paymentStatus} /><p>{tr(lang, 'remaining')}: {item.total - item.paid} {lang === 'ar' ? 'ر.س' : 'SAR'}</p></div>
        </div>
      </article>

      <article className="card modern-card">
        <h3>{tr(lang, 'followups')}</h3>
        {followUps.length === 0 ? <p className="muted">{tr(lang, 'noFollowups')}</p> : <ul>{followUps.map((f) => <li key={f.id}><strong>{f.code}</strong> - {f.note} ({f.date})</li>)}</ul>}
      </article>

      <article className="card modern-card">
        <h3>{tr(lang, 'timeline')}</h3>
        <div className="timeline">
          {timeline.map((event) => (
            <div key={event.id} className="timeline-item">
              <div><strong>{event.action}</strong><p className="muted">{event.user} - {event.at}</p></div>
              <div className="grid cols-2"><pre>{JSON.stringify(event.oldValues ?? {}, null, 2)}</pre><pre>{JSON.stringify(event.newValues ?? {}, null, 2)}</pre></div>
            </div>
          ))}
        </div>
      </article>

      <article className="card actions modern-card">
        <button className="btn">{tr(lang, 'updateStatus')}</button>
        <button className="btn ghost">{tr(lang, 'addPayment')}</button>
        <button className="btn ghost">{tr(lang, 'printInvoice')}</button>
        <button className="btn ghost">{tr(lang, 'printSticker')}</button>
      </article>
    </section>
  );
}
