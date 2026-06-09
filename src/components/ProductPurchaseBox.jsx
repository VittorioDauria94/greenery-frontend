import { useEffect, useState } from "react";

import { useCart } from "../context/CartContext";

function firstAvailable(...values) {
  return values.find(
    (value) => value !== undefined && value !== null && value !== "",
  );
}

function getStockNumber(stock) {
  if (stock === undefined || stock === null || stock === "") {
    return null;
  }

  if (typeof stock === "boolean") {
    return stock ? null : 0;
  }

  const numericStock = Number(stock);

  if (!Number.isFinite(numericStock)) {
    return null;
  }

  return Math.max(0, Math.floor(numericStock));
}

function getProductStock(product) {
  return firstAvailable(
    product.stock,
    product.stock_quantity,
    product.stockQuantity,
    product.quantity,
  );
}

export default function ProductPurchaseBox({ product }) {
  const { cartItems, addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [successMessage, setSuccessMessage] = useState("");
  const productId = product?.id ?? product?.product_id ?? product?.slug;
  const stock = getProductStock(product);
  const availableStock = getStockNumber(stock);
  const quantityInCart = productId
    ? cartItems.find((item) => String(item.id) === String(productId))
        ?.quantity || 0
    : 0;
  const remainingStock =
    availableStock === null
      ? null
      : Math.max(availableStock - quantityInCart, 0);
  const isOutOfStock = availableStock !== null && availableStock <= 0;
  const hasReachedStock = remainingStock !== null && remainingStock <= 0;
  const canAddToCart = !isOutOfStock && !hasReachedStock;
  const canDecreaseQuantity = canAddToCart && quantity > 1;
  const canIncreaseQuantity =
    canAddToCart && (remainingStock === null || quantity < remainingStock);

  useEffect(() => {
    setQuantity(1);
    setSuccessMessage("");
  }, [productId]);

  useEffect(() => {
    setQuantity((currentQuantity) => {
      if (remainingStock === null) {
        return Math.max(1, currentQuantity);
      }

      if (remainingStock <= 0) {
        return 1;
      }

      return Math.min(Math.max(1, currentQuantity), remainingStock);
    });
  }, [remainingStock]);

  useEffect(() => {
    if (!successMessage) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setSuccessMessage("");
    }, 2400);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [successMessage]);

  function handleDecreaseQuantity() {
    setQuantity((currentQuantity) => Math.max(1, currentQuantity - 1));
  }

  function handleIncreaseQuantity() {
    setQuantity((currentQuantity) => {
      if (remainingStock === null) {
        return currentQuantity + 1;
      }

      return Math.min(remainingStock, currentQuantity + 1);
    });
  }

  function handleAddToCart() {
    if (!canAddToCart) {
      return;
    }

    const quantityToAdd =
      remainingStock === null ? quantity : Math.min(quantity, remainingStock);

    addToCart(product, quantityToAdd);
    setSuccessMessage("Prodotto aggiunto al carrello.");
  }

  return (
    <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-cream)]/35 p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs tracking-[0.1em] text-[var(--color-green)] uppercase">
            Quantità
          </p>
          {remainingStock !== null && !isOutOfStock && (
            <p className="mt-1 text-sm text-[var(--color-dark)]/70">
              Disponibili: {remainingStock}
            </p>
          )}
        </div>

        <div className="inline-flex w-fit items-center overflow-hidden rounded-full border border-[var(--color-border)] bg-[var(--color-white)]">
          <button
            type="button"
            className="px-4 py-2 text-lg text-[var(--color-green)] disabled:cursor-not-allowed disabled:text-[var(--color-dark)]/30"
            onClick={handleDecreaseQuantity}
            disabled={!canDecreaseQuantity}
            aria-label="Diminuisci quantità"
          >
            -
          </button>
          <span className="min-w-12 px-3 text-center text-sm text-[var(--color-dark)]">
            {canAddToCart ? quantity : 0}
          </span>
          <button
            type="button"
            className="px-4 py-2 text-lg text-[var(--color-green)] disabled:cursor-not-allowed disabled:text-[var(--color-dark)]/30"
            onClick={handleIncreaseQuantity}
            disabled={!canIncreaseQuantity}
            aria-label="Aumenta quantità"
          >
            +
          </button>
        </div>
      </div>

      <button
        type="button"
        className="btn-primary-custom mt-4 w-full disabled:cursor-not-allowed disabled:opacity-60"
        onClick={handleAddToCart}
        disabled={!canAddToCart}
      >
        {isOutOfStock
          ? "Non disponibile"
          : hasReachedStock
            ? "Stock già nel carrello"
            : "Aggiungi al carrello"}
      </button>

      {successMessage && (
        <p className="mt-3 text-sm text-[var(--color-green)]" aria-live="polite">
          {successMessage}
        </p>
      )}
    </div>
  );
}
