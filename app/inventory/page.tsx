'use client';

import { useLanguage } from '@/components/language-provider';
import { tr } from '@/lib/i18n';
import { inventoryItems } from '@/lib/mock-data';

export default function InventoryPage() {
  const { lang } = useLanguage();

  return (
    <section className="stack">
      <h2>{tr(lang, 'inventory')}</h2>
      <article className="card grid cols-3 modern-card">
        <label>{lang === 'ar' ? 'الشركة' : 'Brand'}<select><option>{lang === 'ar' ? 'الكل' : 'All'}</option><option>Sunmi</option><option>Clover</option><option>PAX</option></select></label>
        <label>{lang === 'ar' ? 'نوع القطعة' : 'Part Type'}<select><option>{lang === 'ar' ? 'الكل' : 'All'}</option><option>{lang === 'ar' ? 'شاشة' : 'Screen'}</option><option>{lang === 'ar' ? 'بطارية' : 'Battery'}</option><option>{lang === 'ar' ? 'كاميرا' : 'Camera'}</option></select></label>
        <label>{lang === 'ar' ? 'بحث' : 'Search'}<input placeholder={lang === 'ar' ? 'اسم القطعة...' : 'Part name...'} /></label>
      </article>
      <div className="table-wrap card modern-card">
        <table>
          <thead><tr><th>{lang === 'ar' ? 'القطعة' : 'Part'}</th><th>{lang === 'ar' ? 'النوع' : 'Type'}</th><th>{lang === 'ar' ? 'الشركة' : 'Brand'}</th><th>{lang === 'ar' ? 'الكمية' : 'Qty'}</th><th>{lang === 'ar' ? 'سعر الوحدة' : 'Unit Price'}</th></tr></thead>
          <tbody>
            {inventoryItems.map((item) => <tr key={item.id}><td>{item.partName}</td><td>{item.partType}</td><td>{item.brand}</td><td>{item.quantity}</td><td>{item.unitPrice} {lang === 'ar' ? 'ر.س' : 'SAR'}</td></tr>)}
          </tbody>
        </table>
      </div>
    </section>
  );
}
