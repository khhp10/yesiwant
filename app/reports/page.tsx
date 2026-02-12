import { workOrders } from '@/lib/mock-data';

export default function ReportsPage() {
  const byStatus = workOrders.reduce<Record<string, number>>((acc, row) => {
    acc[row.status] = (acc[row.status] ?? 0) + 1;
    return acc;
  }, {});

  const totals = workOrders.reduce((sum, row) => sum + row.total, 0);
  const waitingPart = workOrders.filter((w) => w.status === 'waiting_part');

  return (
    <section className="stack">
      <h2>التقارير</h2>
      <article className="card">
        <h3>إجمالي مبالغ الفواتير</h3>
        <p>{totals} ر.س</p>
      </article>

      <article className="card">
        <h3>عدد الفواتير حسب الحالة</h3>
        <ul>
          {Object.entries(byStatus).map(([key, count]) => (
            <li key={key}>
              {key}: {count}
            </li>
          ))}
        </ul>
      </article>

      <article className="card">
        <h3>الفواتير بانتظار القطعة</h3>
        <ul>
          {waitingPart.map((item) => (
            <li key={item.id}>
              #{item.invoiceNo} - {item.customerName}
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}
