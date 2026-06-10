import Navbar from "../components/Navbar.jsx";
import CustomCursor from "../components/CustomCursor.jsx";
import Hero from "../components/Hero.jsx";
import About from "../components/About.jsx";
import Experience from "../components/Experience.jsx";
import Projects from "../components/Projects.jsx";
import Resume from "../components/Resume.jsx";
import Contact from "../components/Contact.jsx";
import Footer from "../components/Footer.jsx";

/**
 * The single page of the site. Sections render in this order;
 * all content comes from the JSON files in `src/content/`.
 */
export default function Home({ theme, onToggleTheme }) {
  return (
    <>
      <CustomCursor />
      <a className="skip-link" href="#about">
        Skip to content
      </a>
      <Navbar theme={theme} onToggleTheme={onToggleTheme} />
      <main>
        <Hero theme={theme} />
        <About />
        <Experience />
        <Projects />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
