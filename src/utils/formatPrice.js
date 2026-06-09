const currencyFormatter = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: "EUR",
});

export function formatCurrency(value, { emptyValue } = {}) {
  if (value === undefined || value === null || value === "") {
    return emptyValue ?? currencyFormatter.format(0);
  }

  const numericValue = Number(value);

  if (Number.isNaN(numericValue)) {
    return value;
  }

  return currencyFormatter.format(numericValue);
}

export function getProductPrice(product) {
  return (
    product.price ??
    product.min_price ??
    product.starting_price ??
    product.startingPrice
  );
}

export function formatProductPrice(product, fallback = "Prezzo non disponibile") {
  const price = getProductPrice(product);

  if (price === undefined || price === null || price === "") {
    return fallback;
  }

  return formatCurrency(price);
}
