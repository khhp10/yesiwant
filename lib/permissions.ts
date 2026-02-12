export const PERMISSIONS = {
  WORK_ORDER_CREATE: 'work_order.create',
  WORK_ORDER_UPDATE: 'work_order.update',
  WORK_ORDER_CHANGE_STATUS: 'work_order.change_status',
  WORK_ORDER_PRINT: 'work_order.print',
  FOLLOW_UP_CREATE: 'follow_up.create',
  INVENTORY_MANAGE: 'inventory.manage',
  REPORTS_VIEW: 'reports.view',
  USERS_MANAGE: 'users.manage',
  ROLES_MANAGE: 'roles.manage',
  PLAN_MANAGE: 'plan.manage',
  CUSTOM_FIELDS_MANAGE: 'custom_fields.manage',
  PRINT_SETTINGS_MANAGE: 'print_settings.manage'
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
