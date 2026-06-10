import { useState } from "react";
import { asset } from "../utils.js";
import Icon from "./Icons.jsx";

/**
 * One project card. The thumbnail is optional: if `project.image` is
 * omitted or the file is missing, the card renders text-only.
 */
export default function ProjectCard({ project }) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = project.image && !imageFailed;

  return (
    <article className="project-card surface">
      {showImage && (
        <img
          className="project-image"
          src={asset(project.image)}
          alt={`${project.title} preview`}
          loading="lazy"
          onError={() => setImageFailed(true)}
        />
      )}

      <div className="project-body">
        <div className="project-header">
          <h3 className="project-title">{project.title}</h3>
          {project.year && <span className="project-year">{project.year}</span>}
        </div>

        <ul className="project-description">
          {project.description.map((point) => (
            <li key={point.slice(0, 32)}>{point}</li>
          ))}
        </ul>

        <ul className="project-tech" aria-label="Technologies used">
          {project.technologies.map((tech) => (
            <li key={tech} className="tag">
              {tech}
            </li>
          ))}
        </ul>

        <div className="project-links">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              <Icon name="github" size={14} /> GitHub
            </a>
          )}
          {project.external && (
            <a
              href={project.external}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              <Icon name="external" size={14} /> Link
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
