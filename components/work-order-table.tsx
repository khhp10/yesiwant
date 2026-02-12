import Link from 'next/link';
import { WorkOrder } from '@/lib/types';
import { PaymentBadge, StatusBadge } from './status-badge';

export function WorkOrderTable({ items }: { items: WorkOrder[] }) {
  return (
    <div className="table-wrap card">
      <table>
        <thead>
          <tr>
            <th>رقم الفاتورة</th>
            <th>العميل</th>
            <th>الجهاز</th>
            <th>الحالة</th>
            <th>الدفع</th>
            <th>الإجمالي</th>
            <th>إجراء</th>
          </tr>
        </thead>
        <tbody>
          {items.map((row) => (
            <tr key={row.id}>
              <td>{row.invoiceNo}</td>
              <td>
                <strong>{row.customerName}</strong>
                <div className="muted">{row.customerPhone}</div>
              </td>
              <td>
                {row.brand} - {row.deviceName}
              </td>
              <td>
                <StatusBadge status={row.status} />
              </td>
              <td>
                <PaymentBadge status={row.paymentStatus} />
              </td>
              <td>{row.total} ر.س</td>
              <td>
                <Link href={`/work-orders/${row.id}`}>التفاصيل</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
