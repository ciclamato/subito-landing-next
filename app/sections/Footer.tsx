export default function Footer() {
  return (
    <>
      <div className="footer-cta reveal">
        <h2 className="footer-cta-title">¿Hablamos?</h2>
        <a href="mailto:proyectos@subitored.es" className="footer-cta-email">
          proyectos@subitored.es
        </a>
      </div>

      <footer>
        <div className="footer-inner">
          <div className="footer-office">
            <div className="footer-office-city">Montevideo · Uruguay</div>
            <p>Súbito Red Desarrollos</p>
            <p>Cuareim 2116, 11100 Montevideo</p>
            <p>
              <a href="mailto:proyectos@subitored.es">
                proyectos@subitored.es
              </a>
            </p>
            <p>
              <a href="tel:+59899504809">T. +598 99 504 809</a>
            </p>
          </div>

          <div className="footer-office">
            <div className="footer-office-city">Madrid · España</div>
            <div className="footer-office-role">
              Mayda A. Islas, Country Manager
            </div>
            <p>
              <a href="tel:+34656857001">T. +34 656 85 70 01</a>
            </p>
            <p>
              <a href="mailto:direccion@destinoplus.com">
                direccion@destinoplus.com
              </a>
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-brand-small">Súbito Red Desarrollos</p>
          <p>Laboratorio de ideas desde 1994</p>
        </div>
      </footer>
    </>
  );
}
