import { useLanguage } from "../context/LanguageContext";
import { translateText as tx } from "../locales/translateText";
import { formatCardNumber } from "../data/directorCards";
import "./ReceivingCards.css";

export default function ReceiptPaymentDetails({ sale }) {
  useLanguage();
  if (!sale) return <div className="receipt-payment-details">{tx("To'lov hali tasdiqlanmagan.")}</div>;
  const paid = Number(sale.initialPaidAmount ?? sale.paidAmount ?? 0);
  const debt = Math.max(0, Number(sale.amount) - paid);
  return <div className="receipt-payment-details">
    {paid > 0 && sale.receivingCard ? <>
      <p><strong>{tx("Kartaga to'landi")}: {paid.toLocaleString()} {tx("so'm")}</strong></p>
      <p>{tx("Karta raqami")}: {formatCardNumber(sale.receivingCard.number)}</p>
      <p>{tx("Karta egasi")}: {sale.receivingCard.holder}</p>
      {sale.receivingCard.label && <p>{sale.receivingCard.label}</p>}
    </> : paid > 0 ? <p><strong>{tx("Naqd to'landi")}: {paid.toLocaleString()} {tx("so'm")}</strong></p> : <p>{tx("To'lov qabul qilinmagan")}</p>}
    {debt > 0 ? <><p><strong>{tx("Qarzga rasmiylashtirildi")}: {debt.toLocaleString()} {tx("so'm")}</strong></p>{sale.debtDueDate && <p>{tx("Qaytarish muddati")}: {sale.debtDueDate}</p>}</> : <p>{tx("To'liq to'landi. Qarz qolmadi.")}</p>}
  </div>;
}
