import about from "../content/about.json";
import OrgLogo from "./OrgLogo.jsx";

export default function About() {
  const { paragraphs, education, interests } = about;

  return (
    <section className="section container" id="about">
      <h2 className="section-title">About</h2>

      <div className="about-grid">
        <div className="about-text">
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>

        <aside className="about-aside">
          <div className="surface about-card">
            <h3 className="about-card-title">Education</h3>
            <div className="about-edu">
              <OrgLogo
                logo={education.logo}
                organization={education.institution}
              />
              <div>
                <p className="about-card-strong">{education.institution}</p>
                <p>{education.degree}</p>
                <p className="text-secondary">
                  {education.duration} · {education.location}
                </p>
                <p className="text-secondary">{education.grade}</p>
              </div>
            </div>
          </div>

          <div className="surface about-card">
            <h3 className="about-card-title">Interests</h3>
            <ul className="about-interests">
              {interests.map((interest) => (
                <li key={interest}>{interest}</li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
