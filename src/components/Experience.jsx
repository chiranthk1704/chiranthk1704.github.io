import experience from "../content/experience.json";
import OrgLogo from "./OrgLogo.jsx";
import Icon from "./Icons.jsx";

export default function Experience() {
  return (
    <section className="section container" id="experience">
      <h2 className="section-title">Experience</h2>
      <p className="section-lead">{experience.intro}</p>

      <ol className="timeline">
        {experience.entries.map((entry) => (
          <li className="timeline-entry" key={entry.organization + entry.duration}>
            <div className="timeline-marker">
              <OrgLogo logo={entry.logo} organization={entry.organization} />
            </div>

            <div className="timeline-content surface">
              <div className="timeline-header">
                <div>
                  <h3 className="timeline-role">{entry.role}</h3>
                  <p className="timeline-org">
                    {entry.organization}
                    {entry.advisor && (
                      <span className="text-secondary"> · Advisor: {entry.advisor}</span>
                    )}
                  </p>
                </div>
                <div className="timeline-meta">
                  <span className="timeline-duration">{entry.duration}</span>
                  {entry.location && (
                    <span className="text-secondary">{entry.location}</span>
                  )}
                </div>
              </div>

              {entry.description && (
                <p className="timeline-description">{entry.description}</p>
              )}

              {entry.highlights?.length > 0 && (
                <ul className="timeline-highlights">
                  {entry.highlights.map((highlight) => (
                    <li key={highlight.slice(0, 32)}>{highlight}</li>
                  ))}
                </ul>
              )}

              {entry.links?.length > 0 && (
                <div className="timeline-links">
                  {entry.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link"
                    >
                      {link.label} <Icon name="external" size={13} />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
