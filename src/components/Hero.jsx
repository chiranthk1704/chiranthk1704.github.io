import hero from "../content/hero.json";
import resume from "../content/resume.json";
import { asset } from "../utils.js";
import Icon from "./Icons.jsx";
import HeroBackground from "./HeroBackground.jsx";

export default function Hero({ theme }) {
  return (
    <section className="hero" id="top">
      <HeroBackground theme={theme} />
      <div className="hero-text container">
        <p className="hero-location">{hero.location}</p>

        <h1 className="hero-name">{hero.name}</h1>

        <p className="hero-headline">
          {hero.headline}
          <br />
          {hero.headlineAreas.map((area, i) => (
            <span key={area}>
              <span className="hero-area">{area}</span>
              {i < hero.headlineAreas.length - 2 && ", "}
              {i === hero.headlineAreas.length - 2 && ", and "}
              {i === hero.headlineAreas.length - 1 && "."}
            </span>
          ))}
        </p>

        <p className="hero-intro">{hero.intro}</p>

        <div className="hero-actions">
          <a
            className="button button-primary"
            href={asset(resume.file)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </a>
          {hero.buttons.map((button) => (
            <a
              key={button.label}
              className="button"
              href={button.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name={button.icon} size={16} />
              {button.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
