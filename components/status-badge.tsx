import { statusLabels } from '@/lib/mock-data';
import { PaymentStatus, WorkOrderStatus } from '@/lib/types';

export function StatusBadge({ status }: { status: WorkOrderStatus }) {
  return <span className={`badge status-${status}`}>{statusLabels[status]}</span>;
}

const paymentLabels: Record<PaymentStatus, string> = {
  unpaid: 'غير مدفوع',
  pending: 'بانتظار الدفع',
  partial: 'مدفوع جزئي',
  paid: 'مدفوع بالكامل'
};

export function PaymentBadge({ status }: { status: PaymentStatus }) {
  return <span className={`badge pay-${status}`}>{paymentLabels[status]}</span>;
}
