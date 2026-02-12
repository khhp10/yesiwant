'use client';

import { useLanguage } from './language-provider';
import { PaymentStatus, WorkOrderStatus } from '@/lib/types';

const statusLabels = {
  ar: {
    received: 'مستلم',
    waiting_maintenance: 'بانتظار الصيانة',
    waiting_part: 'بانتظار القطعة',
    ready: 'جاهز',
    delivered: 'تم التسليم',
    cancelled: 'ملغى',
    unrepairable: 'لا يمكن تصليحه'
  },
  en: {
    received: 'Received',
    waiting_maintenance: 'Waiting Maintenance',
    waiting_part: 'Waiting Part',
    ready: 'Ready',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
    unrepairable: 'Unrepairable'
  }
} as const;

const paymentLabels = {
  ar: {
    unpaid: 'غير مدفوع',
    pending: 'بانتظار الدفع',
    partial: 'مدفوع جزئي',
    paid: 'مدفوع بالكامل'
  },
  en: {
    unpaid: 'Unpaid',
    pending: 'Pending',
    partial: 'Partial',
    paid: 'Paid'
  }
} as const;

export function StatusBadge({ status }: { status: WorkOrderStatus }) {
  const { lang } = useLanguage();
  return <span className={`badge status-${status}`}>{statusLabels[lang][status]}</span>;
}

export function PaymentBadge({ status }: { status: PaymentStatus }) {
  const { lang } = useLanguage();
  return <span className={`badge pay-${status}`}>{paymentLabels[lang][status]}</span>;
}
