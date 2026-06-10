import { useEffect, useState } from "react";
import hero from "../content/hero.json";
import Icon from "./Icons.jsx";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ theme, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Scrollspy: highlight the nav link of the section currently in view.
  useEffect(() => {
    const sections = NAV_LINKS.map((link) =>
      document.getElementById(link.href.slice(1))
    ).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      // A section counts as "active" while it crosses the upper-middle
      // band of the viewport.
      { rootMargin: "-25% 0px -65% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="navbar">
      <nav className="navbar-inner container" aria-label="Main navigation">
        <a href="#top" className="navbar-name" onClick={() => setMenuOpen(false)}>
          {hero.name}
        </a>

        <div className="navbar-right">
          <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={
                    activeSection === link.href.slice(1) ? "active" : undefined
                  }
                  aria-current={
                    activeSection === link.href.slice(1) ? "true" : undefined
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            className="icon-button"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            <Icon name={theme === "dark" ? "sun" : "moon"} />
          </button>

          <button
            className="icon-button navbar-menu-button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}
