import { getProductImageUrl } from "../utils/imageUrl";

export default function ProductDetailGallery({ product, name }) {
  const imageSrc = getProductImageUrl(product);

  return (
    <div className="card-custom bg-[var(--color-cream)]/45 p-4 md:p-6">
      <div className="flex min-h-[18rem] items-center justify-center rounded-3xl bg-[var(--color-white)]/75 p-6 md:min-h-[28rem]">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={`Immagine di ${name}`}
            className="max-h-[20rem] w-full object-contain md:max-h-[30rem]"
          />
        ) : (
          <div
            className="flex h-48 w-48 items-center justify-center rounded-full border border-dashed border-[var(--color-green)]/40 text-sm tracking-[0.14em] text-[var(--color-green)] uppercase"
            role="img"
            aria-label={`Immagine non disponibile per ${name}`}
          >
            Greenery
          </div>
        )}
      </div>
    </div>
  );
}
