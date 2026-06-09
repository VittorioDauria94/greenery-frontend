import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createOrder } from "../api/orderApi";

const initialFormData = {
  customer_name: "",
  customer_email: "",
  customer_address: "",
  customer_city: "",
  customer_phone: "",
};

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
    errors.customer_city = "Inserisci la città.";
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

export default function useCheckout({ cartItems, clearCart, cartTotal }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  return {
    formData,
    fieldErrors,
    submitError,
    isSubmitting,
    handleChange,
    handleSubmit,
  };
}
