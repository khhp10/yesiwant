import { PaymentBadge, StatusBadge } from '@/components/status-badge';
import { auditByWorkOrderId, followUpsByWorkOrderId, workOrders } from '@/lib/mock-data';

export default function WorkOrderDetailsPage({ params }: { params: { id: string } }) {
  const item = workOrders.find((x) => x.id === params.id) ?? workOrders[0];
  const timeline = auditByWorkOrderId[item.id] ?? [];
  const followUps = followUpsByWorkOrderId[item.id] ?? [];

  return (
    <section className="stack">
      <h2>تفاصيل الفاتورة #{item.invoiceNo}</h2>

      <article className="card">
        <div className="grid cols-3">
          <div>
            <p className="muted">العميل</p>
            <strong>{item.customerName}</strong>
            <p>{item.customerPhone}</p>
          </div>
          <div>
            <p className="muted">الجهاز</p>
            <strong>{item.brand}</strong>
            <p>{item.deviceName}</p>
          </div>
          <div>
            <p className="muted">الحالة والدفع</p>
            <StatusBadge status={item.status} /> <PaymentBadge status={item.paymentStatus} />
            <p>المتبقي: {item.total - item.paid} ر.س</p>
          </div>
        </div>
      </article>

      <article className="card">
        <h3>المراجعات التابعة</h3>
        {followUps.length === 0 ? (
          <p className="muted">لا توجد مراجعات حتى الآن.</p>
        ) : (
          <ul>
            {followUps.map((f) => (
              <li key={f.id}>
                <strong>{f.code}</strong> - {f.note} ({f.date})
              </li>
            ))}
          </ul>
        )}
      </article>

      <article className="card">
        <h3>Timeline - سجل التدقيق</h3>
        <div className="timeline">
          {timeline.map((event) => (
            <div key={event.id} className="timeline-item">
              <div>
                <strong>{event.action}</strong>
                <p className="muted">
                  {event.user} - {event.at}
                </p>
              </div>
              <div className="grid cols-2">
                <pre>{JSON.stringify(event.oldValues ?? {}, null, 2)}</pre>
                <pre>{JSON.stringify(event.newValues ?? {}, null, 2)}</pre>
              </div>
            </div>
          ))}
        </div>
      </article>

      <article className="card actions">
        <button className="btn">تحديث الحالة</button>
        <button className="btn ghost">إضافة دفعة</button>
        <button className="btn ghost">طباعة فاتورة</button>
        <button className="btn ghost">طباعة ستيكر</button>
      </article>
    </section>
  );
}
