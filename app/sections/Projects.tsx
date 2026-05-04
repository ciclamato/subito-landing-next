import Carousel from "../components/Carousel";
import { projects } from "../data";

export default function Projects() {
  return (
    <section className="projects">
      <div className="projects-header reveal">
        <div className="section-label">Portfolio</div>
        <h2 className="section-title">
          Proyectos que hablan<br />por sí solos
        </h2>
        <p className="section-subtitle">
          Museos, centros de interpretación y experiencias culturales en Uruguay,
          España, Argentina e Italia.
        </p>
      </div>

      <div className="projects-grid">
        {projects.map((project, i) => (
          <div key={i} className="pcard reveal">
            <Carousel images={project.images} />
            <div className="pcard-body">
              <div className="pcard-location">{project.location}</div>
              <div className="pcard-name">{project.name}</div>
              <div className="pcard-type">{project.type}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
