const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export async function createOrder(orderData) {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    throw new Error("Impossibile completare l'ordine. Riprova tra poco.");
  }

  return response.json();
}
