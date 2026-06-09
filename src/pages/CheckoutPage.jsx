import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { createOrder } from "../api/orderApi";
import ErrorMessage from "../components/ErrorMessage";
import { useCart } from "../context/CartContext";

const initialFormData = {
  customer_name: "",
  customer_email: "",
  customer_address: "",
  customer_city: "",
  customer_phone: "",
};

function formatCurrency(value) {
  return Number(value || 0).toLocaleString("it-IT", {
    style: "currency",
    currency: "EUR",
  });
}

function validateForm(formData) {
  const errors = {};

  if (!formData.customer_name.trim()) {
    errors.customer_name = "Inserisci il nome.";
  }

  if (!formData.customer_email.trim()) {
    errors.customer_email = "Inserisci l'email.";
  }

  if (!formData.customer_address.trim()) {
    errors.customer_address = "Inserisci l'indirizzo.";
  }

  if (!formData.customer_city.trim()) {
    errors.customer_city = "Inserisci la citta.";
  }

  return errors;
}

function getOrderId(payload) {
  return (
    payload?.order_id ||
    payload?.orderId ||
    payload?.id ||
    payload?.order?.id ||
    payload?.data?.order_id ||
    payload?.data?.order?.id
  );
}

function getOrderTotal(payload, fallbackTotal) {
  return (
    payload?.total_price ||
    payload?.totalPrice ||
    payload?.order?.total_price ||
    payload?.order?.totalPrice ||
    payload?.data?.total_price ||
    payload?.data?.order?.total_price ||
    fallbackTotal
  );
}

export default function CheckoutPage() {
  const { cartItems, clearCart, getCartTotal } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const cartTotal = getCartTotal();

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));

    setFieldErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const errors = validateForm(formData);
    setFieldErrors(errors);
    setSubmitError("");

    if (Object.keys(errors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const orderPayload = {
        customer_name: formData.customer_name.trim(),
        customer_email: formData.customer_email.trim(),
        customer_address: formData.customer_address.trim(),
        customer_city: formData.customer_city.trim(),
        customer_phone: formData.customer_phone.trim(),
        items: cartItems.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
      };
      const createdOrder = await createOrder(orderPayload);
      const orderId = getOrderId(createdOrder);
      const totalPrice = getOrderTotal(createdOrder, cartTotal);

      clearCart();
      navigate("/order-success", {
        state: {
          order_id: orderId,
          total_price: totalPrice,
        },
      });
    } catch (err) {
      setSubmitError(
        err.message || "Errore durante la creazione dell'ordine.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

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
        <form className="card-custom p-5" onSubmit={handleSubmit} noValidate>
          <h2 className="text-lg text-[var(--color-dark)]">
            Dati di spedizione
          </h2>

          <div className="mt-5 grid gap-4">
            <label className="grid gap-2">
              <span className="text-sm text-[var(--color-dark)]">Nome</span>
              <input
                className="input-custom"
                type="text"
                name="customer_name"
                value={formData.customer_name}
                onChange={handleChange}
                autoComplete="name"
              />
              {fieldErrors.customer_name && (
                <span className="text-sm text-[var(--color-brown)]">
                  {fieldErrors.customer_name}
                </span>
              )}
            </label>

            <label className="grid gap-2">
              <span className="text-sm text-[var(--color-dark)]">Email</span>
              <input
                className="input-custom"
                type="email"
                name="customer_email"
                value={formData.customer_email}
                onChange={handleChange}
                autoComplete="email"
              />
              {fieldErrors.customer_email && (
                <span className="text-sm text-[var(--color-brown)]">
                  {fieldErrors.customer_email}
                </span>
              )}
            </label>

            <label className="grid gap-2">
              <span className="text-sm text-[var(--color-dark)]">
                Indirizzo
              </span>
              <input
                className="input-custom"
                type="text"
                name="customer_address"
                value={formData.customer_address}
                onChange={handleChange}
                autoComplete="street-address"
              />
              {fieldErrors.customer_address && (
                <span className="text-sm text-[var(--color-brown)]">
                  {fieldErrors.customer_address}
                </span>
              )}
            </label>

            <label className="grid gap-2">
              <span className="text-sm text-[var(--color-dark)]">Citta</span>
              <input
                className="input-custom"
                type="text"
                name="customer_city"
                value={formData.customer_city}
                onChange={handleChange}
                autoComplete="address-level2"
              />
              {fieldErrors.customer_city && (
                <span className="text-sm text-[var(--color-brown)]">
                  {fieldErrors.customer_city}
                </span>
              )}
            </label>

            <label className="grid gap-2">
              <span className="text-sm text-[var(--color-dark)]">
                Telefono
              </span>
              <input
                className="input-custom"
                type="tel"
                name="customer_phone"
                value={formData.customer_phone}
                onChange={handleChange}
                autoComplete="tel"
              />
            </label>
          </div>

          {submitError && (
            <div className="mt-5">
              <ErrorMessage
                title="Ordine non inviato"
                message={submitError}
              />
            </div>
          )}

          <button
            type="submit"
            className="btn-primary-custom mt-6 w-full disabled:opacity-60"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Invio ordine..." : "Conferma ordine"}
          </button>
        </form>

        <aside className="card-custom p-5 lg:sticky lg:top-6">
          <h2 className="text-lg text-[var(--color-dark)]">
            Riepilogo ordine
          </h2>

          <div className="mt-5 divide-y divide-[var(--color-border)]">
            {cartItems.map((item) => (
              <div key={item.id} className="py-3 first:pt-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-[var(--color-dark)]">
                      {item.name}
                    </p>
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
      </div>
    </section>
  );
}
