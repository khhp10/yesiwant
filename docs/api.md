# API Design (Tenant-aware)

## قواعد عامة
- كل طلب يمر عبر middleware يستخرج `tenant_id` من الجلسة/token.
- قبل أي query على PostgreSQL يتم ضبط:
  - `set local app.tenant_id = '<tenant-uuid>'`.
- كل endpoint يتحقق من صلاحية RBAC + feature flag حسب الباقة.

## Work Orders
- `POST /api/work-orders`
  - body: بيانات العميل/الجهاز/الدفع/حقول مخصصة.
  - behavior:
    - توليد invoice_no فريد داخل tenant.
    - auto-upsert لعناصر القوائم (`device_name/brand/issue/price`) عند الإدخال اليدوي.
    - إنشاء audit action = `create`.

- `GET /api/work-orders?status=&q=&from=&to=&page=`
  - قائمة مع pagination وفلاتر.

- `GET /api/work-orders/:id`
  - التفاصيل + custom fields + timeline + followups.

- `PATCH /api/work-orders/:id`
  - تعديل الحقول العامة.
  - يسجل old/new لكل حقل تغير.

- `POST /api/work-orders/:id/status`
  - body: `{ status, note? }`.
  - يسجل status history + audit.

- `POST /api/work-orders/:id/payments`
  - body: `{ payment_status, paid_now }`.
  - partial payment: تحديث `paid_amount` والمتبقي.
  - يسجل audit.

## Follow-ups
- `POST /api/follow-ups`
  - body: `{ work_order_id, note }`.
  - ينشئ followup_no متسلسل لكل فاتورة (1..n).
  - الرقم المعروض: `invoice_no-followup_no`.

## Inventory
- `GET /api/inventory?brand=&part_type=&q=`
- `POST /api/inventory`
- `PATCH /api/inventory/:id`

## Settings
- `GET/PUT /api/settings/print`
- `GET/POST /api/settings/custom-fields`
- `GET/PUT /api/settings/roles/:role/permissions`
- `GET /api/settings/plan/features`

## Reports
- `GET /api/reports/summary?from=&to=`
- `GET /api/reports/delayed`
- `GET /api/reports/user-activity`
