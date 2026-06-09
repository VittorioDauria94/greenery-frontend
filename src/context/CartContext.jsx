import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const CART_STORAGE_KEY = "greenery-cart";

function normalizeStock(stock) {
  if (stock === undefined || stock === null || stock === "") {
    return null;
  }

  const numericStock = Number(stock);

  if (!Number.isFinite(numericStock)) {
    return null;
  }

  return Math.max(0, Math.floor(numericStock));
}

function normalizeQuantity(quantity) {
  const numericQuantity = Number(quantity);

  if (!Number.isFinite(numericQuantity)) {
    return 1;
  }

  return Math.max(1, Math.floor(numericQuantity));
}

function clampQuantity(quantity, stock) {
  const normalizedQuantity = normalizeQuantity(quantity);

  if (stock === null) {
    return normalizedQuantity;
  }

  if (stock <= 0) {
    return 0;
  }

  return Math.min(normalizedQuantity, stock);
}

function normalizePrice(price) {
  const numericPrice = Number(String(price ?? 0).replace(",", "."));
  return Number.isFinite(numericPrice) ? numericPrice : 0;
}

function getProductStock(product) {
  return normalizeStock(
    product.stock ??
      product.stock_quantity ??
      product.stockQuantity ??
      product.quantity,
  );
}

function getProductPrice(product) {
  return normalizePrice(
    product.price ??
      product.min_price ??
      product.starting_price ??
      product.startingPrice,
  );
}

function getProductImage(product) {
  const image =
    product.image_url ||
    product.imageUrl ||
    product.image ||
    product.thumbnail ||
    product.cover_image ||
    product.images?.[0]?.url ||
    product.images?.[0];

  return typeof image === "string" ? image : "";
}

function toCartItem(product, quantity) {
  const id = product.id ?? product.product_id ?? product.slug;
  const stock = getProductStock(product);
  const clampedQuantity = clampQuantity(quantity, stock);

  if (!id || clampedQuantity < 1) {
    return null;
  }

  return {
    id,
    name: product.name || product.title || "Prodotto Greenery",
    slug: product.slug || product.id,
    price: getProductPrice(product),
    image: getProductImage(product),
    eco_badge: product.eco_badge || product.ecoBadge || product.eco_label || "Eco",
    stock,
    quantity: clampedQuantity,
  };
}

function sanitizeCartItem(item) {
  if (!item?.id) {
    return null;
  }

  const stock = normalizeStock(item.stock);
  const quantity = clampQuantity(item.quantity, stock);

  if (quantity < 1) {
    return null;
  }

  return {
    id: item.id,
    name: item.name || "Prodotto Greenery",
    slug: item.slug || item.id,
    price: normalizePrice(item.price),
    image: typeof item.image === "string" ? item.image : "",
    eco_badge: item.eco_badge || "Eco",
    stock,
    quantity,
  };
}

function getStoredCart() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);
    const parsedCart = storedCart ? JSON.parse(storedCart) : [];

    if (!Array.isArray(parsedCart)) {
      return [];
    }

    return parsedCart.map(sanitizeCartItem).filter(Boolean);
  } catch {
    return [];
  }
}

function sameProduct(leftId, rightId) {
  return String(leftId) === String(rightId);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(getStoredCart);

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  function addToCart(product, quantity = 1) {
    const itemToAdd = toCartItem(product, quantity);

    if (!itemToAdd) {
      return;
    }

    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) =>
        sameProduct(item.id, itemToAdd.id),
      );

      if (!existingItem) {
        return [...currentItems, itemToAdd];
      }

      return currentItems.map((item) => {
        if (!sameProduct(item.id, itemToAdd.id)) {
          return item;
        }

        const stock = itemToAdd.stock ?? item.stock;

        return {
          ...item,
          ...itemToAdd,
          stock,
          quantity: clampQuantity(item.quantity + itemToAdd.quantity, stock),
        };
      });
    });
  }

  function removeFromCart(productId) {
    setCartItems((currentItems) =>
      currentItems.filter((item) => !sameProduct(item.id, productId)),
    );
  }

  function increaseQuantity(productId) {
    setCartItems((currentItems) =>
      currentItems.map((item) => {
        if (!sameProduct(item.id, productId)) {
          return item;
        }

        return {
          ...item,
          quantity: clampQuantity(item.quantity + 1, item.stock),
        };
      }),
    );
  }

  function decreaseQuantity(productId) {
    setCartItems((currentItems) =>
      currentItems.map((item) => {
        if (!sameProduct(item.id, productId)) {
          return item;
        }

        return {
          ...item,
          quantity: Math.max(1, item.quantity - 1),
        };
      }),
    );
  }

  function clearCart() {
    setCartItems([]);
  }

  function getCartTotal() {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  }

  function getCartCount() {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      getCartTotal,
      getCartCount,
    }),
    [cartItems],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider.");
  }

  return context;
}
