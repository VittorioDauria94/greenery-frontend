import ErrorMessage from "./ErrorMessage";

export default function CheckoutForm({
  formData,
  fieldErrors,
  submitError,
  isSubmitting,
  onChange,
  onSubmit,
}) {
  return (
    <form className="card-custom p-5" onSubmit={onSubmit} noValidate>
      <h2 className="text-lg text-[var(--color-dark)]">Dati di spedizione</h2>

      <div className="mt-5 grid gap-4">
        <label className="grid gap-2">
          <span className="text-sm text-[var(--color-dark)]">Nome</span>
          <input
            className="input-custom"
            type="text"
            name="customer_name"
            value={formData.customer_name}
            onChange={onChange}
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
            onChange={onChange}
            autoComplete="email"
          />
          {fieldErrors.customer_email && (
            <span className="text-sm text-[var(--color-brown)]">
              {fieldErrors.customer_email}
            </span>
          )}
        </label>

        <label className="grid gap-2">
          <span className="text-sm text-[var(--color-dark)]">Indirizzo</span>
          <input
            className="input-custom"
            type="text"
            name="customer_address"
            value={formData.customer_address}
            onChange={onChange}
            autoComplete="street-address"
          />
          {fieldErrors.customer_address && (
            <span className="text-sm text-[var(--color-brown)]">
              {fieldErrors.customer_address}
            </span>
          )}
        </label>

        <label className="grid gap-2">
          <span className="text-sm text-[var(--color-dark)]">Città</span>
          <input
            className="input-custom"
            type="text"
            name="customer_city"
            value={formData.customer_city}
            onChange={onChange}
            autoComplete="address-level2"
          />
          {fieldErrors.customer_city && (
            <span className="text-sm text-[var(--color-brown)]">
              {fieldErrors.customer_city}
            </span>
          )}
        </label>

        <label className="grid gap-2">
          <span className="text-sm text-[var(--color-dark)]">Telefono</span>
          <input
            className="input-custom"
            type="tel"
            name="customer_phone"
            value={formData.customer_phone}
            onChange={onChange}
            autoComplete="tel"
          />
        </label>
      </div>

      {submitError && (
        <div className="mt-5">
          <ErrorMessage title="Ordine non inviato" message={submitError} />
        </div>
      )}

      <button
        type="submit"
        className="btn-primary-custom mt-6 w-full disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Invio ordine..." : "Conferma ordine"}
      </button>
    </form>
  );
}
