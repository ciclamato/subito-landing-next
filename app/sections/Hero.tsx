"use client";

import { motion } from "framer-motion";
import { stats } from "../data";

const shortcuts = [
  { label: "Museografía\nTransmedia", href: "#areas" },
  { label: "Soluciones\nTurismo Inteligente", href: "#dti" },
  { label: "Proyectos\nPortfolio", href: "#proyectos" },
];

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-grid"></div>
      <div className="hero-content">
        <motion.div
          className="logo-brand"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: "2rem" }}
        >
          <img
            src="/images/simbolo-subito-negativo.png"
            alt="Súbito Red"
            className="logo-brand-icon"
          />
          <div className="logo-brand-text">
            <span className="logo-brand-left">SÚBITO</span>
            <span className="logo-brand-right">RED</span>
          </div>
        </motion.div>
        <p className="hero-claim">
          Reinventamos la forma<br />de contar historias
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="shortcut-circles"
        >
          {shortcuts.map((s, i) => (
            <motion.a
              key={i}
              href={s.href}
              className="shortcut-circle"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.08, borderColor: "var(--purple)" }}
            >
              {s.label.split("\n").map((line, j) => (
                <span key={j}>{line}</span>
              ))}
            </motion.a>
          ))}
        </motion.div>

        <p className="hero-tagline">
          Laboratorio de ideas que fusiona narrativa, diseño y tecnología
          emergente para crear experiencias inmersivas en cultura y turismo.
        </p>
        <div className="hero-stats">
          {stats.map((stat) => (
            <div key={stat.label} className="stat">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="scroll-cue"><span></span></div>
    </section>
  );
}
