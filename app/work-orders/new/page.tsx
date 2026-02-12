'use client';

import { FormEvent, useState } from 'react';

export default function NewWorkOrderPage() {
  const [paymentStatus, setPaymentStatus] = useState('unpaid');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('نموذج MVP جاهز للربط مع API لاحقاً.');
  };

  return (
    <section className="stack">
      <h2>إضافة أمر صيانة جديد</h2>
      <form className="card form-grid" onSubmit={onSubmit}>
        <h3>بيانات العميل</h3>
        <label>
          اسم العميل
          <input required placeholder="مثال: محمد السبيعي" />
        </label>
        <label>
          رقم الجوال
          <input required placeholder="05xxxxxxxx" />
        </label>

        <h3>بيانات الجهاز</h3>
        <label>
          اسم الجهاز
          <input list="device-list" placeholder="اختر أو اكتب وسيتم حفظه بالقائمة" />
          <datalist id="device-list">
            <option value="Sunmi V2" />
            <option value="Clover Flex" />
            <option value="PAX A920" />
          </datalist>
        </label>
        <label>
          الشركة
          <input list="brand-list" placeholder="اختر أو اكتب" />
          <datalist id="brand-list">
            <option value="Sunmi" />
            <option value="Clover" />
            <option value="PAX" />
          </datalist>
        </label>
        <label>
          المشكلة
          <textarea required placeholder="اشرح المشكلة أو اختر من قائمة مستقبلية" />
        </label>
        <label>
          السعر
          <input type="number" min={0} defaultValue={0} />
        </label>
        <label>
          الرقم التسلسلي
          <input />
        </label>
        <label>
          اللون
          <input />
        </label>
        <label>
          حالة الجهاز قبل الاستلام
          <textarea />
        </label>
        <label>
          ملحقات
          <input placeholder="شاحن / كفر / قاعدة..." />
        </label>

        <h3>بيانات الاستلام والدفع</h3>
        <label>
          اسم المستلم
          <input required defaultValue="الموظف الحالي" />
        </label>
        <label>
          حالة الدفع
          <select value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)}>
            <option value="unpaid">غير مدفوع</option>
            <option value="pending">بانتظار الدفع</option>
            <option value="partial">مدفوع جزئي</option>
            <option value="paid">مدفوع بالكامل</option>
          </select>
        </label>
        {paymentStatus === 'partial' && (
          <label>
            المبلغ المدفوع الآن
            <input type="number" min={0} />
          </label>
        )}

        <h3>حقول إضافية (مثال)</h3>
        <label>
          جهاز بديل تم تسليمه؟
          <select>
            <option>لا</option>
            <option>نعم</option>
          </select>
        </label>

        <button className="btn" type="submit">
          حفظ أمر الصيانة
        </button>
      </form>
    </section>
  );
}
