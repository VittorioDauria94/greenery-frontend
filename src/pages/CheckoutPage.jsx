import { Link } from "react-router-dom";

import CheckoutForm from "../components/CheckoutForm";
import CheckoutSummary from "../components/CheckoutSummary";
import { useCart } from "../context/CartContext";
import useCheckout from "../hooks/useCheckout";

export default function CheckoutPage() {
  const { cartItems, clearCart, getCartTotal } = useCart();
  const cartTotal = getCartTotal();
  const checkout = useCheckout({ cartItems, clearCart, cartTotal });

  if (cartItems.length === 0) {
    return (
      <section className="container-custom page-padding">
        <div className="mx-auto max-w-md rounded-3xl bg-[var(--color-cream)] px-5 py-8 text-center">
          <p className="text-sm tracking-[0.12em] text-[var(--color-green)] uppercase">
            Greenery
          </p>
          <h1 className="mt-2 text-2xl text-[var(--color-dark)]">
            Checkout non disponibile
          </h1>
          <p className="mt-3 text-sm text-[var(--color-dark)]/75">
            Il carrello è vuoto. Aggiungi almeno un prodotto prima di
            procedere.
          </p>
          <Link to="/products" className="btn-secondary-custom mt-5">
            Vai ai prodotti
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="container-custom page-padding">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm tracking-[0.12em] text-[var(--color-green)] uppercase">
          Greenery
        </p>
        <h1 className="mt-2 text-2xl text-[var(--color-dark)] md:text-3xl">
          Checkout
        </h1>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
        <CheckoutForm
          formData={checkout.formData}
          fieldErrors={checkout.fieldErrors}
          submitError={checkout.submitError}
          isSubmitting={checkout.isSubmitting}
          onChange={checkout.handleChange}
          onSubmit={checkout.handleSubmit}
        />

        <CheckoutSummary cartItems={cartItems} cartTotal={cartTotal} />
      </div>
    </section>
  );
}
