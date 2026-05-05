"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const shortcuts = [
  { label: "Museografía\nTransmedia", href: "#areas", icon: "/images/shortcut-museografia.svg", stat: "30+", statLabel: "Años de experiencia" },
  { label: "Soluciones\nTurismo Inteligente", href: "#dti", icon: "/images/shortcut-dti.svg", stat: "200+", statLabel: "Proyectos" },
  { label: "Proyectos\nPortfolio", href: "#proyectos", icon: "/images/shortcut-proyectos.svg", stat: "9", statLabel: "Países" },
];

export default function Hero() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <section className={`hero ${introDone ? "intro-done" : ""}`}>
      <video
        className={`hero-video ${introDone ? "hero-video--done" : ""}`}
        src="/subitored.mp4"
        autoPlay
        muted
        playsInline
        onEnded={() => setIntroDone(true)}
      />
      <div className="hero-content-wrapper">
        <div className="hero-grid"></div>
        <div className="hero-content">
          <motion.div
            className="logo-brand"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={introDone ? { opacity: 1, scale: 1, y: 0 } : {}}
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
            animate={introDone ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="shortcut-circles"
          >
            {shortcuts.map((s, i) => (
              <motion.a
                key={i}
                href={s.href}
                className="shortcut-circle"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={introDone ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.08, borderColor: "var(--purple)" }}
              >
                <img src={s.icon} alt="" className="shortcut-icon" />
                {s.label.split("\n").map((line, j) => (
                  <span key={j}>{line}</span>
                ))}
              </motion.a>
            ))}
          </motion.div>

          <p className="hero-tagline">
            Laboratorio de ideas que fusiona narrativa, diseño y tecnologia
            emergente para crear experiencias inmersivas en cultura y turismo.
          </p>

          <div className="hero-stats">
            {shortcuts.map((s, i) => (
              <div key={i} className="shortcut-item">
                <div className="shortcut-stat">
                  <div className="shortcut-stat-number">{s.stat}</div>
                  <div className="shortcut-stat-label">{s.statLabel}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {introDone && <div className="scroll-cue"><span></span></div>}
    </section>
  );
}
