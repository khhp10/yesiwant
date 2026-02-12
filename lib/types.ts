export type WorkOrderStatus =
  | 'received'
  | 'waiting_maintenance'
  | 'waiting_part'
  | 'ready'
  | 'delivered'
  | 'cancelled'
  | 'unrepairable';

export type PaymentStatus = 'unpaid' | 'pending' | 'partial' | 'paid';

export interface WorkOrder {
  id: string;
  invoiceNo: number;
  customerName: string;
  customerPhone: string;
  deviceName: string;
  brand: string;
  issue: string;
  status: WorkOrderStatus;
  paymentStatus: PaymentStatus;
  total: number;
  paid: number;
  receivedAt: string;
  receiverName: string;
}

export interface AuditEvent {
  id: string;
  action: string;
  user: string;
  at: string;
  oldValues?: Record<string, string | number>;
  newValues?: Record<string, string | number>;
}

export interface FollowUp {
  id: string;
  code: string;
  status: WorkOrderStatus;
  note: string;
  date: string;
}

export interface InventoryItem {
  id: string;
  partName: string;
  partType: string;
  brand: string;
  quantity: number;
  unitPrice: number;
}
