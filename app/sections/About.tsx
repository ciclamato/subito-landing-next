const SpainFlag = () => (
  <svg width="18" height="13" viewBox="0 0 27 18" fill="none" style={{ borderRadius: '2px', overflow: 'hidden', flexShrink: 0 }}>
    <rect width="27" height="18" fill="#c60b1e" />
    <rect y="4.5" width="27" height="9" fill="#ffc400" />
    <circle cx="8" cy="9" r="2" fill="#c60b1e" opacity="0.8" />
  </svg>
);

const UruguayFlag = () => (
  <svg width="18" height="13" viewBox="0 0 27 18" fill="none" style={{ borderRadius: '2px', overflow: 'hidden', flexShrink: 0 }}>
    <rect width="27" height="18" fill="white" />
    <rect y="2" width="27" height="2" fill="#0038a8" />
    <rect y="6" width="27" height="2" fill="#0038a8" />
    <rect y="10" width="27" height="2" fill="#0038a8" />
    <rect y="14" width="27" height="2" fill="#0038a8" />
    <rect width="12" height="10" fill="white" />
    <circle cx="6" cy="5" r="2.5" fill="#fcd116" />
  </svg>
);

const EarthIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--purple-light)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    <path d="M2 12h20" />
  </svg>
);

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
        <div className="badge" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <SpainFlag /> Origen <strong>Madrid</strong><span className="badge-dim">, 1998</span>
        </div>
        <div className="badge" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <UruguayFlag /> Sede <strong>Montevideo</strong><span className="badge-dim">, 2013</span>
        </div>
        <div className="badge" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <EarthIcon /> Proyectos en <strong>9 países</strong>
        </div>
      </div>
    </section>
  );
}
