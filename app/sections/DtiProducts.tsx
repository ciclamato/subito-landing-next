import { dtiProducts } from "../data";

export default function DtiProducts() {
  return (
    <section className="dti">
      <div className="dti-header reveal">
        <div className="section-label">Soluciones digitales</div>
        <h2 className="section-title">
          Ecosistema para Destinos<br />Turísticos Inteligentes
        </h2>
        <p className="section-subtitle">
          Una suite integrada de productos que transforma la gestión turística
          desde el diagnóstico hasta la experiencia del visitante.
        </p>
      </div>

      <div className="dti-products">
        {dtiProducts.map((product, i) => (
          <div key={i} className="dti-product reveal">
            <div className="dti-product-icon">
              <img src={product.icon} alt={product.name} />
            </div>
            <div className="dti-badge">{product.badge}</div>
            <div className="dti-product-name">{product.name}</div>
            <p className="dti-product-desc">{product.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
