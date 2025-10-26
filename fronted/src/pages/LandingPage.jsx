import React from "react";
import "../style/LandingPage.css";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    // Implement login navigation logic here
    navigate("/login")
    ;
  }

  const handleSignUpClick = () => {
    // Implement sign-up navigation logic here
    navigate("/register");
  }

  return (
    <div className="landing">
      {/* NAVBAR */}
      <header className="nav">
        <div className="nav__left">
          <div className="brand">
            <span className="brand__dots">
              <i></i><i></i><i></i>
            </span>
            <span className="brand__name">Hapi Demo</span>
          </div>
        </div>
        <div className="nav__right">
          <button className="btn btn--ghost" onClick={handleLoginClick}>Iniciar sesion</button>
          <button className="btn btn--primary" onClick={handleSignUpClick}>Crear cuenta</button>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero__content">
          <h1 className="hero__title">
            Invierte en la Bolsa<br />
            de USA desde Latam
          </h1>
          <p className="hero__subtitle">
            +12,000 acciones, ETFs y criptomonedas desde US$5. ¡Empieza
            tu portafolio hoy!
          </p>

          <div className="hero__cta">
            <button className="btn btn--primary">Invertir ahora</button>
          </div>

          <p className="hero__note">
            * Plataforma educativa y de simulación para propósitos académicos.
          </p>
        </div>

        {/* MARKET CARD */}
        <aside className="market-card">
          <div className="market-card__header">
            <span>Demo de mercado</span>
            <span className="market-card__time">Tiempo real simulado</span>
          </div>

          <div className="market-grid">
            {[
              { t: "AAPL", n: "Apple", p: "224.18", c: "+1.2%" },
              { t: "MSFT", n: "Microsoft", p: "410.33", c: "-0.5%" },
              { t: "NVDA", n: "NVIDIA", p: "117.82", c: "+2.7%" },
              { t: "AMZN", n: "Amazon", p: "184.51", c: "+0.8%" },
              { t: "TSLA", n: "Tesla", p: "260.70", c: "+3.1%" },
              { t: "XOM", n: "Exxon", p: "117.10", c: "-1.1%" },
            ].map(({ t, n, p, c }) => (
              <div key={t} className="ticker">
                <div className="ticker__sym">{t}</div>
                <div className="ticker__name">{n}</div>
                <div className="ticker__price">${p}</div>
                <div
                  className={
                    "ticker__chg " +
                    (c.startsWith("-") ? "neg" : "pos")
                  }
                >
                  {c}
                </div>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </div>
  );
}
