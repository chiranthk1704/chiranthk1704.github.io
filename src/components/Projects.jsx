import projects from "../content/projects.json";
import ProjectCard from "./ProjectCard.jsx";

export default function Projects() {
  return (
    <section className="section container" id="projects">
      <h2 className="section-title">Projects</h2>
      <p className="section-lead">{projects.intro}</p>

      <div className="projects-grid">
        {projects.entries.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
