export default function Loader({ label = "Caricamento..." }) {
  return (
    <div
      className="mx-auto flex max-w-sm items-center justify-center rounded-3xl bg-[var(--color-cream)]/45 px-5 py-10 text-center"
      role="status"
      aria-live="polite"
    >
      <div>
        <div className="loader-dot mx-auto" />
        <p className="mt-3 text-sm tracking-[0.08em] text-[var(--color-green)] uppercase">
          {label}
        </p>
      </div>
    </div>
  );
}
