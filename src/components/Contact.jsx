import contact from "../content/contact.json";
import Icon from "./Icons.jsx";

export default function Contact() {
  return (
    <section className="section container" id="contact">
      <h2 className="section-title">Contact</h2>
      <p className="section-lead">{contact.intro}</p>

      <ul className="contact-list">
        {contact.links.map((entry) => (
          <li key={entry.label}>
            <a
              className="surface contact-item"
              href={entry.href}
              target={entry.href.startsWith("http") ? "_blank" : undefined}
              rel={entry.href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              <span className="contact-icon">
                <Icon name={entry.icon} size={17} />
              </span>
              <span className="contact-details">
                <span className="contact-label">{entry.label}</span>
                <span className="contact-value">{entry.value}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
