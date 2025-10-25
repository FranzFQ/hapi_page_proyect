import { useParams, useSearchParams } from "react-router-dom";

const MethodsPage = () => {
    const { operation } = useParams();
    const [searchParams] = useSearchParams();
    const country = searchParams.get("country");
    
    return (
        <div className="methods-container">
        <header className="methods-header">
        <h1 className="methods-title">
          {operation ? operation.toUpperCase() : "OPERACIÓN"}{" "}
          {country && `(${country})`}
        </h1>
        <p className="methods-subtitle">
          Selecciona el método o país para continuar
        </p>
      </header>

      <section className="methods-content">
        {/* Aquí luego colocarás el selector de países o métodos */}
        <div className="placeholder">
          <p>Contenido de {operation} - país {country || "no seleccionado"}</p>
        </div>
      </section>
    </div>
  );
};

export default MethodsPage;
