import { areas } from "../data";

export default function Areas() {
  return (
    <section className="areas" id="areas">
      <div className="areas-header reveal">
        <div className="section-label">Áreas de trabajo</div>
        <h2 className="section-title">
          Cinco capacidades,<br />una visión integrada
        </h2>
        <p className="section-subtitle">
          Desde la concepción arquitectónica hasta la operación de destinos
          inteligentes, cubrimos todo el ciclo de la experiencia cultural.
        </p>
      </div>

      <div className="area-cards">
        {areas.map((area, i) => (
          <div key={i} className="area-card reveal">
            <div className="area-icon">
              <img src={area.image} alt={area.title} loading="lazy" />
            </div>
            <h3>{area.title}</h3>
            <p>{area.description}</p>
            <div className="area-tags">
              {area.tags.map((tag) => (
                <span key={tag} className="area-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
