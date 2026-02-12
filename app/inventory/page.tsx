import { inventoryItems } from '@/lib/mock-data';

export default function InventoryPage() {
  return (
    <section className="stack">
      <h2>المخزون وقطع الغيار</h2>

      <article className="card grid cols-3">
        <label>
          الشركة
          <select>
            <option>الكل</option>
            <option>Sunmi</option>
            <option>Clover</option>
            <option>PAX</option>
          </select>
        </label>
        <label>
          نوع القطعة
          <select>
            <option>الكل</option>
            <option>شاشة</option>
            <option>بطارية</option>
            <option>كاميرا</option>
          </select>
        </label>
        <label>
          بحث
          <input placeholder="اسم القطعة..." />
        </label>
      </article>

      <div className="table-wrap card">
        <table>
          <thead>
            <tr>
              <th>القطعة</th>
              <th>النوع</th>
              <th>الشركة</th>
              <th>الكمية</th>
              <th>سعر الوحدة</th>
            </tr>
          </thead>
          <tbody>
            {inventoryItems.map((item) => (
              <tr key={item.id}>
                <td>{item.partName}</td>
                <td>{item.partType}</td>
                <td>{item.brand}</td>
                <td>{item.quantity}</td>
                <td>{item.unitPrice} ر.س</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
