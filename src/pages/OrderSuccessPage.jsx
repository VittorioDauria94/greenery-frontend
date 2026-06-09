import { Link, useLocation } from "react-router-dom";

function formatCurrency(value) {
  if (value === undefined || value === null || value === "") {
    return "";
  }

  return Number(value).toLocaleString("it-IT", {
    style: "currency",
    currency: "EUR",
  });
}

export default function OrderSuccessPage() {
  const { state } = useLocation();
  const orderId = state?.order_id;
  const totalPrice = formatCurrency(state?.total_price);

  return (
    <section className="container-custom page-padding">
      <div className="mx-auto max-w-xl rounded-3xl bg-[var(--color-cream)] px-5 py-8 text-center">
        <p className="text-sm tracking-[0.12em] text-[var(--color-green)] uppercase">
          Greenery
        </p>
        <h1 className="mt-2 text-2xl text-[var(--color-dark)] md:text-3xl">
          Ordine confermato
        </h1>
        <p className="mt-3 text-sm leading-6 text-[var(--color-dark)]/75">
          Grazie per il tuo ordine. Ti invieremo presto i dettagli via email.
        </p>

        {(orderId || totalPrice) && (
          <div className="mt-6 grid gap-3 rounded-3xl bg-[var(--color-white)]/70 p-4 text-left">
            {orderId && (
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-[var(--color-dark)]/70">
                  Numero ordine
                </span>
                <span className="text-sm text-[var(--color-dark)]">
                  {orderId}
                </span>
              </div>
            )}

            {totalPrice && (
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-[var(--color-dark)]/70">
                  Totale
                </span>
                <span className="text-sm text-[var(--color-brown)]">
                  {totalPrice}
                </span>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link to="/products" className="btn-secondary-custom">
            Continua lo shopping
          </Link>
          <Link to="/" className="btn-outline-custom">
            Torna alla home
          </Link>
        </div>
      </div>
    </section>
  );
}
