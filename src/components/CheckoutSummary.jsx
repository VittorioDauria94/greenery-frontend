import { formatCurrency } from "../utils/formatPrice";

export default function CheckoutSummary({ cartItems, cartTotal }) {
  return (
    <aside className="card-custom p-5 lg:sticky lg:top-6">
      <h2 className="text-lg text-[var(--color-dark)]">Riepilogo ordine</h2>

      <div className="mt-5 divide-y divide-[var(--color-border)]">
        {cartItems.map((item) => (
          <div key={item.id} className="py-3 first:pt-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-[var(--color-dark)]">{item.name}</p>
                <p className="mt-1 text-xs text-[var(--color-dark)]/65">
                  Quantità: {item.quantity}
                </p>
              </div>
              <p className="shrink-0 text-sm text-[var(--color-dark)]">
                {formatCurrency(item.price * item.quantity)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-[var(--color-border)] pt-4 text-base text-[var(--color-dark)]">
        <span>Totale</span>
        <span className="text-[var(--color-brown)]">
          {formatCurrency(cartTotal)}
        </span>
      </div>
    </aside>
  );
}
