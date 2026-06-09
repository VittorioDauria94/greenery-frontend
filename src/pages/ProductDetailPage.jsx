import { useParams } from "react-router-dom";

import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import ProductDetailGallery from "../components/ProductDetailGallery";
import ProductDetailInfo from "../components/ProductDetailInfo";
import useProduct from "../hooks/useProduct";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const { product, isLoading, error, hasLoaded } = useProduct({
    slug,
    enabled: Boolean(slug),
  });

  if (isLoading) {
    return (
      <section className="container-custom page-padding">
        <Loader label="Caricamento prodotto" />
      </section>
    );
  }

  if (error) {
    return (
      <section className="container-custom page-padding">
        <ErrorMessage title="Prodotto non disponibile" message={error} />
      </section>
    );
  }

  if (hasLoaded && !product) {
    return (
      <section className="container-custom page-padding">
        <div className="mx-auto max-w-md rounded-3xl bg-[var(--color-cream)] px-5 py-8 text-center">
          <p className="text-sm tracking-[0.12em] text-[var(--color-green)] uppercase">
            Greenery
          </p>
          <h1 className="mt-2 text-2xl text-[var(--color-dark)]">
            Prodotto non trovato
          </h1>
          <p className="mt-3 text-sm text-[var(--color-dark)]/75">
            Il prodotto richiesto non esiste o non è più disponibile.
          </p>
        </div>
      </section>
    );
  }

  if (!product) {
    return null;
  }

  const name = product.name || product.title || "Prodotto Greenery";

  return (
    <section className="container-custom page-padding">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
        <ProductDetailGallery product={product} name={name} />
        <ProductDetailInfo product={product} name={name} />
      </div>
    </section>
  );
}
