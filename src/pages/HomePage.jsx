import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";
import useProduct from "../hooks/useProduct";

export default function HomePage() {
  const {
    products: featuredProducts,
    isLoading,
    error,
  } = useProduct({ featured: true });

  return (
    <section className="container-custom page-padding">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xl text-[var(--color-green)] md:text-2xl">
          Confronta migliaia di prodotti
        </p>
        <h1 className="mt-2 text-4xl tracking-[0.18em] text-[var(--color-green)] uppercase md:text-5xl">
          GREEN
        </h1>
      </div>

      <div className="mt-10">
        <div className="mb-6 text-center">
          <h2 className="text-lg tracking-[0.12em] text-[var(--color-dark)] uppercase">
            Prodotti in evidenza
          </h2>
        </div>

        {isLoading && <Loader label="Caricamento prodotti" />}

        {!isLoading && error && (
          <ErrorMessage
            title="Prodotti non disponibili"
            message={error}
          />
        )}

        {!isLoading && !error && featuredProducts.length === 0 && (
          <div className="mx-auto max-w-md rounded-3xl bg-[var(--color-cream)] px-5 py-8 text-center text-sm text-[var(--color-dark)]/75">
            Nessun prodotto in evidenza disponibile.
          </div>
        )}

        {!isLoading && !error && featuredProducts.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id || product.slug} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
