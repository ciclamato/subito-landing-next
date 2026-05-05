export default function About() {
  return (
    <section className="about reveal">
      <div className="section-label">Quiénes somos</div>
      <h2 className="section-title">
        Un laboratorio de ideas<br />entre dos continentes
      </h2>
      <p className="section-subtitle">
        Originados en Madrid y con sede en Montevideo desde 2013, combinamos
        narrativas tradicionales con tecnologías emergentes — Realidad Virtual,
        Realidad Aumentada, sensores, robótica y 3D — para crear experiencias
        memorables en museos, centros de interpretación y destinos turísticos.
      </p>
      <div className="origin-badges">
        <div className="badge">
          🇪🇸 Origen <strong>Madrid</strong><span className="badge-dim">, 1998</span>
        </div>
        <div className="badge">
          🇺🇾 Sede <strong>Montevideo</strong><span className="badge-dim">, 2013</span>
        </div>
        <div className="badge">
          🌎 Proyectos en <strong>9 países</strong>
        </div>
      </div>
    </section>
  );
}
