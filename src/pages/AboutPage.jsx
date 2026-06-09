import { Link } from "react-router-dom";

const whatGreeneryDoes = [
  "Ricerca online di prodotti sostenibili",
  "Partner selezionati e credibili",
  "Informazioni su materiali, packaging, certificazioni ed eco badge",
];

const whyItMatters = [
  "Scelte sostenibili più semplici",
  "Riduzione della plastica",
  "Consumo responsabile",
  "Maggiore attenzione al greenwashing",
];

export default function AboutPage() {
  return (
    <section className="container-custom page-padding">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm tracking-[0.12em] text-[var(--color-green)] uppercase">
          Chi siamo
        </p>
        <h1 className="mt-2 text-3xl leading-tight text-[var(--color-dark)] md:text-4xl">
          Greenery rende più accessibili le scelte sostenibili.
        </h1>
        <p className="mt-4 text-base leading-7 text-[var(--color-dark)]/75">
          Un progetto frontend pensato per cercare, confrontare e acquistare
          prodotti con informazioni chiare sulla loro sostenibilita.
        </p>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <section className="card-custom bg-[var(--color-cream)]/35 p-5 md:p-6">
          <p className="text-sm tracking-[0.12em] text-[var(--color-green)] uppercase">
            Mission
          </p>
          <h2 className="mt-3 text-2xl leading-tight text-[var(--color-dark)]">
            Rendere i prodotti sostenibili più facili da trovare, confrontare e
            portare nelle case di tutti.
          </h2>
        </section>

        <section className="card-custom p-5 md:p-6">
          <p className="text-sm tracking-[0.12em] text-[var(--color-green)] uppercase">
            Cosa fa Greenery
          </p>
          <div className="mt-4 grid gap-3">
            {whatGreeneryDoes.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-cream)]/30 px-4 py-3 text-sm text-[var(--color-dark)]/80"
              >
                {item}
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-5 card-custom p-5 md:p-6">
        <div className="grid gap-5 md:grid-cols-[0.8fr_1.2fr] md:items-start">
          <div>
            <p className="text-sm tracking-[0.12em] text-[var(--color-green)] uppercase">
              Perche conta
            </p>
            <h2 className="mt-3 text-2xl text-[var(--color-dark)]">
              Scegliere meglio richiede informazioni migliori.
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {whyItMatters.map((item) => (
              <div
                key={item}
                className="rounded-2xl bg-[var(--color-green-light)] px-4 py-3 text-sm text-[var(--color-dark)]/80"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-5 rounded-3xl bg-[var(--color-cream)] px-5 py-6 text-center">
        <h2 className="text-xl text-[var(--color-dark)]">
          Esplora il catalogo Greenery
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[var(--color-dark)]/75">
          Sfoglia i prodotti o scopri i partner che contribuiscono alla
          selezione.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link to="/products" className="btn-secondary-custom">
            Vai ai prodotti
          </Link>
          <Link to="/partners" className="btn-outline-custom">
            Scopri i partner
          </Link>
        </div>
      </section>
    </section>
  );
}
