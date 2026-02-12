import { WorkOrderTable } from '@/components/work-order-table';
import { workOrders } from '@/lib/mock-data';

const totalRevenue = workOrders.reduce((sum, w) => sum + w.total, 0);
const readyCount = workOrders.filter((w) => w.status === 'ready').length;
const waitingPart = workOrders.filter((w) => w.status === 'waiting_part').length;
const delivered = workOrders.filter((w) => w.status === 'delivered').length;

export default function DashboardPage() {
  return (
    <section className="stack">
      <h2>لوحة التحكم</h2>
      <div className="grid cols-4">
        <article className="kpi card">
          <p>إجمالي أوامر الصيانة</p>
          <h3>{workOrders.length}</h3>
        </article>
        <article className="kpi card">
          <p>الإيراد (إجمالي الفواتير)</p>
          <h3>{totalRevenue} ر.س</h3>
        </article>
        <article className="kpi card">
          <p>جاهز للتسليم</p>
          <h3>{readyCount}</h3>
        </article>
        <article className="kpi card">
          <p>بانتظار قطعة</p>
          <h3>{waitingPart}</h3>
        </article>
      </div>

      <article className="card">
        <h3>ملخص سريع</h3>
        <ul>
          <li>تم التسليم: {delivered}</li>
          <li>متوسط قيمة الفاتورة: {Math.round(totalRevenue / workOrders.length)} ر.س</li>
        </ul>
      </article>

      <h3>آخر أوامر الصيانة</h3>
      <WorkOrderTable items={workOrders} />
    </section>
  );
}
