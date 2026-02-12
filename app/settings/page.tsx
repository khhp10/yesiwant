'use client';

import { useLanguage } from '@/components/language-provider';
import { tr } from '@/lib/i18n';

export default function SettingsPage() {
  const { lang } = useLanguage();

  return (
    <section className="stack">
      <h2>{tr(lang, 'settings')}</h2>
      <div className="grid cols-2">
        <article className="card modern-card">
          <h3>{tr(lang, 'usersRoles')}</h3>
          <ul><li>Owner / Admin / Cashier / Technician</li><li>{lang === 'ar' ? 'تخصيص الصلاحيات لكل دور داخل المحل' : 'Customize permissions per role per tenant'}</li></ul>
          <button className="btn">{lang === 'ar' ? 'إدارة المستخدمين' : 'Manage Users'}</button>
        </article>

        <article className="card modern-card">
          <h3>{tr(lang, 'planFeatures')}</h3>
          <p>{lang === 'ar' ? 'الخطة الحالية: Starter' : 'Current Plan: Starter'}</p>
          <label>{lang === 'ar' ? 'تفعيل المخزون' : 'Enable Inventory'}<input type="checkbox" defaultChecked /></label>
          <label>{lang === 'ar' ? 'تفعيل التقارير المتقدمة' : 'Enable Advanced Reports'}<input type="checkbox" /></label>
        </article>

        <article className="card modern-card">
          <h3>{tr(lang, 'customFields')}</h3>
          <p>{lang === 'ar' ? 'إضافة حقول: نص / رقم / تاريخ / اختيار / نعم-لا' : 'Add fields: text / number / date / select / yes-no'}</p>
          <button className="btn ghost">{lang === 'ar' ? 'إضافة حقل جديد' : 'Add Field'}</button>
        </article>

        <article className="card modern-card">
          <h3>{tr(lang, 'printSettings')}</h3>
          <div className="grid cols-2">
            <label>{lang === 'ar' ? 'عرض الستيكر (mm)' : 'Sticker Width (mm)'}<input type="number" defaultValue={50} /></label>
            <label>{lang === 'ar' ? 'ارتفاع الستيكر (mm)' : 'Sticker Height (mm)'}<input type="number" defaultValue={30} /></label>
          </div>
          <button className="btn">{lang === 'ar' ? 'حفظ الإعدادات' : 'Save Settings'}</button>
        </article>
      </div>
    </section>
  );
}
