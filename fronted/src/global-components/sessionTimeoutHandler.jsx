import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SessionTimeoutHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = () => {
      const loginTime = localStorage.getItem("loginTime");

      if (loginTime) {
        const now = Date.now();
        const diff = now - parseInt(loginTime, 10);
        const maxTime = 15 * 60 * 1000; // 15 minutos

        if (diff > maxTime) {
          localStorage.clear();
          alert("Tu sesión ha expirado. Por favor inicia sesión nuevamente.");
          navigate("/");
        } else {
          const remaining = maxTime - diff;
          setTimeout(checkSession, Math.min(remaining, 60 * 1000));
        }
      }
    };

    checkSession();
  }, [navigate]);

  return null;
}