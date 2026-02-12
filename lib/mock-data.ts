import { AuditEvent, FollowUp, InventoryItem, WorkOrder, WorkOrderStatus } from './types';

export const statusLabels: Record<WorkOrderStatus, string> = {
  received: 'مستلم',
  waiting_maintenance: 'بانتظار الصيانة',
  waiting_part: 'بانتظار القطعة',
  ready: 'جاهز',
  delivered: 'تم التسليم',
  cancelled: 'ملغى',
  unrepairable: 'لا يمكن تصليحه'
};

export const workOrders: WorkOrder[] = [
  {
    id: 'wo-1',
    invoiceNo: 1432,
    customerName: 'محمد السبيعي',
    customerPhone: '0501234567',
    deviceName: 'Clover Flex',
    brand: 'Clover',
    issue: 'الشاشة لا تعمل',
    status: 'waiting_part',
    paymentStatus: 'partial',
    total: 420,
    paid: 120,
    receivedAt: '2026-02-10 10:35',
    receiverName: 'أحمد'
  },
  {
    id: 'wo-2',
    invoiceNo: 1433,
    customerName: 'خالد العتيبي',
    customerPhone: '0557773322',
    deviceName: 'Sunmi V2',
    brand: 'Sunmi',
    issue: 'لا يشحن',
    status: 'ready',
    paymentStatus: 'pending',
    total: 280,
    paid: 0,
    receivedAt: '2026-02-11 13:10',
    receiverName: 'سارة'
  },
  {
    id: 'wo-3',
    invoiceNo: 1434,
    customerName: 'ناصر القرني',
    customerPhone: '0538882211',
    deviceName: 'PAX A920',
    brand: 'PAX',
    issue: 'تعليق متكرر',
    status: 'received',
    paymentStatus: 'unpaid',
    total: 150,
    paid: 0,
    receivedAt: '2026-02-12 09:12',
    receiverName: 'أحمد'
  }
];

export const followUpsByWorkOrderId: Record<string, FollowUp[]> = {
  'wo-1': [
    {
      id: 'f-1',
      code: '1432-1',
      status: 'waiting_maintenance',
      note: 'رجوع بسبب نفس مشكلة الشاشة بعد أسبوع.',
      date: '2026-02-12 11:00'
    }
  ]
};

export const auditByWorkOrderId: Record<string, AuditEvent[]> = {
  'wo-1': [
    {
      id: 'a-1',
      action: 'إنشاء الفاتورة',
      user: 'أحمد',
      at: '2026-02-10 10:35',
      newValues: { status: 'received', total: 420 }
    },
    {
      id: 'a-2',
      action: 'تغيير الحالة',
      user: 'فهد الفني',
      at: '2026-02-10 11:10',
      oldValues: { status: 'received' },
      newValues: { status: 'waiting_maintenance' }
    },
    {
      id: 'a-3',
      action: 'تحديث الدفع',
      user: 'سارة',
      at: '2026-02-10 11:30',
      oldValues: { payment: 'unpaid', paid: 0 },
      newValues: { payment: 'partial', paid: 120 }
    }
  ]
};

export const inventoryItems: InventoryItem[] = [
  { id: 'i-1', partName: 'شاشة Sunmi V2', partType: 'شاشة', brand: 'Sunmi', quantity: 8, unitPrice: 190 },
  { id: 'i-2', partName: 'بطارية Clover Flex', partType: 'بطارية', brand: 'Clover', quantity: 12, unitPrice: 110 },
  { id: 'i-3', partName: 'كاميرا PAX A920', partType: 'كاميرا', brand: 'PAX', quantity: 4, unitPrice: 140 }
];
