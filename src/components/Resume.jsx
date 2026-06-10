import resume from "../content/resume.json";
import { asset } from "../utils.js";
import Icon from "./Icons.jsx";

export default function Resume() {
  const resumeUrl = asset(resume.file);

  return (
    <section className="section container" id="resume">
      <h2 className="section-title">Resume</h2>

      <div className="surface resume-card">
        <p className="resume-text">{resume.blurb}</p>
        <div className="resume-actions">
          <a
            className="button button-primary"
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="external" size={16} />
            View Resume
          </a>
          <a className="button" href={resumeUrl} download={resume.downloadName}>
            <Icon name="download" size={16} />
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}
