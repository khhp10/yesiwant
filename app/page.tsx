import Link from 'next/link';

const routes = [
  ['لوحة التحكم', '/dashboard'],
  ['إضافة أمر صيانة', '/work-orders/new'],
  ['لوحة الحالات', '/status-board'],
  ['المخزون', '/inventory'],
  ['الإعدادات', '/settings'],
  ['التقارير', '/reports']
];

export default function HomePage() {
  return (
    <section>
      <h2>صفحات النظام</h2>
      <ul>
        {routes.map(([label, href]) => (
          <li key={href}>
            <Link href={href}>{label}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
