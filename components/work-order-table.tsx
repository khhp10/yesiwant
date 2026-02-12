'use client';

import Link from 'next/link';
import { WorkOrder } from '@/lib/types';
import { PaymentBadge, StatusBadge } from './status-badge';
import { useLanguage } from './language-provider';

const text = {
  ar: {
    invoice: 'رقم الفاتورة',
    customer: 'العميل',
    device: 'الجهاز',
    status: 'الحالة',
    payment: 'الدفع',
    total: 'الإجمالي',
    action: 'إجراء',
    details: 'التفاصيل',
    currency: 'ر.س'
  },
  en: {
    invoice: 'Invoice',
    customer: 'Customer',
    device: 'Device',
    status: 'Status',
    payment: 'Payment',
    total: 'Total',
    action: 'Action',
    details: 'Details',
    currency: 'SAR'
  }
} as const;

export function WorkOrderTable({ items }: { items: WorkOrder[] }) {
  const { lang } = useLanguage();
  const t = text[lang];

  return (
    <div className="table-wrap card modern-card">
      <table>
        <thead>
          <tr>
            <th>{t.invoice}</th>
            <th>{t.customer}</th>
            <th>{t.device}</th>
            <th>{t.status}</th>
            <th>{t.payment}</th>
            <th>{t.total}</th>
            <th>{t.action}</th>
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
              <td>{row.total} {t.currency}</td>
              <td>
                <Link href={`/work-orders/${row.id}`}>{t.details}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
