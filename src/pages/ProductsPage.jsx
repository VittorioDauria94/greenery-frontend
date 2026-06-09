import { useSearchParams } from "react-router-dom";

import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";
import useProduct from "../hooks/useProduct";

function getPageTitle(search, category) {
  if (search) {
    return `Risultati ricerca per ${search}`;
  }

  if (category) {
    return `Prodotti categoria ${category.replaceAll("-", " ")}`;
  }

  return "Tutti i prodotti";
}

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

  const { products, isLoading, error } = useProduct({
    filters: { search, category },
  });

  return (
    <section className="container-custom page-padding">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm tracking-[0.12em] text-[var(--color-green)] uppercase">
          Greenery
        </p>
        <h1 className="mt-2 text-2xl text-[var(--color-dark)] md:text-3xl">
          {getPageTitle(search, category)}
        </h1>
      </div>

      <div className="mt-8">
        {isLoading && <Loader label="Caricamento catalogo" />}

        {!isLoading && error && (
          <ErrorMessage
            title="Catalogo non disponibile"
            message={error}
          />
        )}

        {!isLoading && !error && products.length === 0 && (
          <div className="mx-auto max-w-md rounded-3xl bg-[var(--color-cream)] px-5 py-8 text-center">
            <p className="text-sm tracking-[0.12em] text-[var(--color-green)] uppercase">
              Catalogo
            </p>
            <h2 className="mt-2 text-lg text-[var(--color-dark)]">
              Nessun prodotto trovato
            </h2>
            <p className="mt-2 text-sm text-[var(--color-dark)]/75">
              Modifica la ricerca o scegli una categoria diversa.
            </p>
          </div>
        )}

        {!isLoading && !error && products.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id || product.slug} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
