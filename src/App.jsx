import { useEffect, useState } from "react";
import Home from "./pages/Home.jsx";

/**
 * Root component. Owns the theme state (dark is the default) and persists
 * the user's choice in localStorage.
 */
export default function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved === "light" || saved === "dark" ? saved : "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((current) => (current === "dark" ? "light" : "dark"));

  return <Home theme={theme} onToggleTheme={toggleTheme} />;
}
