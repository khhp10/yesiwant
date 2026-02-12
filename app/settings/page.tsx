export default function SettingsPage() {
  return (
    <section className="stack">
      <h2>الإعدادات</h2>
      <div className="grid cols-2">
        <article className="card">
          <h3>المستخدمين والأدوار</h3>
          <ul>
            <li>Owner / Admin / Cashier / Technician</li>
            <li>تخصيص صلاحيات لكل دور داخل نفس المحل</li>
          </ul>
          <button className="btn">إدارة المستخدمين</button>
        </article>

        <article className="card">
          <h3>الباقات والـ Feature Flags</h3>
          <p>الخطة الحالية: Starter</p>
          <label>
            تفعيل المخزون
            <input type="checkbox" defaultChecked />
          </label>
          <label>
            تفعيل التقارير المتقدمة
            <input type="checkbox" />
          </label>
        </article>

        <article className="card">
          <h3>الحقول المخصصة</h3>
          <p>إضافة حقول: نص / رقم / تاريخ / اختيار / نعم-لا.</p>
          <button className="btn ghost">إضافة حقل جديد</button>
        </article>

        <article className="card">
          <h3>إعدادات الطباعة</h3>
          <div className="grid cols-2">
            <label>
              عرض الستيكر (mm)
              <input type="number" defaultValue={50} />
            </label>
            <label>
              ارتفاع الستيكر (mm)
              <input type="number" defaultValue={30} />
            </label>
          </div>
          <button className="btn">حفظ إعدادات الطباعة</button>
        </article>
      </div>
    </section>
  );
}
