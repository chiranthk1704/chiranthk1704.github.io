import publications from "../content/publications.json";
import Icon from "./Icons.jsx";

// Highlight the site owner's name wherever it appears in the author list.
const OWNER_NAME = "Chiranth";

export default function Publications() {
  return (
    <section className="section container" id="publications">
      <h2 className="section-title">Publications</h2>
      <p className="section-lead">{publications.intro}</p>

      <ol className="pub-list">
        {publications.entries.map((pub) => (
          <li className="pub-item surface" key={pub.title}>
            {pub.status && <span className="pub-status">{pub.status}</span>}

            <p className="pub-authors">
              {pub.authors.map((author, i) => (
                <span key={author}>
                  <span
                    className={author.includes(OWNER_NAME) ? "pub-author-self" : undefined}
                  >
                    {author}
                  </span>
                  {i < pub.authors.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>

            <p className="pub-title">{pub.title}</p>

            {pub.venue && <p className="pub-venue">{pub.venue}</p>}
            {pub.note && <p className="pub-note">{pub.note}</p>}

            {pub.link && (
              <a
                className="text-link"
                href={pub.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read <Icon name="external" size={13} />
              </a>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
