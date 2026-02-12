# UI Routes + Components

## 1) Dashboard `/dashboard`
- KPI cards: إجمالي الفواتير، جاهز، بانتظار القطعة، تم التسليم.
- charts: حسب الحالة + حسب الفترة.
- recent activity: من audit logs.

## 2) New Work Order `/work-orders/new`
- sections:
  - بيانات العميل
  - بيانات الجهاز
  - الدفع
  - الحقول المخصصة
- smart inputs:
  - اختيار من قائمة أو إدخال يدوي (مع حفظ بالقائمة).

## 3) Work Order Details `/work-orders/[id]`
- header: invoice info + status + payment badge.
- tabs:
  - التفاصيل
  - timeline (audit)
  - follow-ups
- actions:
  - change status
  - add payment
  - print invoice/sticker

## 4) Status Board `/status-board`
- أعمدة حسب الحالات (kanban-lite).
- بحث برقم الفاتورة/الجوال.

## 5) Inventory `/inventory`
- table + filters:
  - brand -> part_type
  - part_type -> brand
- create/edit item modal.

## 6) Settings `/settings`
- users/roles/permissions
- custom fields builder
- feature flags حسب الباقة
- print settings (sticker size + template)

## 7) Reports `/reports`
- invoice by status
- totals by date range
- delayed/waiting-part report
- user activity aggregates
