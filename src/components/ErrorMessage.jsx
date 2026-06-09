export default function ErrorMessage({
  title = "Qualcosa è andato storto",
  message = "Riprova tra qualche minuto.",
}) {
  return (
    <div
      className="mx-auto max-w-xl rounded-3xl border border-[var(--color-brown)]/30 bg-[var(--color-brown)]/10 px-5 py-5 text-center text-[var(--color-dark)]"
      role="alert"
    >
      <h2 className="text-base text-[var(--color-brown)]">{title}</h2>
      <p className="mt-2 text-sm text-[var(--color-dark)]/75">{message}</p>
    </div>
  );
}
