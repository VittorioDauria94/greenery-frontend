import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="container-custom page-padding">
      <h1 className="text-4xl tracking-[0.08em] uppercase">
        Pagina non trovata
      </h1>

      <Link to="/" className="btn-primary-custom mt-6">
        Torna alla home
      </Link>
    </section>
  );
}
