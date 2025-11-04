import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function SessionTimeoutHandler() {
  const navigate = useNavigate();
  const timeoutRef = useRef(null);
  const maxInactivityTime = 15 * 60 * 1000; // 15 minutos

  useEffect(() => {
    const resetTimer = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => handleLogout(), maxInactivityTime);
    };

    const handleLogout = () => {
      localStorage.clear();
      alert("Tu sesión ha expirado por inactividad.");
      navigate("/");
    };

    const activityEvents = ["mousemove", "keydown", "click", "scroll"];

    activityEvents.forEach((event) =>
      window.addEventListener(event, resetTimer)
    );

    resetTimer();

    return () => {
      activityEvents.forEach((event) =>
        window.removeEventListener(event, resetTimer)
      );
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [navigate]);

  return null;
}
