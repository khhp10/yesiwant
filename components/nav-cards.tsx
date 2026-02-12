import Link from 'next/link';

const links = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/work-orders/new', label: 'New Work Order' },
  { href: '/work-orders/wo-1', label: 'Work Order Details' },
  { href: '/status-board', label: 'Status Board' },
  { href: '/inventory', label: 'Inventory' },
  { href: '/settings', label: 'Settings' },
  { href: '/reports', label: 'Reports' }
];

export function NavCards() {
  return (
    <section className="card">
      <h2>الوصول السريع</h2>
      <div className="grid cols-3">
        {links.map((item) => (
          <Link className="quick-link" key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
