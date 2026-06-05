export default function ErrorMessage({
  title = "Qualcosa è andato storto",
  message = "Riprova tra qualche minuto.",
}) {
  return (
    <div className="rounded-3xl border border-[var(--color-brown)]/30 bg-[var(--color-brown)]/10 px-5 py-4 text-center text-[var(--color-dark)]">
      <h2 className="text-base tracking-[0.08em] uppercase">{title}</h2>
      <p className="mt-2 text-sm text-[var(--color-dark)]/75">{message}</p>
    </div>
  );
}
