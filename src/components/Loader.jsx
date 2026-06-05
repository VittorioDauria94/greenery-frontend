export default function Loader({ label = "Caricamento..." }) {
  return (
    <div className="flex items-center justify-center py-12 text-center">
      <div>
        <div className="loader-dot mx-auto" />
        <p className="mt-3 text-sm tracking-[0.08em] text-[var(--color-dark)]/75 uppercase">
          {label}
        </p>
      </div>
    </div>
  );
}
