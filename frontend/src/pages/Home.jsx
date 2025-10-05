import React, { useMemo, useState } from "react";

const ALL_STOCKS = [
  { id: "AAPL", name: "Apple Inc.", category: "Tecnología", price: 224.18, change: 1.2, country: "USA" },
  { id: "MSFT", name: "Microsoft", category: "Tecnología", price: 410.33, change: -0.5, country: "USA" },
  { id: "NVDA", name: "NVIDIA", category: "Tecnología", price: 117.82, change: 2.7, country: "USA" },
  { id: "AMZN", name: "Amazon", category: "Consumo", price: 184.51, change: 0.8, country: "USA" },
  { id: "TSLA", name: "Tesla", category: "Automotriz", price: 260.7, change: 3.1, country: "USA" },
  { id: "XOM", name: "Exxon Mobil", category: "Energía", price: 117.1, change: -1.1, country: "USA" },
  { id: "KO", name: "Coca-Cola", category: "Consumo", price: 60.9, change: 0.2, country: "USA" },
  { id: "BABA", name: "Alibaba", category: "Tecnología", price: 74.3, change: -0.9, country: "China" },
];

export default function LandingPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todas");
  const [movement, setMovement] = useState("Todos");
  const [maxPrice, setMaxPrice] = useState(1000);

  const categories = useMemo(
    () => ["Todas", ...Array.from(new Set(ALL_STOCKS.map((s) => s.category)))],
    []
  );

  const filtered = useMemo(() => {
    return ALL_STOCKS.filter((s) => {
      const inQuery = `${s.id} ${s.name}`.toLowerCase().includes(query.toLowerCase());
      const inCat = category === "Todas" || s.category === category;
      const inMove =
        movement === "Todos" ||
        (movement === "Subiendo" && s.change > 0) ||
        (movement === "Bajando" && s.change < 0);
      const inPrice = s.price <= maxPrice;
      return inQuery && inCat && inMove && inPrice;
    });
  }, [query, category, movement, maxPrice]);

  return (
    <div className="min-h-screen font-display text-white bg-gradient-to-b from-[#2f2a83] via-[#4c41c4] to-[#6f61f5]">
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/10 backdrop-blur-md border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
          <a href="#home" className="flex items-center gap-2 font-semibold text-white">
            <span className="inline-block h-3 w-3 rounded-sm bg-indigo-400"></span>
            <span className="inline-block h-3 w-3 -translate-y-1 rotate-45 rounded-sm bg-cyan-400"></span>
            <span className="inline-block h-3 w-3 rounded-sm bg-violet-500"></span>
            <span className="ml-2 text-lg font-bold">Hapi Demo</span>
          </a>
          <nav className="hidden items-center gap-6 md:flex">
            <a className="hover:text-indigo-300 transition" href="#features">Nosotros</a>
            <a className="hover:text-indigo-300 transition" href="#ayuda">Ayuda</a>
            <a className="hover:text-indigo-300 transition" href="#educacion">Educación</a>
            <a className="hover:text-indigo-300 transition" href="#blog">Blog</a>
          </nav>
          <div className="flex items-center gap-3">
            <a href="#login" className="rounded-xl bg-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/20 transition">
              Entrar
            </a>
            <a href="#signup" className="rounded-xl bg-indigo-500 px-4 py-1.5 text-sm font-semibold text-white hover:bg-indigo-400 transition">
              Crear cuenta
            </a>
          </div>
        </div>
      </header>

      {/* HERO con DEMO DE MERCADO */}
      <section id="home" className="relative overflow-hidden py-18 md:py-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(900px_450px_at_70%_20%,#7f6cff55,transparent)]" />
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-[1.1fr_0.9fr]">
          {/* Texto */}
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Invierte en la Bolsa de USA desde Latam
            </h1>
            <p className="mt-4 max-w-xl text-white/85 md:text-lg">
              +12,000 acciones, ETFs y criptomonedas desde US$5. ¡Empieza tu portafolio hoy!
            </p>
            <div className="mt-8 flex gap-4">
              <a
                href="#signup"
                className="bg-white text-[#2f2a83] font-semibold px-6 py-3 rounded-2xl shadow hover:shadow-xl transition"
              >
                Invertir ahora
              </a>
              <a
                href="#learn"
                className="bg-white/10 ring-1 ring-white/30 px-6 py-3 rounded-2xl font-semibold text-white hover:bg-white/15 transition"
              >
                ¿Cómo funciona?
              </a>
            </div>
            <p className="mt-3 text-xs text-white/70">
              * Plataforma educativa y de simulación para propósitos académicos.
            </p>
          </div>

          {/* Tarjeta Demo de mercado */}
          <div className="relative">
            <div className="mx-auto w-full max-w-sm rounded-3xl bg-white/15 p-4 shadow-2xl ring-1 ring-white/20 backdrop-blur-md">
              <div className="rounded-2xl bg-white p-4 text-slate-900">
                <div className="mb-3 flex items-center justify-between">
                  <div className="text-sm font-semibold">Demo de mercado</div>
                  <div className="text-xs text-slate-500">Tiempo real simulado</div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {ALL_STOCKS.slice(0, 6).map((s) => (
                    <div key={s.id} className="rounded-lg border border-slate-200 p-2">
                      <div className="font-semibold">{s.id}</div>
                      <div className="text-slate-500">{s.name.split(" ")[0]}</div>
                      <div className="mt-1 font-mono">${s.price.toFixed(2)}</div>
                      <div
                        className={
                          "text-[11px] font-semibold " +
                          (s.change >= 0 ? "text-emerald-600" : "text-rose-600")
                        }
                      >
                        {s.change >= 0 ? "+" : ""}
                        {s.change.toFixed(1)}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* sombra grande bajo la tarjeta */}
            <div className="absolute -bottom-6 left-1/2 -z-10 h-10 w-4/5 -translate-x-1/2 rounded-full bg-black/30 blur-2xl opacity-40" />
          </div>
        </div>
      </section>

      {/* FILTROS */}
      <section className="mx-auto max-w-7xl px-6 py-12 bg-white/10 rounded-2xl backdrop-blur-md">
        <h2 className="text-2xl font-bold text-white mb-2">Explora acciones disponibles</h2>
        <p className="text-sm text-white/70 mb-5">
          Busca por <strong>nombre o ticker</strong>, filtra por <strong>categoría</strong> y aplica un filtro de{" "}
          <strong>movimiento</strong> o <strong>tope de precio</strong>.
        </p>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
          <label className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 ring-1 ring-white/20">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            </svg>
            <input
              className="w-full bg-transparent text-white placeholder-white/60 outline-none"
              placeholder="Buscar Apple, AAPL, Tesla…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>

          <select
            className="rounded-xl bg-white/10 px-3 py-2 ring-1 ring-white/20 text-white"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c} value={c} className="text-slate-900">{c}</option>
            ))}
          </select>

          <select
            className="rounded-xl bg-white/10 px-3 py-2 ring-1 ring-white/20 text-white"
            value={movement}
            onChange={(e) => setMovement(e.target.value)}
          >
            {["Todos", "Subiendo", "Bajando"].map((m) => (
              <option key={m} value={m} className="text-slate-900">{m}</option>
            ))}
          </select>

          <input
            type="number"
            className="rounded-xl bg-white/10 px-3 py-2 ring-1 ring-white/20 text-white placeholder-white/60"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value) || 0)}
          />
        </div>
      </section>

      {/* GRID DE ACCIONES */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-white/20 bg-white/10 p-8 text-center text-white/80">
            No encontramos resultados. Ajusta tus filtros.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((s) => (
              <article
                key={s.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md text-slate-900"
              >
                <header className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold leading-tight">
                      {s.name} <span className="text-slate-500">({s.id})</span>
                    </h3>
                    <p className="text-sm text-slate-500">{s.category} · {s.country}</p>
                  </div>
                  <span aria-hidden className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold">
                    {s.change >= 0 ? "▲" : "▼"} {Math.abs(s.change).toFixed(1)}%
                  </span>
                </header>

                <div className="mt-3 flex items-end justify-between">
                  <div>
                    <div className="text-xs text-slate-500">Precio</div>
                    <div className="font-mono text-xl font-semibold">${s.price.toFixed(2)}</div>
                  </div>
                  <a
                    href="#login"
                    className="rounded-xl bg-violet-500 px-3 py-2 text-sm font-semibold text-white opacity-90 hover:opacity-100"
                  >
                    Ver detalles
                  </a>
                </div>

                <p className="mt-3 text-sm text-slate-500">
                  *Para comprar o vender necesitas iniciar sesión. En esta vista solo se verifica la información pública.
                </p>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* FEATURES / BENEFICIOS */}
      <section id="features" className="border-t border-white/10 bg-white/5">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Feature title="+12,000 activos" desc="Acciones, ETFs y cripto para explorar y aprender." />
            <Feature title="Comisiones bajas" desc="Simulación de tarifas como en plataformas reales." />
            <Feature title="Seguridad" desc="Buenas prácticas de no repudio, registros e IPs (en backend)." />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-white/5 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex flex-col items-center justify-between gap-4 text-white/80 md:flex-row">
            <p>© {new Date().getFullYear()} Hapi Demo — Proyecto educativo.</p>
            <div className="flex flex-wrap items-center gap-4">
              <a href="#ayuda" className="hover:text-white">Ayuda</a>
              <a href="#educacion" className="hover:text-white">Educación</a>
              <a href="#blog" className="hover:text-white">Blog</a>
              <a href="#privacy" className="hover:text-white">Privacidad</a>
              <a href="#terms" className="hover:text-white">Términos</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* --------- Subcomponentes --------- */
function Feature({ title, desc }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 p-6 text-white shadow-sm backdrop-blur-md">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/20 text-violet-100">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M4 13l4 4L20 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h3 className="text-base font-semibold text-white">{title}</h3>
      <p className="mt-1 text-sm text-white/80">{desc}</p>
    </div>
  );
}
