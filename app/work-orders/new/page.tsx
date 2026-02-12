'use client';

import { FormEvent, useState } from 'react';
import { useLanguage } from '@/components/language-provider';
import { tr } from '@/lib/i18n';

export default function NewWorkOrderPage() {
  const { lang } = useLanguage();
  const [paymentStatus, setPaymentStatus] = useState('unpaid');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(lang === 'ar' ? 'النموذج جاهز للربط مع الـ API' : 'Form is ready for API integration');
  };

  return (
    <section className="stack">
      <h2>{tr(lang, 'newWorkOrder')}</h2>
      <form className="card form-grid modern-card" onSubmit={onSubmit}>
        <h3>{lang === 'ar' ? 'بيانات العميل' : 'Customer Info'}</h3>
        <label>{lang === 'ar' ? 'اسم العميل' : 'Customer Name'}<input required /></label>
        <label>{lang === 'ar' ? 'رقم الجوال' : 'Phone'}<input required /></label>

        <h3>{lang === 'ar' ? 'بيانات الجهاز' : 'Device Info'}</h3>
        <label>{lang === 'ar' ? 'اسم الجهاز' : 'Device Name'}<input list="device-list" /><datalist id="device-list"><option value="Sunmi V2" /><option value="Clover Flex" /><option value="PAX A920" /></datalist></label>
        <label>{lang === 'ar' ? 'الشركة' : 'Brand'}<input list="brand-list" /><datalist id="brand-list"><option value="Sunmi" /><option value="Clover" /><option value="PAX" /></datalist></label>
        <label>{lang === 'ar' ? 'المشكلة' : 'Issue'}<textarea required /></label>
        <label>{lang === 'ar' ? 'السعر' : 'Price'}<input type="number" min={0} defaultValue={0} /></label>
        <label>{lang === 'ar' ? 'الرقم التسلسلي' : 'Serial Number'}<input /></label>
        <label>{lang === 'ar' ? 'اللون' : 'Color'}<input /></label>
        <label>{lang === 'ar' ? 'حالة الجهاز قبل الاستلام' : 'Condition before receive'}<textarea /></label>
        <label>{lang === 'ar' ? 'الملحقات' : 'Accessories'}<input /></label>

        <h3>{lang === 'ar' ? 'بيانات الاستلام والدفع' : 'Receive & Payment'}</h3>
        <label>{lang === 'ar' ? 'اسم المستلم' : 'Receiver Name'}<input required defaultValue={lang === 'ar' ? 'الموظف الحالي' : 'Current Employee'} /></label>
        <label>
          {lang === 'ar' ? 'حالة الدفع' : 'Payment Status'}
          <select value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)}>
            <option value="unpaid">{lang === 'ar' ? 'غير مدفوع' : 'Unpaid'}</option>
            <option value="pending">{lang === 'ar' ? 'بانتظار الدفع' : 'Pending'}</option>
            <option value="partial">{lang === 'ar' ? 'مدفوع جزئي' : 'Partial'}</option>
            <option value="paid">{lang === 'ar' ? 'مدفوع بالكامل' : 'Paid'}</option>
          </select>
        </label>

        {paymentStatus === 'partial' && <label>{lang === 'ar' ? 'المبلغ المدفوع الآن' : 'Paid now'}<input type="number" min={0} /></label>}

        <button className="btn" type="submit">{lang === 'ar' ? 'حفظ أمر الصيانة' : 'Save Work Order'}</button>
      </form>
    </section>
  );
}
