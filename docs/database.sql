-- PostgreSQL 15+
create extension if not exists pgcrypto;

create type app_role as enum ('owner', 'admin', 'cashier', 'technician');
create type work_order_status as enum (
  'received',
  'waiting_maintenance',
  'waiting_part',
  'ready',
  'delivered',
  'cancelled',
  'unrepairable'
);
create type payment_status as enum ('unpaid', 'pending', 'partial', 'paid');
create type catalog_type as enum ('device_name', 'brand', 'issue', 'price');
create type field_type as enum ('text', 'number', 'date', 'select', 'boolean');

create table tenants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  plan_code text not null default 'starter',
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table users (
  id uuid primary key,
  email text not null unique,
  full_name text not null,
  created_at timestamptz not null default now()
);

create table tenant_users (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  role app_role not null,
  is_active boolean not null default true,
  unique (tenant_id, user_id)
);

create table permissions (
  code text primary key,
  description text not null
);

create table role_permissions (
  tenant_id uuid not null references tenants(id) on delete cascade,
  role app_role not null,
  permission_code text not null references permissions(code) on delete cascade,
  primary key (tenant_id, role, permission_code)
);

create table plans (
  code text primary key,
  name text not null
);

create table plan_features (
  plan_code text not null references plans(code) on delete cascade,
  feature_key text not null,
  enabled boolean not null default false,
  limits jsonb not null default '{}'::jsonb,
  primary key (plan_code, feature_key)
);

create table tenant_feature_overrides (
  tenant_id uuid not null references tenants(id) on delete cascade,
  feature_key text not null,
  enabled boolean not null,
  limits jsonb not null default '{}'::jsonb,
  primary key (tenant_id, feature_key)
);

create table catalogs (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  type catalog_type not null,
  value_text text,
  value_numeric numeric(12,2),
  is_active boolean not null default true,
  created_by uuid references users(id),
  created_at timestamptz not null default now(),
  constraint catalog_value_check check (
    (type = 'price' and value_numeric is not null) or
    (type <> 'price' and value_text is not null)
  )
);
create unique index uq_catalog_text on catalogs(tenant_id, type, lower(value_text)) where value_text is not null;
create unique index uq_catalog_price on catalogs(tenant_id, type, value_numeric) where value_numeric is not null;

create table work_orders (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  invoice_no bigint not null,
  customer_name text not null,
  customer_phone text not null,
  device_name text not null,
  brand text not null,
  issue_description text not null,
  total_amount numeric(12,2) not null check (total_amount >= 0),
  paid_amount numeric(12,2) not null default 0 check (paid_amount >= 0),
  remaining_amount numeric(12,2) generated always as (total_amount - paid_amount) stored,
  payment_status payment_status not null default 'unpaid',
  serial_number text,
  color text,
  pre_received_condition text,
  has_accessories boolean not null default false,
  accessories_description text,
  receiver_name text not null,
  received_at timestamptz not null default now(),
  status work_order_status not null default 'received',
  created_by uuid not null references users(id),
  updated_by uuid references users(id),
  updated_at timestamptz not null default now(),
  unique (tenant_id, invoice_no)
);
create index idx_work_orders_tenant_status on work_orders(tenant_id, status, received_at desc);
create index idx_work_orders_tenant_phone on work_orders(tenant_id, customer_phone);

create table work_order_followups (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  work_order_id uuid not null references work_orders(id) on delete cascade,
  followup_no int not null check (followup_no > 0),
  status work_order_status not null default 'received',
  note text,
  created_by uuid not null references users(id),
  created_at timestamptz not null default now(),
  unique (tenant_id, work_order_id, followup_no)
);

create table custom_fields (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  name text not null,
  key text not null,
  field_type field_type not null,
  required boolean not null default false,
  sort_order int not null default 100,
  options jsonb,
  is_active boolean not null default true,
  unique (tenant_id, key)
);

create table work_order_custom_field_values (
  work_order_id uuid not null references work_orders(id) on delete cascade,
  field_id uuid not null references custom_fields(id) on delete cascade,
  tenant_id uuid not null references tenants(id) on delete cascade,
  value jsonb not null,
  primary key (work_order_id, field_id)
);

create table print_settings (
  tenant_id uuid primary key references tenants(id) on delete cascade,
  sticker_width_mm numeric(6,2) not null default 50,
  sticker_height_mm numeric(6,2) not null default 30,
  invoice_template text not null default 'default_a4',
  sticker_template text not null default 'default_sticker',
  updated_at timestamptz not null default now()
);

create table inventory_items (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  part_name text not null,
  part_type text not null,
  brand text not null,
  quantity int not null default 0 check (quantity >= 0),
  unit_price numeric(12,2) not null check (unit_price >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index idx_inventory_tenant_brand_type on inventory_items(tenant_id, brand, part_type);
create index idx_inventory_tenant_type_brand on inventory_items(tenant_id, part_type, brand);

create table audit_logs (
  id bigserial primary key,
  tenant_id uuid not null references tenants(id) on delete cascade,
  entity_type text not null,
  entity_id uuid not null,
  action text not null,
  changed_by uuid references users(id),
  changed_at timestamptz not null default now(),
  old_values jsonb,
  new_values jsonb,
  meta jsonb not null default '{}'::jsonb
);
create index idx_audit_tenant_entity_time on audit_logs(tenant_id, entity_type, entity_id, changed_at desc);

alter table tenants enable row level security;
alter table tenant_users enable row level security;
alter table work_orders enable row level security;
alter table work_order_followups enable row level security;
alter table inventory_items enable row level security;
alter table audit_logs enable row level security;

create policy tenant_isolation_work_orders on work_orders
  using (tenant_id = current_setting('app.tenant_id')::uuid)
  with check (tenant_id = current_setting('app.tenant_id')::uuid);

create policy tenant_isolation_followups on work_order_followups
  using (tenant_id = current_setting('app.tenant_id')::uuid)
  with check (tenant_id = current_setting('app.tenant_id')::uuid);

create policy tenant_isolation_inventory on inventory_items
  using (tenant_id = current_setting('app.tenant_id')::uuid)
  with check (tenant_id = current_setting('app.tenant_id')::uuid);

create policy tenant_isolation_audit on audit_logs
  using (tenant_id = current_setting('app.tenant_id')::uuid)
  with check (tenant_id = current_setting('app.tenant_id')::uuid);
