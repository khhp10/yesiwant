import { statusLabels, workOrders } from '@/lib/mock-data';
import { WorkOrderStatus } from '@/lib/types';

const statuses: WorkOrderStatus[] = [
  'received',
  'waiting_maintenance',
  'waiting_part',
  'ready',
  'delivered',
  'cancelled',
  'unrepairable'
];

export default function StatusBoardPage() {
  return (
    <section className="stack">
      <h2>لوحة الحالات</h2>
      <article className="card">
        <input className="full" placeholder="بحث برقم الفاتورة أو رقم الجوال" />
      </article>

      <div className="board">
        {statuses.map((status) => {
          const rows = workOrders.filter((w) => w.status === status);
          return (
            <article className="card board-col" key={status}>
              <h3>{statusLabels[status]}</h3>
              <p className="muted">{rows.length} عنصر</p>
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
