import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
const BACKEND_URL = API_URL.replace("/api", "");

function getImageSrc(image) {
  if (!image || typeof image !== "string") {
    return "";
  }

  if (image.startsWith("http") || image.startsWith("data:")) {
    return image;
  }

  if (image.startsWith("/")) {
    return `${BACKEND_URL}${image}`;
  }

  return `${BACKEND_URL}/${image}`;
}

function formatCurrency(value) {
  return Number(value || 0).toLocaleString("it-IT", {
    style: "currency",
    currency: "EUR",
  });
}

function getStockLimit(stock) {
  if (stock === undefined || stock === null || stock === "") {
    return null;
  }

  const numericStock = Number(stock);

  if (!Number.isFinite(numericStock)) {
    return null;
  }

  return Math.max(0, Math.floor(numericStock));
}

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <section className="container-custom page-padding">
        <div className="mx-auto max-w-md rounded-3xl bg-[var(--color-cream)] px-5 py-8 text-center">
          <p className="text-sm tracking-[0.12em] text-[var(--color-green)] uppercase">
            Greenery
          </p>
          <h1 className="mt-2 text-2xl text-[var(--color-dark)]">
            Il carrello è vuoto
          </h1>
          <p className="mt-3 text-sm text-[var(--color-dark)]/75">
            Scopri il catalogo e aggiungi i tuoi prodotti sostenibili.
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
          Il tuo carrello
        </h1>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
        <div className="space-y-4">
          {cartItems.map((item) => {
            const imageSrc = getImageSrc(item.image);
            const productPath = item.slug ? `/products/${item.slug}` : "/products";
            const stockLimit = getStockLimit(item.stock);
            const canIncrease =
              stockLimit === null || item.quantity < stockLimit;

            return (
              <article key={item.id} className="card-custom p-4">
                <div className="grid gap-4 sm:grid-cols-[7rem_minmax(0,1fr)]">
                  <Link
                    to={productPath}
                    className="flex min-h-32 items-center justify-center rounded-3xl bg-[var(--color-cream)]/45 p-3"
                  >
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt={`Immagine di ${item.name}`}
                        className="h-28 w-full object-contain"
                      />
                    ) : (
                      <span
                        className="flex h-24 w-24 items-center justify-center rounded-full border border-dashed border-[var(--color-green)]/40 text-xs tracking-[0.12em] text-[var(--color-green)] uppercase"
                        role="img"
                        aria-label={`Immagine non disponibile per ${item.name}`}
                      >
                        Greenery
                      </span>
                    )}
                  </Link>

                  <div className="space-y-4">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <span className="badge-eco">{item.eco_badge}</span>
                        <h2 className="mt-2 text-lg text-[var(--color-dark)]">
                          {item.name}
                        </h2>
                        <p className="mt-1 text-sm text-[var(--color-dark)]/70">
                          {formatCurrency(item.price)}
                        </p>
                      </div>

                      <button
                        type="button"
                        className="w-fit text-sm text-[var(--color-brown)]"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Rimuovi
                      </button>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="inline-flex w-fit items-center overflow-hidden rounded-full border border-[var(--color-border)] bg-[var(--color-white)]">
                        <button
                          type="button"
                          className="px-4 py-2 text-lg text-[var(--color-green)] disabled:cursor-not-allowed disabled:text-[var(--color-dark)]/30"
                          onClick={() => decreaseQuantity(item.id)}
                          disabled={item.quantity <= 1}
                          aria-label="Diminuisci quantità"
                        >
                          -
                        </button>
                        <span className="min-w-12 px-3 text-center text-sm text-[var(--color-dark)]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          className="px-4 py-2 text-lg text-[var(--color-green)] disabled:cursor-not-allowed disabled:text-[var(--color-dark)]/30"
                          onClick={() => increaseQuantity(item.id)}
                          disabled={!canIncrease}
                          aria-label="Aumenta quantità"
                        >
                          +
                        </button>
                      </div>

                      <p className="text-sm text-[var(--color-dark)]">
                        Subtotale{" "}
                        <span className="text-base text-[var(--color-brown)]">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <aside className="card-custom p-5 lg:sticky lg:top-6">
          <h2 className="text-lg text-[var(--color-dark)]">Riepilogo</h2>

          <div className="mt-5 space-y-3 text-sm text-[var(--color-dark)]/75">
            <div className="flex items-center justify-between">
              <span>Articoli</span>
              <span>{getCartCount()}</span>
            </div>
            <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-3 text-base text-[var(--color-dark)]">
              <span>Totale</span>
              <span className="text-[var(--color-brown)]">
                {formatCurrency(getCartTotal())}
              </span>
            </div>
          </div>

          <Link to="/checkout" className="btn-primary-custom mt-5 w-full">
            Procedi al checkout
          </Link>

          <button
            type="button"
            className="btn-outline-custom mt-3 w-full"
            onClick={clearCart}
          >
            Svuota carrello
          </button>
        </aside>
      </div>
    </section>
  );
}
